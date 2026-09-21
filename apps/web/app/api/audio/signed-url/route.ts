import { getSongBySlug } from "@/lib/strapi";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { generateBunnySignedUrl } from "@/lib/bunny";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const type = (searchParams.get("type") ?? "stream") as "stream" | "download";

  if (!slug) {
    return Response.json({ error: "Missing slug" }, { status: 400 });
  }

  const song = await getSongBySlug(slug);
  if (!song) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const tier = type === "download" ? song.downloadTier : song.streamTier;

  if (tier === "disabled") {
    return Response.json({ error: "Not available" }, { status: 403 });
  }

  if (tier === "subscriber") {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: "Login required" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("tier, subscription_expiry")
      .eq("id", user.id)
      .single();

    const isActive =
      profile?.tier === "subscriber" &&
      profile.subscription_expiry !== null &&
      new Date(profile.subscription_expiry) > new Date();

    if (!isActive) {
      return Response.json({ error: "Subscription required" }, { status: 402 });
    }
  }

  const signedUrl = generateBunnySignedUrl(song.audioFile, type);
  return Response.json({ url: signedUrl });
}
