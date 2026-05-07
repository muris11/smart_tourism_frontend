import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-pale selection:bg-brand-navy selection:text-white">
      <div className="flex min-h-screen">
        <div className="relative hidden w-[45%] overflow-hidden bg-brand-navy lg:flex">
          <img
            src="https://images.unsplash.com/photo-1542385311-6b453531bfa2?auto=format&fit=crop&q=80&w=1200"
            alt="Wonderful Indonesia"
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 via-brand-navy/60 to-transparent"></div>

          <div className="relative z-10 flex w-full flex-col justify-between p-16">
            <Link href="/" className="group flex w-fit items-center gap-4 text-white transition-colors hover:text-brand-green">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md transition-transform group-hover:scale-105">
                <span className="text-lg">←</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg italic leading-none">Kembali ke Beranda</span>
              </div>
            </Link>

            <div className="mb-12 max-w-[30rem]">
              <span className="mb-6 inline-block rounded-full bg-brand-green px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                Portal Anggota
              </span>
              <h1 className="mb-6 text-5xl leading-[1.08] text-white">Melangkah Lebih Jauh Bersama Kami</h1>
              <p className="max-w-md text-lg leading-relaxed font-light text-white/70">
                Simpan destinasi favorit Anda, susun itinerary yang terarah, dan jadilah bagian dari komunitas pelestari cerita lokal Nusantara.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" className="h-10 w-10 rounded-full border-2 border-brand-navy object-cover" alt="User" />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" className="h-10 w-10 rounded-full border-2 border-brand-navy object-cover" alt="User" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" className="h-10 w-10 rounded-full border-2 border-brand-navy object-cover" alt="User" />
              </div>
              <span className="text-sm font-medium text-white/60">Bergabung dengan 10.000+ pejalan kaki lainnya.</span>
            </div>
          </div>
        </div>

        <div className="relative flex w-full items-center justify-center overflow-y-auto rounded-l-none bg-white p-6 shadow-[-20px_0_40px_rgba(0,0,0,0.02)] sm:p-12 md:p-20 lg:w-[55%] lg:rounded-l-[3rem] xl:p-24">
            <div className="absolute top-8 left-8 flex items-center gap-3 lg:hidden">
            <Link href="/">
              <span className="text-2xl tracking-[0.14em] text-brand-navy">CITRA</span>
            </Link>
          </div>
          <div className="relative z-10 w-full max-w-[440px] animate-fade-in pt-16 lg:pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
