/**
 * DiscoverBanner - Komponen banner untuk menginspirasi perjalanan
 * 
 * Fitur:
 * - Background dengan efek glow menggunakan blur
 * - Teks putih dengan transparansi untuk estetika
 * - Label dengan efek glassmorphism (backdrop-blur)
 * - Statistik perjalanan (destinasi, wisatawan, wilayah)
 * - Responsive typography dari mobile ke desktop
 * 
 * @component
 * @returns {JSX.Element} Komponen discover banner
 * 
 * @example
 * // Penggunaan di halaman beranda
 * <DiscoverBanner />
 * 
 * @example
 * // Penggunaan setelah testimonial
 * <>
 *   <HomeTestimonials />
 *   <DiscoverBanner />
 * </>
 */
'use client'

/**
 * Komponen DiscoverBanner untuk menampilkan inspirasi perjalanan
 * 
 * @returns {JSX.Element} Discover banner dengan statistik
 */
export default function DiscoverBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 md:py-24 lg:py-28">

      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl md:h-96 md:w-96 lg:h-125 lg:w-125" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">

          {/* Label Badge - Glassmorphism Effect */}
          <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-white/70 uppercase backdrop-blur-md md:mb-5 md:px-5 md:py-2 md:text-sm lg:mb-6">
            Travel Experience
          </span>

          {/* Main Heading */}
          <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            Perjalanan Bukan
            <br />
            Sekadar Tujuan
          </h2>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed font-light text-white/70 md:text-lg lg:mb-12 lg:max-w-3xl lg:text-xl">
            Setiap perjalanan menyimpan cerita, pengalaman,
            dan kenangan yang tidak terlupakan.
            CITRA membantu Anda menemukan sisi terbaik
            dari Ciayumajakuning dengan cara yang lebih personal
            dan autentik.
          </p>

          {/* Statistics Section */}
          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 md:mt-16 md:grid-cols-3 md:gap-10 md:pt-12 lg:mt-20 lg:gap-10">

            {/* Stat 1: Destinasi */}
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-white md:text-4xl">
                150+
              </h3>
              <p className="text-sm font-light text-white/60 md:text-base">
                Destinasi wisata pilihan
              </p>
            </div>

            {/* Stat 2: Wisatawan */}
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-white md:text-4xl">
                10K+
              </h3>
              <p className="text-sm font-light text-white/60 md:text-base">
                Wisatawan telah menjelajah
              </p>
            </div>

            {/* Stat 3: Wilayah */}
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-white md:text-4xl">
                4 Wilayah
              </h3>
              <p className="text-sm font-light text-white/60 md:text-base">
                Terhubung dalam satu platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}