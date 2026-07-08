'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('로그아웃 되었습니다.');
      router.push('/admin/login');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-error bg-error/10 px-4 py-2 rounded-lg font-label-bold hover:bg-error hover:text-white transition-colors"
    >
      로그아웃
    </button>
  );
}
