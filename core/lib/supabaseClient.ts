import { createClient } from '@supabase/supabase-js';

const meta = import.meta as ImportMeta & { env?: Record<string, string | undefined> };
const supabaseUrl = meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = meta.env?.VITE_SUPABASE_ANON_KEY;

const missingVars = [
  !supabaseUrl ? 'VITE_SUPABASE_URL' : null,
  !supabaseAnonKey ? 'VITE_SUPABASE_ANON_KEY' : null
].filter(Boolean) as string[];

export const isSupabaseConfigured = missingVars.length === 0;

if (!isSupabaseConfigured) {
  console.warn(
    `Supabase is not configured. Missing env variable(s): ${missingVars.join(', ')}. Falling back to local mock mode.`
  );
}

type SupabaseClientLike = ReturnType<typeof createClient>;

const unavailableClient: SupabaseClientLike = {
  from: () => {
    throw new Error(
      `Supabase client unavailable: missing ${missingVars.join(', ')}. Configure environment variables to enable database access.`
    );
  }
} as unknown as SupabaseClientLike;

export const supabase: SupabaseClientLike = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : unavailableClient;
