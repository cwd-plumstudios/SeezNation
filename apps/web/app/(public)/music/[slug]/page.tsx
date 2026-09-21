import { notFound } from "next/navigation";
import { getSongBySlug } from "@/lib/strapi";
import { AudioPlayer } from "@/components/player/AudioPlayer";
import { LyricsPanel } from "@/components/player/LyricsPanel";

export const dynamic = "force-dynamic";

export default async function SongPage({ params }: { params: { slug: string } }) {
  const song = await getSongBySlug(params.slug);
  if (!song) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">{song.title}</h1>
      {song.featuredArtists && song.featuredArtists.length > 0 && (
        <p className="text-white/60">feat. {song.featuredArtists.join(", ")}</p>
      )}
      <AudioPlayer song={song} />
      {song.lyrics && <LyricsPanel lyrics={song.lyrics} />}
    </main>
  );
}
