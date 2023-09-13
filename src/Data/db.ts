import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://znkxhmomfmwwfuezjwgf.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpua3hobW9tZm13d2Z1ZXpqd2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0NjA3MjMsImV4cCI6MjAxMDAzNjcyM30.VayxENu8Wb2B80kRB-pNjGY4n4gVjjlxT46Jj-PRRts"

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const db = supabase;
export const auth = supabase.auth;

