'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ViewTracker({ slug }: { slug: string }) {
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const incrementView = async () => {
      const supabase = createClient();
      await supabase.rpc('increment_view', { post_slug: slug });
    };

    incrementView();
  }, [slug]);

  return null;
}
