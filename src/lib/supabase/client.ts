import { createClient as createSupabaseClient } from '@supabase/supabase-js';


// Create a singleton instance for the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
