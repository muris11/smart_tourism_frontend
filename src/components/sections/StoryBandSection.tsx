'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { getHomepage, type Stat } from '@/lib/api'

export default function StoryBandSection() {
  const [stats, setStats] = useState<Stat[]>([])
  const [storyImage, setStoryImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHomepage()
      .then((data) => {
        setStats(data.stats)
        if (data.heroSlides.length > 0) {
          setStoryImage(data.heroSlides[0].src)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="relative overflow-hidden bg-citra-forest">
      <div className="container-page">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="relative min-h-[300px] lg:w-1/2 lg:min-h-[500px]">
            <Image
              src={storyImage || '/images/fallback/fallback-1.jpg'}
              alt="Pemandangan Ciayumajakuning"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-r from-citra-forest/60 to-transparent" />
          </div>

          <div className="flex items-center px-6 py-14 md:px-10 md:py-18 lg:w-1/2 lg:px-14 lg:py-24">
            <div className="max-w-lg">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                Tentang CITRA
              </span>

              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                Cerita dari Setiap Sudut
              </h2>

              <p className="mt-4 leading-relaxed text-white/70">
                Dari pesisir Indramayu hingga dinginnya kaki Gunung Ciremai,
                setiap tempat di Ciayumajakuning punya cerita. CITRA hadir
                untuk membantu kamu menemukan dan merencanakan perjalanan
                yang tak terlupakan.
              </p>

              {!loading && stats.length > 0 && (
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <span className="block font-display text-2xl font-bold text-white md:text-3xl">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-white/60">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/wisata"
                className="inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-[.97] min-h-[52px] px-8 text-[0.9375rem] font-semibold leading-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent mt-8"
              >
                Mulai Jelajahi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
