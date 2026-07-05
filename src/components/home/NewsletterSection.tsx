"use client";

export default function NewsletterSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Welcome to the fandom!");
  };

  return (
    <section className="py-section-gap bg-surface-container-low overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <div className="relative bg-inverse-surface rounded-2xl p-12 md:p-20 text-center text-white overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary opacity-20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary opacity-20 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <h2 className="font-headline-md text-headline-md mb-6">Stay Connected to the Magic</h2>
            <p className="font-body-md text-body-md mb-10 opacity-70 max-w-xl mx-auto">Join our community to receive exclusive itineraries, event notifications, and hidden gem alerts for your next Busan adventure.</p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
              <input className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your email" type="email" />
              <button className="px-8 py-4 bg-primary text-white rounded-full font-label-bold text-label-bold hover:scale-105 transition-transform active:scale-95" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
