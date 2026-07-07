import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

export default async function PilgrimageSection() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error || !posts || posts.length < 3) {
    return null; // For simplicity, require at least 3 posts for the masonry layout
  }

  const [post1, post2, post3] = posts;

  return (
    <section className="py-section-gap bg-surface" id="pilgrimage">
      <div className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="font-label-bold text-label-bold text-primary uppercase tracking-widest block mb-2">Fan Favorites</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">The Pilgrimage Route</h2>
          </div>
          <div className="flex flex-col md:items-end gap-2">
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Curated spots across Busan where moments became memories for fans worldwide.
            </p>
            <Link href="/blog" className="text-primary font-label-bold hover:underline inline-flex items-center">
              View all stories <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main 8-col card */}
          <div className="md:col-span-8 group cursor-pointer">
            <Link href={`/blog/${post1.slug}`} className="block relative overflow-hidden rounded-2xl h-[400px] card-shadow">
              <Image alt={post1.title} className="object-cover transition-transform duration-700 group-hover:scale-110" src={post1.image_url} fill sizes="(max-width: 768px) 100vw, 66vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1 bg-primary text-white font-label-bold text-label-bold rounded-full">{post1.category}</span>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-white mb-2">{post1.title}</h3>
                  <p className="font-body-md text-body-md text-white/80 max-w-md line-clamp-2">{post1.description}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md w-12 h-12 flex items-center justify-center rounded-full text-white border border-white/20 group-hover:bg-primary transition-colors flex-shrink-0 ml-4">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* 4-col card */}
          <div className="md:col-span-4 group cursor-pointer">
            <Link href={`/blog/${post2.slug}`} className="block relative overflow-hidden rounded-2xl h-[400px] card-shadow">
              <Image alt={post2.title} className="object-cover transition-transform duration-700 group-hover:scale-110" src={post2.image_url} fill sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1 bg-secondary text-white font-label-bold text-label-bold rounded-full">{post2.category}</span>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="font-headline-sm text-headline-sm text-white mb-2">{post2.title}</h3>
                <p className="font-body-md text-body-md text-white/80 line-clamp-2">{post2.description}</p>
                <div className="mt-4 inline-flex items-center text-secondary-fixed font-label-bold text-label-bold">
                  View Details <span className="material-symbols-outlined ml-2 text-sm">open_in_new</span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* 12-col card */}
          <div className="md:col-span-12 group cursor-pointer">
            <Link href={`/blog/${post3.slug}`} className="block relative overflow-hidden rounded-2xl h-[300px] md:h-[350px] card-shadow">
              <Image alt={post3.title} className="object-cover transition-transform duration-700 group-hover:scale-105" src={post3.image_url} fill sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1 bg-tertiary text-white font-label-bold text-label-bold rounded-full">{post3.category}</span>
              </div>
              <div className="absolute inset-0 flex items-center p-12">
                <div className="max-w-lg">
                  <h3 className="font-headline-md text-headline-md text-white mb-4">{post3.title}</h3>
                  <p className="font-body-lg text-body-lg text-white/90 mb-6 line-clamp-2">{post3.description}</p>
                  <button className="flex items-center space-x-3 bg-white text-primary px-6 py-2 rounded-full font-label-bold text-label-bold group-hover:bg-primary-fixed transition-colors">
                    <span>Discover the Magic</span>
                    <span className="material-symbols-outlined">play_circle</span>
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
