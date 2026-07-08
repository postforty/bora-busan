"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('Footer');

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
        console.error(`${t('share_failed')} ${err}`);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert(t('copy_success'));
      } catch (err) {
        console.error(`${t('copy_failed')} ${err}`);
      }
    }
  };

  return (
    <footer className="bg-surface-container dark:bg-surface-container-highest py-section-gap border-t border-surface-variant">
      <div className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-5 mb-10 md:mb-0">
          <Link href="/" className="inline-block font-display-lg text-headline-md font-extrabold text-primary dark:text-inverse-primary tracking-tighter mb-6">Bora Busan</Link>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-8">
            {t('description')}
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
          <h4 className="font-label-bold text-label-bold text-primary uppercase mb-6">{t('navigation')}</h4>
          <ul className="space-y-4">
            <li><Link href="/blog" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">{t('stories')}</Link></li>
            <li><Link href="/#pilgrimage" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">{t('pilgrimage')}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="font-label-bold text-label-bold text-primary uppercase mb-6">{t('legal_contact')}</h4>
          <ul className="space-y-4 mb-8">
            <li><Link href="/privacy" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">{t('privacy')}</Link></li>
            <li><Link href="/terms" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">{t('terms')}</Link></li>
            <li><Link href="/cookies" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">{t('cookies')}</Link></li>
            <li><Link href="/contact" className="font-body-md text-body-md text-on-surface-variant hover:text-primary hover:underline transition-all">{t('contact')}</Link></li>
          </ul>
          <p className="font-label-sm text-label-sm text-on-surface-variant/60">
            {t('copyright')} <br />
            {t('crafted')}
          </p>
        </div>
      </div>
    </footer>
  );
}
