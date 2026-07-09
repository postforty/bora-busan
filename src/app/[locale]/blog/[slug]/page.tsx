import { MDXRemote } from 'next-mdx-remote/rsc';
import AdSlot from '@/components/monetization/AdSlot';
import AffiliateButton from '@/components/monetization/AffiliateButton';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

import ClientAdminControls from '@/components/admin/ClientAdminControls';
import PlaceInfoCard, { PlaceMetadata } from '@/components/blog/PlaceInfoCard';
import CourseTimeline, { CourseMetadata } from '@/components/blog/CourseTimeline';
import ViewTracker from '@/components/blog/ViewTracker';
import LikeButton from '@/components/blog/LikeButton';

export const runtime = 'edge';

// Custom components to inject into MDX
const components = {
  AdSlot,
  adslot: AdSlot,
  AffiliateButton,
  affiliatebutton: AffiliateButton,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const decodedSlug = decodeURIComponent(slug);
  
  const supabase = createClient();
  const { data: post, error } = await supabase
    .from('posts')
    .select('*, post_translations!inner(*)')
    .eq('slug', decodedSlug)
    .eq('post_translations.locale', locale)
    .single();

  if (error || !post || !post.post_translations || post.post_translations.length === 0) {
    notFound();
  }

  const translation = post.post_translations[0];
  const title = translation.title;
  const description = translation.description;
  const content = translation.content;
  const metadata = translation.metadata;

  return (
    <article className="pt-32 pb-section-gap">
      <header className="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop mb-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/blog" className="inline-flex items-center text-primary hover:underline font-label-bold transition-colors">
            <span className="material-symbols-outlined mr-1">arrow_back</span> Back to Blog
          </Link>
          <ClientAdminControls slug={post.slug} />
        </div>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-label-bold text-[12px] uppercase tracking-wider">
            {post.category}
          </span>
          <time className="text-on-surface-variant font-body-sm flex-1">
            {new Date(post.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <div className="flex items-center text-on-surface-variant gap-4">
            <div className="flex items-center gap-1" title="Views">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span className="font-label-sm">{post.views || 0}</span>
            </div>
            <div className="flex items-center gap-1" title="Likes">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              <span className="font-label-sm">{post.likes || 0}</span>
            </div>
          </div>
        </div>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl text-on-surface-variant mb-8 leading-relaxed">
          {description}
        </p>
        {post.image_url && (
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-lg mb-12">
            <Image src={post.image_url} alt={title} fill sizes="100vw" className="object-cover" priority />
          </div>
        )}
      </header>

      <div className="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop mb-8">
        {metadata && typeof metadata === 'object' && !Array.isArray(metadata) && (metadata as Record<string, unknown>).type === 'place' && (
          <PlaceInfoCard metadata={metadata as unknown as PlaceMetadata} />
        )}
        {metadata && typeof metadata === 'object' && !Array.isArray(metadata) && (metadata as Record<string, unknown>).type === 'course' && (
          <CourseTimeline metadata={metadata as unknown as CourseMetadata} />
        )}
      </div>

      <div className="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <div className="prose prose-lg prose-slate dark:prose-invert prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-display-md max-w-none">
          <MDXRemote source={content} components={components} />
        </div>
      </div>
      
      <div className="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <LikeButton slug={post.slug} initialLikes={post.likes || 0} />
      </div>
      
      <div className="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop mt-16">
        <AdSlot />
      </div>
      <ViewTracker slug={post.slug} />
    </article>
  );
}
