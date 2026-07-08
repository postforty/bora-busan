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
    if (!window.confirm(`게시글 "${slug}"을(를) 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
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

      toast.success('게시글이 성공적으로 삭제되었습니다!');
      
      if (onDeleted) {
        onDeleted();
      }

      if (redirectTo) {
        router.push(redirectTo);
        // Also call router.refresh() if redirecting to a page that might have cached data
        router.refresh();
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : '게시글 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`inline-flex items-center justify-center text-error hover:bg-error/10 p-2 rounded-lg transition-colors disabled:opacity-50 ${className || ''}`}
      title="게시글 삭제"
    >
      <span className="material-symbols-outlined text-[20px]">delete</span>
    </button>
  );
}
