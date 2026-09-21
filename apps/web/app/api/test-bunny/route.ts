import { generateBunnySignedUrl } from "@/lib/bunny";

// Dev-only sanity check for BUNNY_CDN_HOSTNAME / BUNNY_TOKEN_SECRET — signs a
// path directly, bypassing Strapi and Supabase. Not available in production.
// e.g. /api/test-bunny?path=singles/what-they-doin-ft-39thirty.mp3&type=stream
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") ?? "audio/singles/2024/test-song.mp3";
  const type = (searchParams.get("type") ?? "stream") as "stream" | "download";

  const url = generateBunnySignedUrl(path, type);
  return Response.json({ path, type, url });
}
