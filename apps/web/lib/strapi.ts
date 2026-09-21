import type { Album, Song } from "./types";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function strapiFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  }

  const res = await fetch(url, {
    headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : undefined,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${url.pathname}`);
  }

  const json = await res.json();
  return json.data as T;
}

export async function getSongs(): Promise<Song[]> {
  return strapiFetch<Song[]>("/songs", { populate: "*" });
}

export async function getSongBySlug(slug: string): Promise<Song | null> {
  const songs = await strapiFetch<Song[]>("/songs", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
  return songs[0] ?? null;
}

export async function getAlbums(): Promise<Album[]> {
  return strapiFetch<Album[]>("/albums", { populate: "*" });
}

export async function getAlbumBySlug(slug: string): Promise<Album | null> {
  const albums = await strapiFetch<Album[]>("/albums", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
  return albums[0] ?? null;
}
