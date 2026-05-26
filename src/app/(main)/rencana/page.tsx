'use client'

import { MapPin, Calendar, SmilePlus, Luggage, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export default function RencanaPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const handleMulai = () => {
    if (!isLoggedIn) {
      router.push('/login?callback=/planning')
    } else {
      router.push('/planning')
    }
  }

  return (
    <div className="min-h-screen animate-fade-in pt-28 pb-24">
      <section className="relative overflow-hidden bg-citra-forest py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow-on-dark">CITRA</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Rencana Perjalanan
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
              Atur jadwal perjalanan impianmu jelajahi Ciayumajakuning
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-page">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-citra-surface p-8 text-center shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-citra-primary-soft">
                <MapPin className="h-8 w-8 text-citra-primary" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-citra-ink">Pilih Destinasi</h3>
              <p className="mt-3 text-sm leading-relaxed text-citra-body">Pilih tempat wisata, kuliner, atau nongkrong favoritmu dari berbagai pilihan menarik</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-citra-primary">Langkah 1</p>
            </div>
            <div className="rounded-lg bg-citra-surface p-8 text-center shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-citra-primary-soft">
                <Calendar className="h-8 w-8 text-citra-primary" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-citra-ink">Atur Jadwal</h3>
              <p className="mt-3 text-sm leading-relaxed text-citra-body">Susun jadwal perjalananmu dengan mudah, atur waktu dan urutan kunjungan</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-citra-primary">Langkah 2</p>
            </div>
            <div className="rounded-lg bg-citra-surface p-8 text-center shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-citra-primary-soft">
                <SmilePlus className="h-8 w-8 text-citra-primary" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-citra-ink">Nikmati</h3>
              <p className="mt-3 text-sm leading-relaxed text-citra-body">Jelajahi Ciayumajakuning dan ciptakan kenangan indah bersama orang tersayang</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-citra-primary">Langkah 3</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" onClick={handleMulai}>
              Mulai Buat Rencana
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-citra-surface-soft">
        <div className="container-page">
          <h2 className="mb-8 font-display text-2xl font-bold text-citra-ink">Rencana Tersimpan</h2>
          <div className="flex flex-col items-center rounded-lg bg-citra-surface px-6 py-20 text-center shadow-card">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-citra-primary-soft">
              <Luggage className="h-10 w-10 text-citra-primary" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-citra-ink">Belum ada rencana</h3>
            <p className="mt-2 text-sm text-citra-body">Yuk, buat rencanamu sekarang dan mulai petualanganmu!</p>
            <Button className="mt-6" size="sm" onClick={handleMulai}>
              Buat Rencana Baru
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
