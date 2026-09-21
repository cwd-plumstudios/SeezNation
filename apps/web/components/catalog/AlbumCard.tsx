import Link from "next/link";
import type { Album } from "@/lib/types";

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link href={`/albums/${album.slug}`} className="block rounded bg-white/5 p-4 hover:bg-white/10">
      <p className="font-semibold">{album.title}</p>
      <p className="text-sm capitalize text-white/50">{album.albumType}</p>
    </Link>
  );
}
