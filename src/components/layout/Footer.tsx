"use client";

import Link from "next/link";

export default function Footer() {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    if (!currentUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: currentUrl,
        });
      } catch (err) {
        console.error("공유하기 실패:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert("링크가 클립보드에 복사되었습니다.");
      } catch (err) {
        console.error("클립보드 복사 실패:", err);
      }
    }
  };

  return (
    <footer className="bg-surface-container dark:bg-surface-container-highest py-section-gap border-t border-surface-variant">
      <div className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-5 mb-10 md:mb-0">
          <Link href="/" className="inline-block font-display-lg text-headline-md font-extrabold text-primary dark:text-inverse-primary tracking-tighter mb-6">Bora Busan</Link>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-8">
            Curating premium experiences for the global K-culture community. Discover the soul of Busan through our fan-focused lens.
          </p>
          <div className="flex space-x-6">
            <button onClick={handleShare} className="cursor-pointer text-on-surface-variant hover:text-primary transition-colors" aria-label="Share">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button disabled className="opacity-30 cursor-not-allowed text-on-surface-variant" aria-label="Instagram (Coming Soon)">
              <span className="material-symbols-outlined">camera_enhance</span>
            </button>
            <button disabled className="opacity-30 cursor-not-allowed text-on-surface-variant" aria-label="YouTube (Coming Soon)">
              <span className="material-symbols-outlined">play_arrow</span>
            </button>
          </div>
        </div>
        <div className="md:col-span-3 mb-8 md:mb-0">
          <h4 className="font-label-bold text-label-bold text-primary uppercase mb-6">Navigation</h4>
          <ul className="space-y-4">
            <li><Link href="/blog" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">Stories & Guides</Link></li>
            <li><Link href="/#pilgrimage" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">The Pilgrimage Route</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="font-label-bold text-label-bold text-primary uppercase mb-6">Legal & Contact</h4>
          <ul className="space-y-4 mb-8">
            <li><Link href="/privacy" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">Privacy Policy</Link></li>
            <li><Link href="/terms" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">Terms of Service</Link></li>
            <li><Link href="/cookies" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">Cookie Settings</Link></li>
            <li><Link href="/contact" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">Contact Us</Link></li>
          </ul>
          <p className="font-label-sm text-label-sm text-on-surface-variant/60">
            © 2026 Bora Busan. All rights reserved. <br />
            Crafted with 💜 for the Fandom.
          </p>
        </div>
      </div>
    </footer>
  );
}
