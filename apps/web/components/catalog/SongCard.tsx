import Link from "next/link";
import type { Song } from "@/lib/types";

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  return (
    <Link href={`/music/${song.slug}`} className="block rounded bg-white/5 p-4 hover:bg-white/10">
      <p className="font-semibold">{song.title}</p>
      {song.featuredArtists && song.featuredArtists.length > 0 && (
        <p className="text-sm text-white/50">feat. {song.featuredArtists.join(", ")}</p>
      )}
    </Link>
  );
}
