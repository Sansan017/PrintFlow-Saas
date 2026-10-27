import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { assertSupabaseConfigured, supabaseConfig } from "./env";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;
  assertSupabaseConfigured();
  client = createClient(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}

// Untuk pengujian: izinkan injeksi client tiruan.
export function __setSupabaseClientForTest(mock: SupabaseClient | null): void {
  client = mock;
}
