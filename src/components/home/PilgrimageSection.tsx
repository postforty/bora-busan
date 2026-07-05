export default function PilgrimageSection() {
  return (
    <section className="py-section-gap bg-surface" id="pilgrimage">
      <div className="max-w-[1280px] mx-auto px-container-margin-mobile md:px-container-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="font-label-bold text-label-bold text-primary uppercase tracking-widest block mb-2">Fan Favorites</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">The Pilgrimage Route</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant md:text-right max-w-sm">
            Curated spots across Busan where moments became memories for fans worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl h-[400px] card-shadow">
              <img alt="Citizens Park" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcIQiH6xLvrAWjh5q1cEUKhoJ6uGefVIG-ToCnx1Eeg8dejfyUEimCWUuaVa8ZpFaRmpXXIG6Ey-OAWT-Ngsf3vMkDkvwTGBfO8TnKMFn5IJ3xWwptluw84TjAGLmRrrpdfg3eO0BaDCGJBBe1KpJSSUrStUhtszFvepCo6qrGQ9-d_yuPQhSQl0WhubYN770smjlt4yhHaLk0ccn6FLkOHUOPEQ8fzTvTf9nacM9_dZUx9uMKh1Bh5E1GMLrBYVRvykE2f4--t0w" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1 bg-primary text-white font-label-bold text-label-bold rounded-full">Photo Spot</span>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-white mb-2">Citizens Park</h3>
                  <p className="font-body-md text-body-md text-white/80 max-w-md">Walk the path of your favorites in this lush, modern sanctuary.</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/20 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl h-[400px] card-shadow">
              <img alt="Gamcheon Vibes Cafe" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOnEMJyaI6XQ4vguDP-fi3eG9ZFPw8Ms79OzFJUuX5a9HmcSsu_pYtI-jJXB_H7dFpMyCRqDYQkYjTbj4xZxlPb_oBwkOexXKiuqLg06i9kNfdYk4FkICNO5lotwq4F3G6_r6Z17-B88yPyjiEDqxWryEwRAIyCM7pb1p5iGxeH5UUnHfzk1Hws5tBMgWh96kd6216yfEQWsewDbDw-ZRp5ID53bm8VGufeyBlHCU_7IVTEypBAf5xyYhD7vghKMZRT9uyrd4WOGw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1 bg-secondary text-white font-label-bold text-label-bold rounded-full">Cafe</span>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="font-headline-sm text-headline-sm text-white mb-2">Gamcheon Vibes</h3>
                <p className="font-body-md text-body-md text-white/80">Sip coffee with a panoramic view of the colorful hillside village.</p>
                <div className="mt-4 inline-flex items-center text-secondary-fixed font-label-bold text-label-bold">
                  View Details <span className="material-symbols-outlined ml-2 text-sm">open_in_new</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-12 group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl h-[300px] md:h-[350px] card-shadow">
              <img alt="Dadaepo Sunset" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAro4nfEWlRR4BIBgm6ecC6dvlt9cEZXcJQeRiaM5CVFWmQJB18MXkjGJj6-Rk6-Ae63ZlvWpOQxRhVNIaJ2qntTD374rLPccvGAvWaTIwVQx3Vw9GjPf-WMoEwlwqRfL8utX1VxoiigHR7jT9wiKxPJu9dyOtlsrmHYX3OUexNZIiIyBrtTxM98oHUkc7aDUiSExJ29XZMCpEDCsQLu4Zo0xmkV3b8bYUdFkaliQTFVcVcGksUytOtOd56hPobelnJhdBdrS97afQ" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1 bg-tertiary text-white font-label-bold text-label-bold rounded-full">Nature</span>
              </div>
              <div className="absolute inset-0 flex items-center p-12">
                <div className="max-w-lg">
                  <h3 className="font-headline-md text-headline-md text-white mb-4">Dadaepo Sunset</h3>
                  <p className="font-body-lg text-body-lg text-white/90 mb-6">Experience the dreamy golden hour where the city meets the sea, immortalized in many fan-favorite travel vlogs.</p>
                  <button className="flex items-center space-x-3 bg-white text-primary px-6 py-2 rounded-full font-label-bold text-label-bold hover:bg-primary-fixed transition-colors">
                    <span>Discover the Magic</span>
                    <span className="material-symbols-outlined">play_circle</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
