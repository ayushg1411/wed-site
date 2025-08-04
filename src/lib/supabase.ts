import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qvkzhpulchcjsjzvylvy.supabase.co'!;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2a3pocHVsY2hjanNqenZ5bHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzY3NzUsImV4cCI6MjA2OTkxMjc3NX0.99KKAzaQhKdkmiXCIf6YfezA3qPtHb9he4vASW5R3hQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};