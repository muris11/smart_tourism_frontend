import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function HeroSection() {
  return (
    <section className="border-b border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <div className="container px-4 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[var(--color-brand)] uppercase">Smart Tourism</p>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-6xl">Jelajahi Ciayumajakuning lebih cerdas.</h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">Template frontend untuk wisata, kuliner, nongkrong, rekomendasi, planning, dan chatbot.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={ROUTES.WISATA} className="btn-primary">Lihat Wisata</Link>
            <Link href={ROUTES.PLANNING} className="rounded-xl border border-gray-200 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-white">Buat Itinerary</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
