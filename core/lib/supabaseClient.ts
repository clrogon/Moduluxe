
import { createClient } from '@supabase/supabase-js';

const meta = import.meta as ImportMeta & { env?: Record<string, string | undefined> };
const env = meta.env;

const supabaseUrl = env?.VITE_SUPABASE_URL;
const supabaseAnonKey = env?.VITE_SUPABASE_ANON_KEY;

const missingVars: string[] = [];

if (!supabaseUrl) {
  missingVars.push('VITE_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  missingVars.push('VITE_SUPABASE_ANON_KEY');
}

if (missingVars.length > 0) {
  console.warn(`Supabase is not configured. Missing env variable(s): ${missingVars.join(', ')}. Falling back to local mock mode.`);
}

type SupabaseClientLike = ReturnType<typeof createClient>;

const createUnavailableClient = (): SupabaseClientLike => {
  const unavailableError = new Error('Supabase client is unavailable because required environment variables are not configured.');

  return {
    from: () => {
      throw unavailableError;
    }
  } as unknown as SupabaseClientLike;
};

export const supabase = missingVars.length === 0
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : createUnavailableClient();

export const isSupabaseConfigured = missingVars.length === 0;
  throw new Error(`Missing required Supabase environment variable(s): ${missingVars.join(', ')}.`);
}

const requiredSupabaseUrl = supabaseUrl as string;
const requiredSupabaseAnonKey = supabaseAnonKey as string;

export const supabase = createClient(requiredSupabaseUrl, requiredSupabaseAnonKey);
