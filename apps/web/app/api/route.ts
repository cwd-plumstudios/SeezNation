// app/api/route.ts  (delete after testing)
import { generateBunnySignedUrl } from '@/lib/bunny'

export async function GET() {
  // Replace with a real file path you've uploaded to Bunny
  const url = generateBunnySignedUrl('audio/test/sample.mp3', 'stream')
  return Response.json({ url })
}
