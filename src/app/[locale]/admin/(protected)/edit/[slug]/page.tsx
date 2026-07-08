'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { toast } from 'react-hot-toast';

export default function AdminEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: originalSlug } = use(params);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [postType, setPostType] = useState<'standard' | 'place' | 'course'>('standard');
  const [metadataJson, setMetadataJson] = useState<string>('{}');
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [initialData, setInitialData] = useState<any>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', originalSlug)
        .single();
        
      if (error || !data) {
        toast.error('Post not found');
        router.push('/admin/dashboard');
        return;
      }
      
      setInitialData(data);
      setContent(data.content);
      
      const meta = data.metadata || {};
      setPostType(meta.type || 'standard');
      setMetadataJson(JSON.stringify(meta, null, 2));
      setInitialLoading(false);
    }
    
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalSlug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
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

      let image_url = initialData.image_url;

      if (imageFile && imageFile.size > 0) {
        // Upload new image to Supabase Storage
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
      }

      // Update DB
      const { error: updateError } = await supabase
        .from('posts')
        .update({
          title,
          slug,
          description,
          category,
          badge_type,
          content,
          image_url,
          metadata: parsedMetadata,
          // updatedAt or created_at logic can go here if the table supports it
        })
        .eq('id', initialData.id);

      if (updateError) {
        throw new Error(`Update failed: ${updateError.message}`);
      }

      toast.success('Post updated successfully!');
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  if (initialLoading) {
    return <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl text-center text-on-surface-variant">Loading Post Data...</div>;
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white shadow-sm rounded-2xl p-8 border border-outline-variant/30">
        <h1 className="text-headline-md text-on-surface mb-4">Edit Post</h1>
        
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
          <input name="title" defaultValue={initialData?.title} required className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Enter post title" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Slug</label>
          <input name="slug" defaultValue={initialData?.slug} required className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="my-awesome-post" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Description</label>
          <textarea name="description" defaultValue={initialData?.description} required className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" rows={3} placeholder="A short summary of the post"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Category</label>
            <select name="category" defaultValue={initialData?.category} className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none">
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
            <select name="badge_type" defaultValue={initialData?.badge_type} className="px-4 py-3 border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label-bold text-on-surface-variant uppercase tracking-widest flex items-baseline gap-2">
            Thumbnail Image
            <span className="text-xs font-normal normal-case text-on-surface-variant/70">(Leave empty to keep existing image)</span>
          </label>
          {initialData?.image_url && (
            <div className="mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={initialData.image_url} alt="Current thumbnail" className="h-20 w-auto rounded border border-outline-variant" />
            </div>
          )}
          <input type="file" name="imageFile" accept="image/*" className="px-4 py-3 border border-outline-variant rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-label-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
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
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
