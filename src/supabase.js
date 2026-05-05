import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CONFIGURATION ---
// 1. Go to https://supabase.com
// 2. Select your Project -> Settings (gear icon) -> API
// 3. Copy the "Project URL" and the "anon public key" below

const supabaseUrl = 'https://hsijuzcopamprkcdumfl.supabase.co';
const supabaseAnonKey = 'sb_publishable_6GGeVS44JgRsgl9TeCgUYw_09QZ6SsK';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper for Google Sign In
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin, // Returns to your site after login
    },
  });
  if (error) throw error;
  return data;
};

// Helper for Logout
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};


