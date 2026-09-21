import { createSupabaseServerClient } from "@/lib/supabase/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

// 1. Get user from Supabase session
// 2. Call Paystack /transaction/initialize with plan code
// 3. Return access_code to client
export async function POST() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return Response.json({ error: "Login required" }, { status: 401 });
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      plan: process.env.PAYSTACK_MONTHLY_PLAN_CODE,
      metadata: { supabase_user_id: user.id },
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to initiate subscription" }, { status: 502 });
  }

  const { data } = await res.json();
  return Response.json({ data: { access_code: data.access_code } });
}
