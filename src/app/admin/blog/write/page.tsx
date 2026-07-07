import WriteForm from './WriteForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminWritePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect to home if not authenticated
  if (!user) {
    redirect('/');
  }

  return (
    <div className="pt-32 pb-section-gap min-h-screen bg-gray-50">
      <WriteForm />
    </div>
  );
}
