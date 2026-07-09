import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export const runtime = 'edge';

interface PolicyPageTemplateProps {
  slug: string;
  locale: string;
  fallbackTitle: string;
  fallbackDescription: string;
  lastUpdatedLabel: string;
}

export default async function PolicyPageTemplate({
  slug,
  locale,
  fallbackTitle,
  fallbackDescription,
  lastUpdatedLabel
}: PolicyPageTemplateProps) {
  const supabase = createClient();
  
  // Fetch policy post from DB
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, post_translations!inner(*)')
    .eq('slug', slug)
    .eq('category', 'Policy')
    .eq('post_translations.locale', locale)
    .single();

  // If no post is found in the DB (e.g., admin hasn't created it yet), 
  // we fallback to a static display or just return 404. Let's return a clean fallback.
  if (error || !post || !post.post_translations || post.post_translations.length === 0) {
    return (
      <div className="pt-32 pb-section-gap max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop min-h-[60vh]">
        <h1 className="font-display-md text-display-md text-on-surface mb-8">{fallbackTitle}</h1>
        <div className="text-on-surface-variant font-body-lg space-y-4">
          <p>{lastUpdatedLabel} {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>{fallbackDescription}</p>
          <p className="text-sm opacity-50 mt-8 p-4 bg-surface-variant rounded-lg">
            이 페이지의 내용은 데이터베이스에서 불러오게 됩니다. 
            관리자 페이지에서 <code>{slug}</code> 슬러그로 Policy 카테고리 글을 작성해 주세요.
          </p>
        </div>
      </div>
    );
  }

  const translation = post.post_translations[0];
  const title = translation.title;
  const content = translation.content;
  const updatedAt = new Date(post.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="pt-32 pb-section-gap max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop min-h-[60vh]">
      <header className="mb-12">
        <h1 className="font-display-md text-display-md text-on-surface mb-4 leading-tight">
          {title}
        </h1>
        <div className="text-on-surface-variant font-body-md">
          <span>{lastUpdatedLabel} {updatedAt}</span>
        </div>
      </header>

      <div className="prose prose-lg prose-slate dark:prose-invert prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-display-sm max-w-none">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
