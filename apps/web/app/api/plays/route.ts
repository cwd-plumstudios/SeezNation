import { createSupabaseServerClient } from "@/lib/supabase/server";

// Logs a play event for analytics and future royalty tracking.
export async function POST(request: Request) {
  const { songSlug } = await request.json();

  if (!songSlug) {
    return Response.json({ error: "Missing songSlug" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("plays").insert({
    song_slug: songSlug,
    user_id: user?.id ?? null,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
