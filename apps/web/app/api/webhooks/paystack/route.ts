import crypto from "crypto";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

// Listens for: charge.success, subscription.create, subscription.disable
// On charge.success        -> profiles.tier = 'subscriber', subscription_expiry = +30 days
// On subscription.disable  -> profiles.tier = 'free'
export async function POST(request: Request) {
  const rawBody = await request.text();

  const signature = request.headers.get("x-paystack-signature");
  const expectedSignature = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const supabase = createSupabaseServerClient();
  const userId = event.data?.metadata?.supabase_user_id;

  if (!userId) {
    return Response.json({ ok: true });
  }

  if (event.event === "charge.success") {
    const subscriptionExpiry = new Date();
    subscriptionExpiry.setDate(subscriptionExpiry.getDate() + 30);

    await supabase
      .from("profiles")
      .update({
        tier: "subscriber",
        paystack_customer_id: event.data.customer?.customer_code,
        subscription_expiry: subscriptionExpiry.toISOString(),
      })
      .eq("id", userId);
  }

  if (event.event === "subscription.disable") {
    await supabase.from("profiles").update({ tier: "free" }).eq("id", userId);
  }

  return Response.json({ ok: true });
}
