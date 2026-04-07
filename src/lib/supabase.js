import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabase] Missing environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY. ' +
    'Supabase client will not function correctly.'
  );
}

// Fall back to placeholder values so createClient doesn't throw when env vars
// aren't configured yet. Auth/DB calls will simply fail gracefully at runtime.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

/**
 * Returns the currently authenticated user, or null if not signed in.
 * @returns {Promise<import('@supabase/supabase-js').User|null>}
 */
export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('[supabase] getCurrentUser error:', error.message);
      return null;
    }

    return user ?? null;
  } catch (err) {
    console.error('[supabase] getCurrentUser unexpected error:', err);
    return null;
  }
}

export default supabase;
