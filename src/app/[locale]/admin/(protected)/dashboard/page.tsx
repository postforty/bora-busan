'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Link } from '@/i18n/routing';
import DeletePostButton from '@/components/admin/DeletePostButton';
import LogoutButton from '@/components/admin/LogoutButton';

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  created_at: string;
  badge_type: 'primary' | 'secondary' | 'tertiary';
}

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, category, created_at, badge_type, post_translations(title, locale)')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      const mappedPosts = data.map((post: any) => {
        const translations = post.post_translations || [];
        const koTitle = translations.find((pt: any) => pt.locale === 'ko')?.title;
        const fallbackTitle = translations[0]?.title;
        return {
          id: post.id,
          slug: post.slug,
          category: post.category,
          created_at: post.created_at,
          badge_type: post.badge_type,
          title: koTitle || fallbackTitle || '(제목 없음)'
        };
      });
      setPosts(mappedPosts as Post[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-headline-md text-on-surface">관리자 대시보드</h1>
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/write" 
            className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-bold hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            + 새 글 작성
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-on-surface-variant">게시글을 불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant">게시글이 없습니다. 첫 글을 작성해보세요!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-variant text-on-surface-variant text-label-md uppercase tracking-wider">
                  <th className="px-6 py-4 border-b border-outline-variant/30 font-medium">제목</th>
                  <th className="px-6 py-4 border-b border-outline-variant/30 font-medium">카테고리</th>
                  <th className="px-6 py-4 border-b border-outline-variant/30 font-medium">작성일</th>
                  <th className="px-6 py-4 border-b border-outline-variant/30 font-medium text-right">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-variant/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-label-bold block truncate max-w-[300px]" title={post.title}>
                        {post.title}
                      </Link>
                      <span className="text-body-sm text-on-surface-variant block mt-1 truncate">/{post.slug}</span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface">
                      <span className={`px-3 py-1 rounded-full font-label-bold text-[12px] uppercase tracking-wider ${
                        post.badge_type === 'secondary' ? 'bg-[#873ec4] text-white' :
                        post.badge_type === 'tertiary' ? 'bg-primary-fixed text-on-primary-fixed' :
                        'bg-primary text-on-primary'
                      }`}>
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link href={`/admin/edit/${post.slug}`} className="inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors" title="게시글 수정">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </Link>
                        <DeletePostButton 
                          slug={post.slug} 
                          onDeleted={fetchPosts}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
