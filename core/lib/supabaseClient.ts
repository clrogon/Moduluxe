
import { createClient } from '@supabase/supabase-js';

// Safely access env vars. Fallback to empty object if import.meta.env is undefined to prevent crash.
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

// Only create the client if env vars are present
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
