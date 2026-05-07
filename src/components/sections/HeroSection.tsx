import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function HeroSection() {
  return (
    <section className="relative px-4 pt-24 pb-12 md:px-6 sm:pt-28">
      <div className="relative mx-auto h-[85vh] min-h-[650px] w-full max-w-[1400px] overflow-hidden rounded-[2rem] bg-brand-navy md:rounded-[3rem]">
        <img src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=2000" alt="Pemandangan alam Ciayumajakuning" className="img-reveal absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-16 md:px-16 md:pb-24 lg:px-24">
          <div className="max-w-3xl">
            <span className="glass-panel-dark mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 animate-slide-up">
              Panduan perjalanan eksklusif
            </span>
            <h1 className="mb-8 text-5xl leading-[1.05] tracking-tight text-white animate-slide-up-delay-1 md:text-7xl lg:text-[6rem]">
              Merawat ingatan,
              <br />
              <span className="italic text-white/80">merangkai perjalanan.</span>
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed font-light text-white/70 animate-slide-up-delay-2 md:text-xl">
              CITRA membantu menemukan wisata, rasa lokal, dan ruang berkumpul yang dikurasi untuk pengalaman yang lebih tenang, cerdas, dan bermakna.
            </p>
            <div className="flex flex-wrap items-center gap-4 animate-slide-up-delay-2">
              <Link href={ROUTES.WISATA} className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-brand-navy shadow-lg transition-all duration-300 hover:scale-105 hover:bg-brand-pale hover:shadow-xl">Mulai Penjelajahan</Link>
              <Link href={ROUTES.PLANNING} className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-white/10">Rencanakan Itinerary</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
