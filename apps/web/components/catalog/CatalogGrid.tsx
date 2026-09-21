import type { Song } from "@/lib/types";
import { SongCard } from "./SongCard";

interface CatalogGridProps {
  songs: Song[];
}

export function CatalogGrid({ songs }: CatalogGridProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}
