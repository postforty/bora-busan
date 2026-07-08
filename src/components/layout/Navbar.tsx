"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchModal from "@/components/search/SearchModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <nav className={`fixed top-0 w-full z-50 glass-nav transition-all duration-300 ${isScrolled ? 'shadow-md !bg-white/90' : 'shadow-[0px_10px_30px_rgba(30,41,59,0.04)]'}`}>
      <div className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop h-20 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0 transition-transform active:scale-95 font-display-lg text-display-lg-mobile md:text-display-lg font-extrabold text-primary dark:text-inverse-primary tracking-tighter">
          Bora Busan
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/blog" className={`font-label-bold text-label-bold transition-colors duration-200 ${pathname?.startsWith('/blog') ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}>Stories & Guides</Link>
          <Link href="/#pilgrimage" className="font-label-bold text-label-bold text-on-surface-variant hover:text-primary transition-colors duration-200">Pilgrimage</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button aria-label="Language" className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">language</span>
          </button>
          <button 
            aria-label="Search" 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <button aria-label="Menu" className="md:hidden p-2 text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}
