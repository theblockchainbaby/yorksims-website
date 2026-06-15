import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Uses the service role key when available, falling back to the anon key.
 * Service role bypasses RLS — required for trusted server-only writes like
 * lead capture, webhook persistence, and admin operations. NEVER import this
 * from a client component.
 *
 * Required env vars:
 *   NEXT_PUBLIC_SUPABASE_URL        — public URL, also used on the client
 *   SUPABASE_SERVICE_ROLE_KEY       — server-only, bypass RLS
 *   (fallback) NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

let cached: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = serviceKey ?? anonKey;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }

  cached = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cached;
}
