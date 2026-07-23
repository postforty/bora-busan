"use client";

import { useEffect, useState, useRef } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import SearchModal from "@/components/search/SearchModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActiveHash(window.location.hash);
    }
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangOpen(false);
  };

  const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 glass-nav transition-all duration-300 ${isScrolled ? 'shadow-md !bg-white/90' : 'shadow-[0px_10px_30px_rgba(30,41,59,0.04)]'}`}>
      <div className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop h-20 flex justify-between items-center">
        <Link href="/" onClick={() => setActiveHash('')} className="flex-shrink-0 transition-transform active:scale-95 font-display-lg text-display-lg-mobile md:text-display-lg font-extrabold text-primary dark:text-inverse-primary tracking-tighter">
          BoraBusan
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/blog" onClick={() => setActiveHash('')} className={`font-label-bold text-label-bold transition-colors duration-200 ${pathname?.startsWith('/blog') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}>{t('stories')}</Link>
          <Link href="/#pilgrimage" onClick={() => setActiveHash('#pilgrimage')} className={`font-label-bold text-label-bold transition-colors duration-200 ${pathname === '/' && activeHash === '#pilgrimage' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}>{t('pilgrimage')}</Link>
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
          <button 
            aria-label="Menu" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 w-10 h-10 text-on-surface-variant flex items-center justify-center transition-colors hover:text-primary"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between items-center">
              <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
              <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
    
    {/* Mobile Menu Overlay (Premium Glass Cards) */}
    <div 
      className={`md:hidden fixed inset-0 top-[80px] bg-white/30 dark:bg-gray-900/40 backdrop-blur-sm z-40 flex flex-col pt-10 transition-opacity duration-500 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className={`flex flex-col gap-4 w-full px-6 transition-all duration-500 ease-out ${
        isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <Link 
          href="/blog" 
          onClick={() => { setIsMobileMenuOpen(false); setActiveHash(''); }} 
          className={`flex items-center justify-between w-full p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-2xl rounded-sm border border-white/60 dark:border-gray-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] ${pathname?.startsWith('/blog') ? 'border-primary/50 bg-primary/10 text-primary' : 'text-slate-900 dark:text-white'}`}
        >
          <div className="flex items-center gap-4">
            <span className={`material-symbols-outlined ${pathname?.startsWith('/blog') ? 'text-primary' : 'text-slate-700'}`}>auto_stories</span>
            <span className="text-xl font-semibold tracking-wide drop-shadow-sm">{t('stories')}</span>
          </div>
          <span className="material-symbols-outlined text-sm opacity-50">arrow_forward_ios</span>
        </Link>

        <Link 
          href="/#pilgrimage" 
          onClick={() => { setIsMobileMenuOpen(false); setActiveHash('#pilgrimage'); }} 
          className={`flex items-center justify-between w-full p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-2xl rounded-sm border border-white/60 dark:border-gray-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] ${pathname === '/' && activeHash === '#pilgrimage' ? 'border-primary/50 bg-primary/10 text-primary' : 'text-slate-900 dark:text-white'}`}
        >
          <div className="flex items-center gap-4">
            <span className={`material-symbols-outlined ${pathname === '/' && activeHash === '#pilgrimage' ? 'text-primary' : 'text-slate-700'}`}>explore</span>
            <span className="text-xl font-semibold tracking-wide drop-shadow-sm">{t('pilgrimage')}</span>
          </div>
          <span className="material-symbols-outlined text-sm opacity-50">arrow_forward_ios</span>
        </Link>
      </div>
    </div>
    </>
  );
}
