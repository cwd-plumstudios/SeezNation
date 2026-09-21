import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server component / API route usage — service role key, bypasses RLS.
// Only use this in server-side code; never expose the service role key to the client.
export function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get: (name: string) => cookies().get(name)?.value,
      },
    },
  );
}
