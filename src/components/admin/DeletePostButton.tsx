'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'react-hot-toast';

interface DeletePostButtonProps {
  slug: string;
  redirectTo?: string;
  onDeleted?: () => void;
  className?: string;
}

export default function DeletePostButton({ slug, redirectTo, onDeleted, className }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the post "${slug}"?\nThis action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      // Security: RLS will block this if the user is not authenticated or not an admin
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('slug', slug);

      if (error) {
        throw new Error(error.message);
      }

      toast.success('Post deleted successfully!');
      
      if (onDeleted) {
        onDeleted();
      }

      if (redirectTo) {
        router.push(redirectTo);
        // Also call router.refresh() if redirecting to a page that might have cached data
        router.refresh();
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`inline-flex items-center justify-center text-error hover:bg-error/10 p-2 rounded-lg transition-colors disabled:opacity-50 ${className || ''}`}
      title="Delete Post"
    >
      <span className="material-symbols-outlined text-[20px]">delete</span>
    </button>
  );
}
