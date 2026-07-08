"use client";

import { useEffect, useState, useRef } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import SearchModal from "@/components/search/SearchModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navbar');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale});
    setIsLangOpen(false);
  };

  const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 glass-nav transition-all duration-300 ${isScrolled ? 'shadow-md !bg-white/90' : 'shadow-[0px_10px_30px_rgba(30,41,59,0.04)]'}`}>
      <div className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop h-20 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0 transition-transform active:scale-95 font-display-lg text-display-lg-mobile md:text-display-lg font-extrabold text-primary dark:text-inverse-primary tracking-tighter">
          Bora Busan
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/blog" className={`font-label-bold text-label-bold transition-colors duration-200 ${pathname?.startsWith('/blog') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}>{t('stories')}</Link>
          <Link href="/#pilgrimage" className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-colors duration-200">{t('pilgrimage')}</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center" ref={langDropdownRef}>
            <button 
              aria-label={t('language')} 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined">language</span>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 py-2 w-32 bg-white rounded-xl shadow-lg border border-outline-variant z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-body-sm font-body-sm hover:bg-surface-variant transition-colors ${locale === lang.code ? 'text-primary font-bold' : 'text-on-surface'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            aria-label={t('search')} 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <button aria-label="Menu" className="md:hidden p-2 text-on-surface-variant flex items-center justify-center">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
