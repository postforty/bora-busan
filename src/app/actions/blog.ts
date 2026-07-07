'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  // Extract form fields
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const badge_type = formData.get('badge_type') as string;
  const content = formData.get('content') as string;
  const imageFile = formData.get('imageFile') as File | null;
  
  if (!title || !slug || !description || !category || !badge_type || !content) {
    throw new Error('All text fields are required');
  }

  let image_url = '';

  if (imageFile && imageFile.size > 0) {
    // Upload image to Supabase Storage
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-media')
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error('Image upload failed:', uploadError);
      throw new Error('Image upload failed');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-media')
      .getPublicUrl(filePath);

    image_url = publicUrl;
  } else {
    throw new Error('Thumbnail image is required');
  }

  // Insert to DB
  const { error: insertError } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      description,
      category,
      badge_type,
      content,
      image_url,
      author_id: user.id
    });

  if (insertError) {
    console.error('Insert failed:', insertError);
    throw new Error(`Insert failed: ${insertError.message}`);
  }

  revalidatePath('/blog');
  redirect('/blog');
}
