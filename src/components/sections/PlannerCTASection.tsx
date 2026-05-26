import Link from 'next/link'
import { MapPin, Calendar, Heart, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const steps = [
  {
    icon: MapPin,
    title: 'Pilih Destinasi',
    description: 'Temukan tempat yang ingin kamu kunjungi',
  },
  {
    icon: Calendar,
    title: 'Atur Jadwal',
    description: 'Susun rencana perjalanan sesuai keinginanmu',
  },
  {
    icon: Heart,
    title: 'Nikmati Perjalanan',
    description: 'Jelajahi dan buat kenangan tak terlupakan',
  },
]

export default function PlannerCTASection() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <div className="rounded-xl bg-citra-surface p-8 shadow-card md:p-12 lg:p-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
              Belum Punya Rencana? Yuk, Bikin!
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-citra-body">
              Gunakan perencana pintar CITRA untuk membuat itinerary
              perjalanan yang sesuai dengan minat, waktu, dan budgetmu.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-citra-primary-soft">
                    <Icon className="h-6 w-6 text-citra-primary" />
                  </div>
                  <div className="relative">
                    <span className="mx-auto mb-1 block text-xs font-bold text-citra-primary">
                      Langkah {index + 1}
                    </span>
                    <h3 className="font-display text-base font-semibold text-citra-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-citra-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/rencana"
              className="inline-flex items-center justify-center rounded-full bg-citra-primary text-white hover:bg-citra-primary-hover active:bg-citra-primary-active active:scale-[.97] shadow-sm min-h-[52px] px-8 text-[0.9375rem] font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-citra-canvas"
            >
              Buat Rencana Perjalanan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
