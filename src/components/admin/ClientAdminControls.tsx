'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import DeletePostButton from './DeletePostButton';

interface ClientAdminControlsProps {
  slug: string;
}

export default function ClientAdminControls({ slug }: ClientAdminControlsProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.app_metadata?.role === 'admin') {
        setIsAdmin(true);
      }
    };
    checkRole();
  }, [supabase.auth]);

  if (!isAdmin) return null;

  return (
    <div className="flex items-center gap-2">
      <DeletePostButton 
        slug={slug} 
        redirectTo="/blog" 
        className="bg-error/10 hover:bg-error/20" 
      />
    </div>
  );
}
