import { getSongs } from "@/lib/strapi";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";

export const dynamic = "force-dynamic";

export default async function MusicPage() {
  const songs = await getSongs();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Music</h1>
      <CatalogGrid songs={songs} />
    </main>
  );
}
