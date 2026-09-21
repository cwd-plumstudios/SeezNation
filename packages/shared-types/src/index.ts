export type AccessTier = "free" | "subscriber" | "disabled";

export type AlbumType = "album" | "EP" | "mixtape" | "single";

export interface Lyrics {
  id: number;
  body: string;
  syncedJson?: { t: number; line: string }[] | null;
  language: string;
}

export interface Album {
  id: number;
  title: string;
  slug: string;
  coverArt?: string | null;
  releaseDate: string;
  description?: string;
  albumType: AlbumType;
  songs?: Song[];
}

export interface Song {
  id: number;
  title: string;
  slug: string;
  album?: Album | null;
  audioFile: string; // Bunny storage path, e.g. audio/singles/2024/single-name.mp3
  coverArt?: string | null;
  duration: number; // seconds
  releaseDate: string;
  streamTier: AccessTier;
  downloadTier: AccessTier;
  lyrics?: Lyrics | null;
  featuredArtists?: string[];
  playCount?: number;
}

export type UserTier = "free" | "subscriber" | "admin";

export interface UserProfile {
  id: string; // Supabase auth UUID
  displayName?: string | null;
  tier: UserTier;
  paystackCustomerId?: string | null;
  subscriptionExpiry?: string | null; // ISO timestamp, null = never subscribed / expired
  createdAt: string;
}
