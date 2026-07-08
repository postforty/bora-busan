'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

export default function LikeButton({ slug, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (likedPosts.includes(slug)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLiked(true);
    }
  }, [slug]);

  const handleLikeToggle = async () => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const supabase = createClient();
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isLiked) {
      // Unlike
      setLikes((prev) => Math.max(prev - 1, 0));
      setIsLiked(false);
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter((s: string) => s !== slug)));
      await supabase.rpc('decrement_like', { post_slug: slug });
    } else {
      // Like
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, slug]));
      await supabase.rpc('increment_like', { post_slug: slug });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 border-t border-outline-variant/30 mt-12">
      <p className="text-on-surface-variant font-body-sm mb-4">Did you find this helpful?</p>
      <button 
        onClick={handleLikeToggle}
        className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
          isLiked 
            ? 'border-primary bg-primary/10 text-primary' 
            : 'border-outline-variant bg-surface hover:border-primary hover:bg-primary/5 text-on-surface'
        } ${isAnimating ? 'scale-110' : 'scale-100'}`}
      >
        <span className={`material-symbols-outlined text-[24px] ${isLiked ? 'font-icon-filled text-primary' : ''}`}>
          favorite
        </span>
        <span className="font-label-lg">{likes}</span>
      </button>
    </div>
  );
}
