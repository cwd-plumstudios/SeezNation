import { getAlbums } from "@/lib/strapi";
import { AlbumCard } from "@/components/catalog/AlbumCard";

export const dynamic = "force-dynamic";

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Albums</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </main>
  );
}
