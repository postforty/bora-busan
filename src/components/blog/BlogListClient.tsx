'use client';

import React, { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import Pagination from './Pagination';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Dynamically import map to avoid SSR issues
const GlobalMap = dynamic(() => import('../map/GlobalMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface-container-low animate-pulse rounded-xl flex items-center justify-center">Loading Map...</div>
});

interface BlogListClientProps {
  posts: any[];
  locale: string;
  totalPages: number;
}

export default function BlogListClient({ posts, locale, totalPages }: BlogListClientProps) {
  const t = useTranslations('Map');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query (idol name)
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const lowerQuery = searchQuery.toLowerCase();
    return posts.filter(post => {
      const translation = post.post_translations?.[0];
      const idols = translation?.metadata?.idols || [];
      // Search in idols array first
      if (idols.some((idol: string) => idol.toLowerCase().includes(lowerQuery))) {
        return true;
      }
      // Fallback: search in title or description just in case
      if (translation?.title?.toLowerCase().includes(lowerQuery) || 
          translation?.description?.toLowerCase().includes(lowerQuery)) {
        return true;
      }
      return false;
    });
  }, [posts, searchQuery]);

  return (
    <>
      <section className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input 
              type="text" 
              placeholder={t('search_placeholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-full bg-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md"
            />
          </div>
        </div>

        {viewMode === 'list' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-8">
              {filteredPosts.map((post) => {
                const translation = post.post_translations?.[0];
                if (!translation) return null;
                return (
                  <BlogCard 
                    key={post.id} 
                    title={translation.title}
                    description={translation.description}
                    date={new Date(post.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                    category={post.category}
                    imageUrl={post.image_url}
                    likes={post.likes.toString()}
                    views={post.views?.toString() || "0"}
                    badgeType={post.badge_type as "primary" | "secondary"}
                    href={`/blog/${post.slug}`}
                  />
                );
              })}
            </div>
            {filteredPosts.length === 0 && (
              <div className="text-center py-20 text-on-surface-variant">
                {t('no_results')}
              </div>
            )}
            {/* Pagination is hidden in map mode, and might need to be dynamic in list mode. For now we show it when in list mode */}
            {filteredPosts.length > 0 && !searchQuery && (
              <div className="mt-8">
                <Pagination totalPages={totalPages} basePath="/blog" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-[70vh] rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
            <GlobalMap posts={filteredPosts} />
          </div>
        )}
      </section>

      {/* Floating Action Button for View Toggle */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-transform active:scale-95 font-label-bold"
        >
          {viewMode === 'list' ? (
            <>
              <span>{t('map_view')}</span>
              <span className="material-symbols-outlined text-[18px]">map</span>
            </>
          ) : (
            <>
              <span>{t('list_view')}</span>
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
