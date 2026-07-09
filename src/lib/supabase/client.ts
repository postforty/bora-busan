import { createClient as createSupabaseClient } from '@supabase/supabase-js';


// Create a singleton instance for the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// We will check them inside createClient to prevent build-time crashes
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables');
}

// Global variable to hold the singleton instance in the browser
let browserClient: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  if (typeof window !== 'undefined') {
    // Browser environment: use singleton pattern
    if (!browserClient) {
      browserClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);
    }
    return browserClient;
  }

  // Server environment: always create a new instance
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
