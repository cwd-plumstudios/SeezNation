// apps/web/lib/bunny.ts
import crypto from 'crypto'

const CDN_HOST = process.env.BUNNY_CDN_HOSTNAME!
const SECRET = process.env.BUNNY_TOKEN_SECRET!
const STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE_NAME!
const STORAGE_API_KEY = process.env.BUNNY_STORAGE_API_KEY!

// ─── Signed URL ───────────────────────────────────────────────────────────────

/**
 * Generates a token-authenticated Bunny CDN URL.
 * The token expires after `expirySeconds` — default 30 minutes.
 * For downloads, pass type: 'download' to force Content-Disposition: attachment.
 */
export function generateBunnySignedUrl(
  filePath: string,
  type: 'stream' | 'download' = 'stream',
  expirySeconds = 1800
): string {
  const expiry = Math.floor(Date.now() / 1000) + expirySeconds
  const urlPath = `/${filePath.replace(/^\//, '')}` // ensure leading slash, no double

  // Bunny token = base64url( MD5( secret + urlPath + expiry ) )
  const token = crypto
    .createHash('md5')
    .update(SECRET + urlPath + expiry)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  const params = new URLSearchParams({
    token,
    expires: String(expiry),
  })

  // Force file download instead of browser stream
  if (type === 'download') {
    const filename = filePath.split('/').pop() ?? 'track.mp3'
    params.set('response-content-disposition', `attachment; filename="${filename}"`)
  }

  return `https://${CDN_HOST}${urlPath}?${params.toString()}`
}

// ─── Upload helper (used by admin/upload tooling, not the public site) ────────

/**
 * Uploads a file buffer to Bunny Storage.
 * Call this from a server-side admin script — never expose STORAGE_API_KEY client-side.
 */
export async function uploadToBunny(
  filePath: string,   // e.g. 'audio/singles/2024/my-track.mp3'
  fileBuffer: Buffer,
  mimeType = 'audio/mpeg'
): Promise<{ success: boolean; path: string }> {
  const url = `https://storage.bunnycdn.com/${STORAGE_ZONE}/${filePath}`

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      AccessKey: STORAGE_API_KEY,
      'Content-Type': mimeType,
    },
    body: fileBuffer,
  })

  if (!res.ok) {
    throw new Error(`Bunny upload failed: ${res.status} ${await res.text()}`)
  }

  return { success: true, path: filePath }
}

// ─── Delete helper ────────────────────────────────────────────────────────────

export async function deleteFromBunny(filePath: string): Promise<void> {
  const url = `https://storage.bunnycdn.com/${STORAGE_ZONE}/${filePath}`

  const res = await fetch(url, {
    method: 'DELETE',
    headers: { AccessKey: STORAGE_API_KEY },
  })

  if (!res.ok) {
    throw new Error(`Bunny delete failed: ${res.status} ${await res.text()}`)
  }
}

// ─── Type exports ─────────────────────────────────────────────────────────────

export type BunnyUrlType = 'stream' | 'download'
