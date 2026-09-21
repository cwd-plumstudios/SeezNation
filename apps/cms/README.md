# @seeznation/cms

Strapi v5, self-hosted on a VPS (not compatible with serverless — needs a
persistent Node process).

The `Song`, `Album`, and `Lyrics` content-type schemas are pre-written under
`src/api/` to match the data model in the plan. To bring this up:

```bash
npx create-strapi-app apps/cms --quickstart
# then copy the pre-written src/api/{song,album,lyrics} directories in,
# overwriting the ones the quickstart generates
```

## Content types

| Type | Key fields |
| --- | --- |
| `Song` | title, slug, album (rel), audioFile (Bunny path), coverArt (Bunny path), duration, releaseDate, streamTier, downloadTier, lyrics (rel), featuredArtists |
| `Album` | title, slug, coverArt (Bunny path), releaseDate, description, songs (rel), albumType |
| `Lyrics` | song (rel), body, syncedJson, language |

`audioFile` / `coverArt` store the **Bunny Storage path** (e.g.
`audio/singles/2024/single-name.mp3`), never a public URL — the signed URL is
generated on demand by the web app's `/api/audio/signed-url` route. See the
root README and the plan for the full Bunny + deployment setup.

Users, subscription tiers, and play counts are **not** modelled here — they
live in Supabase Postgres (`supabase/migrations/`).
