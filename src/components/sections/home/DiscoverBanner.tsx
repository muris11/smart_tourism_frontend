'use client'

export default function DiscoverBanner() {
  return (
    <section className="relative overflow-hidden bg-[#1a1f2e] py-20 md:py-24 lg:py-28">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(15,118,110,0.15)_0%,_transparent_60%)]" />
      <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0f766e]/10 blur-3xl md:h-96 md:w-96 lg:h-[500px] lg:w-[500px]" />

      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center lg:max-w-5xl">

          <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.07] px-5 py-1.5 text-xs font-medium tracking-[0.18em] text-white/70 uppercase backdrop-blur-md md:mb-6 md:px-6 md:py-2 md:text-sm">
            Travel Experience
          </span>

          <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl font-display tracking-tight drop-shadow-sm">
            Perjalanan Bukan
            <br />
            Sekadar Tujuan
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed font-light text-white/60 md:text-lg lg:mb-14 lg:max-w-3xl lg:text-xl">
            Setiap perjalanan menyimpan cerita, pengalaman,
            dan kenangan yang tidak terlupakan.
            CITRA membantu Anda menemukan sisi terbaik
            dari Ciayumajakuning dengan cara yang lebih personal
            dan autentik.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-8 border-t border-white/[0.07] pt-10 md:mt-16 md:grid-cols-3 md:gap-12 md:pt-12 lg:mt-20">

            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white md:text-4xl font-display">
                150+
              </h3>
              <p className="text-sm font-light text-white/50 md:text-base">
                Destinasi wisata pilihan
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white md:text-4xl font-display">
                10K+
              </h3>
              <p className="text-sm font-light text-white/50 md:text-base">
                Wisatawan telah menjelajah
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white md:text-4xl font-display">
                4 Wilayah
              </h3>
              <p className="text-sm font-light text-white/50 md:text-base">
                Terhubung dalam satu platform
              </p>
            </div>
          </div>

          <div className="mt-14">
            <a
              href="/tentang"
              className="btn-outline inline-flex items-center gap-2 border-white/15 text-white/80 hover:bg-white/10 hover:text-white"
            >
              Cerita Selengkapnya
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
