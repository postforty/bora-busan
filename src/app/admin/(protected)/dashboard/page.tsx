'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import DeletePostButton from '@/components/admin/DeletePostButton';

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, category, created_at')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-headline-md text-on-surface">Admin Dashboard</h1>
        <Link 
          href="/admin/write" 
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-bold hover:bg-primary-container hover:text-on-primary-container transition-colors"
        >
          + Write New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-on-surface-variant">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant">No posts found. Create one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-variant text-on-surface-variant text-label-md uppercase tracking-wider">
                  <th className="px-6 py-4 border-b border-outline-variant/30 font-medium">Title</th>
                  <th className="px-6 py-4 border-b border-outline-variant/30 font-medium">Category</th>
                  <th className="px-6 py-4 border-b border-outline-variant/30 font-medium">Date</th>
                  <th className="px-6 py-4 border-b border-outline-variant/30 font-medium text-right">Actions</th>
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
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-bold text-[12px] uppercase">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-on-surface-variant">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="inline-flex items-center justify-center p-2 rounded-lg text-on-surface-variant hover:bg-surface hover:text-primary transition-colors" title="Edit Post (Coming Soon)">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
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
