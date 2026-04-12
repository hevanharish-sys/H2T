import { createBrowserClient } from "@supabase/ssr";

// Fallback to placeholder values to prevent fatal crashes on Vercel if ENV vars are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.key";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  );
