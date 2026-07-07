import { MDXRemote } from 'next-mdx-remote/rsc';
import AdSlot from '@/components/monetization/AdSlot';
import AffiliateButton from '@/components/monetization/AffiliateButton';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: posts } = await supabase.from('posts').select('slug');
  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

// Custom components to inject into MDX
const components = {
  AdSlot,
  AffiliateButton,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const supabase = createClient();
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-section-gap">
      <header className="max-w-[1000px] mx-auto px-container-margin-mobile md:px-container-margin-desktop mb-12">
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8 font-label-bold transition-colors">
          <span className="material-symbols-outlined mr-1">arrow_back</span> Back to Blog
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-label-bold text-[12px] uppercase tracking-wider">
            {post.category}
          </span>
          <time className="text-on-surface-variant font-body-sm">
            {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-on-surface-variant mb-8 leading-relaxed">
          {post.description}
        </p>
        {post.image_url && (
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-lg mb-12">
            <Image src={post.image_url} alt={post.title} fill className="object-cover" priority />
          </div>
        )}
      </header>

      <div className="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop prose prose-lg prose-slate dark:prose-invert prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-display-md max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>
      
      <div className="max-w-[800px] mx-auto px-container-margin-mobile md:px-container-margin-desktop mt-16">
        <AdSlot />
      </div>
    </article>
  );
}
