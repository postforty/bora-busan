import { redirect } from 'next/navigation';

export default function AdminPage() {
  // 인증 체크는 /admin/(protected)/layout.tsx 의 AdminGuard에서 수행하므로
  // 여기서는 단순히 대시보드로 넘겨줍니다. 
  // 비로그인 상태라면 AdminGuard가 다시 /admin/login으로 리다이렉트 시킵니다.
  redirect('/admin/dashboard');
}
