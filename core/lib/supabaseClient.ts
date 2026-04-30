
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
  throw new Error(`Missing required Supabase environment variable(s): ${missingVars.join(', ')}.`);
}

const requiredSupabaseUrl = supabaseUrl as string;
const requiredSupabaseAnonKey = supabaseAnonKey as string;

export const supabase = createClient(requiredSupabaseUrl, requiredSupabaseAnonKey);
