import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function HeroSection() {
  const t = await getTranslations('Hero');

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <Image 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Y9xlB6GaAz6x3Mst-K3YRj3mBdGFqy54jY5j-Mq7OdFYyTjOYfkY4YwtxKnAcOCIlmw_1xtaCv1D6FVTY4bEonds_rf5v4KPS3ww8TlC29lCKPPrqplyPiwHZXTgG6tnRhZKyI1rbSuaUKSzWDoOBr641Ooa5q7ULkyNBrGEvKqsYcxRiyWpFEBRL3mtZiKuT93_DH3tAqOSlXb77d1RTk8FKMVwEUTkdjl4YC-aPkGmEY3aEAjSv6KfknQcAQqKfdNps6s50co" 
        alt="Bora Busan Hero" 
        fill 
        sizes="100vw"
        className="object-cover" 
        priority
      />
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop text-center text-white">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 drop-shadow-lg">
          {t.rich('title', {
            purple: (chunks) => <span className="text-primary [text-shadow:0_0_20px_rgba(223,183,255,0.9),0_0_45px_rgba(223,183,255,0.7),0_0_80px_rgba(223,183,255,0.5)]">{chunks}</span>
          })}
        </h1>
        <p className="font-body-lg text-body-lg max-w-2xl mx-auto mb-10 opacity-90">
          {t('description')}
        </p>
        <Link href="/blog" className="inline-flex items-center px-10 py-4 primary-gradient rounded-full font-label-bold text-label-bold uppercase tracking-widest text-white pearl-blue-glow transition-all hover:scale-105 active:scale-95 shadow-lg">
          {t('cta')}
        </Link>
      </div>
      <Link href="/#pilgrimage" aria-label="Scroll down" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/60 hover:text-white transition-colors cursor-pointer">
        <span className="material-symbols-outlined text-4xl">expand_more</span>
      </Link>
    </section>
  );
}
