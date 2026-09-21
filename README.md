# SeezNation

South African hip hop artist platform — rebuilt off WordPress onto a fully
owned web + mobile stack. Streaming, lyrics, downloads, and subscription
tiers baked into the data model from day one.

## Stack

| Layer | Technology |
| --- | --- |
| Web frontend | Next.js 14 (App Router) + Tailwind CSS |
| Mobile wrapper | Capacitor (Phase 2) |
| CMS / Admin | Strapi v5 (self-hosted) |
| Auth | Supabase Auth |
| Payments | Paystack (Phase 3) |
| Audio & file CDN | Bunny.net |
| Database | Supabase Postgres (users/tiers) + Strapi's own Postgres (content) |
| Hosting — web | Vercel |
| Hosting — CMS | VPS (Strapi needs a persistent Node process) |

## Monorepo layout

```
apps/
  web/     Next.js app — public site, player, auth, API routes
  cms/     Strapi content types (Song, Album, Lyrics)
packages/
  shared-types/   TypeScript types shared across apps
supabase/
  migrations/     SQL for the profiles table + auth trigger
```

## Getting started

```bash
pnpm install
cp apps/web/.env.local.example apps/web/.env.local   # fill in the values below
pnpm dev
```

### Phase 1 setup sequence

1. `apps/web` is already scaffolded — Next.js 14 + Tailwind.
2. `npx create-strapi-app apps/cms --quickstart` on the VPS (content-type
   schemas for Song/Album/Lyrics are pre-written in `apps/cms/src/api`).
3. Create a Supabase project → copy `SUPABASE_URL`, `SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_KEY`. Run `supabase/migrations/0001_profiles.sql`.
4. Create a Bunny Storage Zone + Pull Zone → copy `BUNNY_STORAGE_API_KEY`
   and `BUNNY_CDN_HOSTNAME`. Enable Token Authentication.
5. Fill in `apps/web/.env.local`.
6. Build out Strapi content, upload first songs to Bunny.
7. `pnpm dev` and test the signed URL route + player.
8. Deploy web to Vercel, CMS to the VPS.

Phase 2 (Capacitor mobile apps) and Phase 3 (Paystack subscriptions) build
on top of this without touching the Phase 1 architecture — see the planning
doc for full detail.
