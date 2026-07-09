-- Supabase RLS (Row Level Security) Policies for BoraBusan
-- Run these commands in the Supabase SQL Editor.

-- 1. Enable RLS on the posts table (assuming your table is named 'posts')
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 2. Allow anyone to read (SELECT) published posts
CREATE POLICY "Allow public read access" 
ON public.posts 
FOR SELECT 
USING (true);

-- 3. Allow only admins to INSERT posts
-- This checks the raw_app_meta_data -> 'role' property from the user's JWT
CREATE POLICY "Allow admin insert" 
ON public.posts 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- 4. Allow only admins to UPDATE posts
CREATE POLICY "Allow admin update" 
ON public.posts 
FOR UPDATE 
TO authenticated 
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- 5. Allow only admins to DELETE posts
CREATE POLICY "Allow admin delete" 
ON public.posts 
FOR DELETE 
TO authenticated 
USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- ==========================================
-- HOW TO MAKE A USER AN ADMIN (One-time setup)
-- Run this replacing 'user-uuid' with the actual user ID from the Auth -> Users dashboard
-- ==========================================
/*
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb
WHERE id = 'user-uuid';
*/
