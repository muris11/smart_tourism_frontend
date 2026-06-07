'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { getFeaturedCulinary, type Culinary } from '@/lib/api'

export default function CulinaryPreviewSection() {
  const [featuredCulinary, setFeaturedCulinary] = useState<Culinary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedCulinary(4)
      .then(setFeaturedCulinary)
      .finally(() => setLoading(false))
  }, [])

  if (loading && featuredCulinary.length === 0) {
    return (
      <section className="section-spacing bg-citra-surface-green">
        <div className="container-page">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="lg:w-2/5">
              <span className="eyebrow mb-3 block">Kuliner Khas</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
                Cicipi Cerita Nusantara
              </h2>
              <p className="mt-4 leading-relaxed text-citra-body skeleton-shimmer h-20 w-full rounded" />
            </div>
            <div className="lg:w-3/5">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`overflow-hidden rounded-lg shadow-card ${i === 1 ? 'row-span-2' : ''}`}>
                    <div className={i === 1 ? 'aspect-[3/4] skeleton-shimmer' : 'aspect-square skeleton-shimmer'} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (featuredCulinary.length === 0) return null

  return (
    <section className="section-spacing bg-citra-surface-green">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:w-2/5">
            <span className="eyebrow mb-3 block">Kuliner Khas</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
              Cicipi Cerita Nusantara
            </h2>
            <p className="mt-4 leading-relaxed text-citra-body">
              Setiap hidangan menyimpan sejarah dan cita rasa khas dari tiap
              daerah. Dari empal gentong Cirebon hingga sate kalong Kuningan
              — siap memanjakan lidahmu.
            </p>
            <Link
              href="/kuliner"
              className="inline-flex items-center justify-center rounded-full bg-citra-primary text-white hover:bg-citra-primary-hover active:bg-citra-primary-active active:scale-[.97] shadow-sm min-h-[52px] px-8 text-[0.9375rem] font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-citra-canvas mt-8"
            >
              Jelajahi Kuliner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="lg:w-3/5">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {featuredCulinary.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/kuliner/${item.slug}`}
                  className={cn(
                    'group relative overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-card-hover',
                    index === 0 ? 'row-span-2' : ''
                  )}
                >
                  <div
                    className={cn(
                      'relative overflow-hidden',
                      index === 0 ? 'aspect-[3/4]' : 'aspect-square'
                    )}
                  >
                    <Image
                      src={item.images[0].src}
                      alt={item.images[0].alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      <h3 className="text-sm font-semibold text-white md:text-base">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/70">{item.region}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
