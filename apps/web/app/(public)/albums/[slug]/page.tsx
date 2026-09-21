import { notFound } from "next/navigation";
import { getAlbumBySlug } from "@/lib/strapi";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";

export const dynamic = "force-dynamic";

export default async function AlbumPage({ params }: { params: { slug: string } }) {
  const album = await getAlbumBySlug(params.slug);
  if (!album) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">{album.title}</h1>
      {album.description && <p className="mt-2 text-white/60">{album.description}</p>}
      <CatalogGrid songs={album.songs ?? []} />
    </main>
  );
}
