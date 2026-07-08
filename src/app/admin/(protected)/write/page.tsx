'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { toast } from 'react-hot-toast';

export default function AdminWritePage() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState<'standard' | 'place' | 'course'>('standard');
  const [metadataJson, setMetadataJson] = useState<string>('{}');
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    // Construct FormData synchronously before any await
    const formData = new FormData(e.currentTarget);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Unauthorized');

      const title = formData.get('title') as string;
      const slug = formData.get('slug') as string;
      const description = formData.get('description') as string;
      const category = formData.get('category') as string;
      const badge_type = formData.get('badge_type') as string;
      const imageFile = formData.get('imageFile') as File | null;
      
      if (!title || !slug || !description || !category || !badge_type || !content) {
        throw new Error('All text fields are required');
      }

      let parsedMetadata = null;
      try {
        parsedMetadata = JSON.parse(metadataJson);
      } catch {
        throw new Error('Invalid JSON format in Metadata field');
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
          author_id: session.user.id,
          metadata: parsedMetadata
        });

      if (insertError) {
        throw new Error(`Insert failed: ${insertError.message}`);
      }

      toast.success('Post created successfully!');
      router.push('/blog');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white shadow-sm rounded-2xl p-8 border border-outline-variant/30">
        <h1 className="text-headline-md text-on-surface mb-4">Write New Post</h1>
        
        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Post Format Type</label>
          <select 
            value={postType}
            onChange={(e) => {
              const type = e.target.value as 'standard' | 'place' | 'course';
              setPostType(type);
              if (type === 'place') {
                setMetadataJson(JSON.stringify({
                  type: "place",
                  address: "부산광역시 해운대구 달맞이길",
                  nearest_station: "해운대역",
                  hours: "10:00 - 19:00",
                  tips: "창가 자리가 채광이 좋아요",
                  coordinates: { lat: 35.158, lng: 129.172 },
                  related_content: [{ type: "mv", title: "관련 영상 제목" }]
                }, null, 2));
              } else if (type === 'course') {
                setMetadataJson(JSON.stringify({
                  type: "course",
                  duration_days: 1,
                  transport: "지하철 + 도보",
                  steps: [
                    { time: "09:30-11:30", place_name: "방문지 이름", activities: ["인증샷", "굿즈샵"] }
                  ]
                }, null, 2));
              } else {
                setMetadataJson('{}');
              }
            }}
            className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="standard">Standard (기본 블로그)</option>
            <option value="place">Place (장소 스팟형)</option>
            <option value="course">Course (코스 일정형)</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Title</label>
          <input name="title" required className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Enter post title" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Slug</label>
          <input name="slug" required className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="my-awesome-post" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Description</label>
          <textarea name="description" required className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" rows={3} placeholder="A short summary of the post"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Category</label>
            <select name="category" className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              <option value="K-Pop Pilgrimage">K-Pop Pilgrimage</option>
              <option value="Cafe Tour">Cafe Tour</option>
              <option value="Coastal Life">Coastal Life</option>
              <option value="Foodie Finds">Foodie Finds</option>
              <option value="Arts & Design">Arts & Design</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Badge Type</label>
            <select name="badge_type" className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Thumbnail Image</label>
          <input type="file" name="imageFile" accept="image/*" required className="px-4 py-3 border border-outline-variant rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-label-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
        </div>

        {postType !== 'standard' && (
          <div className="flex flex-col gap-2">
            <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Metadata (JSON)</label>
            <p className="text-body-sm text-on-surface-variant">포맷에 맞게 JSON 데이터를 수정하세요.</p>
            <textarea 
              value={metadataJson}
              onChange={(e) => setMetadataJson(e.target.value)}
              className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono text-sm" 
              rows={10} 
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Content (Markdown)</label>
          <MarkdownEditor initialValue={content} onChange={(val) => setContent(val || '')} />
        </div>

        <button disabled={loading} type="submit" className="mt-6 bg-primary text-on-primary font-label-bold py-4 px-6 rounded-xl hover:bg-primary-container hover:text-on-primary-container disabled:opacity-50 transition-colors shadow-md">
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}
