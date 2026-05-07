import Link from 'next/link'

export default function HomeClosingCta() {
  return (
    <section className="mx-auto mb-12 max-w-[1400px] px-4 py-24 md:px-6">
      <div className="relative flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-brand-navy px-8 py-20 text-center md:rounded-[3rem] md:py-28">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1512100256350-13f5188812c3?auto=format&fit=crop&q=80&w=2000"
            className="h-full w-full object-cover"
            alt="Background Texture"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent"></div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="mb-6 text-4xl leading-tight text-white md:text-5xl">
            Siap untuk perjalanan selanjutnya?
          </h2>
          <p className="mb-10 text-lg leading-8 font-light text-white/72">
            Buat akun gratis hari ini. Simpan inspirasi, rancang jadwal harian, dan temukan sisi lain Indonesia yang belum pernah Anda lihat sebelumnya.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register" className="inline-flex w-full items-center justify-center rounded-full bg-brand-green px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition-colors hover:bg-green-700 sm:w-auto">
              Daftar Sekarang
            </Link>
            <Link href="/tentang" className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/10 sm:w-auto">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
