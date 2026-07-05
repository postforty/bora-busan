import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5Y9xlB6GaAz6x3Mst-K3YRj3mBdGFqy54jY5j-Mq7OdFYyTjOYfkY4YwtxKnAcOCIlmw_1xtaCv1D6FVTY4bEonds_rf5v4KPS3ww8TlC29lCKPPrqplyPiwHZXTgG6tnRhZKyI1rbSuaUKSzWDoOBr641Ooa5q7ULkyNBrGEvKqsYcxRiyWpFEBRL3mtZiKuT93_DH3tAqOSlXb77d1RTk8FKMVwEUTkdjl4YC-aPkGmEY3aEAjSv6KfknQcAQqKfdNps6s50co')"}}></div>
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop text-center text-white">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 drop-shadow-lg">
          Explore the <span className="text-secondary-container">Purple</span> City
        </h1>
        <p className="font-body-lg text-body-lg max-w-2xl mx-auto mb-10 opacity-90">
          Your ultimate guide to the magic of Busan, curated for the global fandom community. Experience the locations your idols love.
        </p>
        <Link href="/blog" className="inline-flex items-center px-10 py-4 primary-gradient rounded-full font-label-bold text-label-bold uppercase tracking-widest text-white pearl-blue-glow transition-all hover:scale-105 active:scale-95 shadow-lg">
          Start Exploring
        </Link>
      </div>
      <Link href="#pilgrimage" aria-label="Scroll down" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/60 hover:text-white transition-colors cursor-pointer">
        <span className="material-symbols-outlined text-4xl">expand_more</span>
      </Link>
    </section>
  );
}
