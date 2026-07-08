'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      // Check if user has admin role
      const userRole = data.session.user.app_metadata?.role;
      
      if (userRole !== 'admin') {
        // If not admin, sign them out immediately
        await supabase.auth.signOut();
        throw new Error('Access denied. Administrator privileges required.');
      }

      // Success! Redirect to the protected write page
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center pt-28 pb-12 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-8 shadow-[0_8px_30px_rgba(30,41,59,0.08)]">
          <div className="text-center mb-8">
            <h1 className="font-headline-sm text-headline-sm text-on-surface mb-2">Admin Portal</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Sign in to manage Bora Busan contents</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-label-sm font-label-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                placeholder="admin@borabusan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-label-bold text-on-surface-variant uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 w-full bg-primary text-on-primary font-label-bold py-4 rounded-xl hover:bg-primary-container hover:text-on-primary-container disabled:opacity-50 transition-colors shadow-md relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? 'Authenticating...' : 'Sign In'}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
            <p className="text-[12px] text-on-surface-variant/70">
              Authorized personnel only. Contact system administrator for access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
