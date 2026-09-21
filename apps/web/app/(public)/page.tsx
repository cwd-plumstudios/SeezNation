import { getSongs } from "@/lib/strapi";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";

// Rendered per-request so a build doesn't require Strapi to be reachable —
// data freshness still comes from lib/strapi.ts's `revalidate: 60` fetch cache.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const songs = await getSongs();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Latest releases</h1>
      <CatalogGrid songs={songs} />
    </main>
  );
}
