'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { getHomepage, type HiddenGem } from '@/lib/api'

export default function InspirationGallerySection() {
  const [gems, setGems] = useState<HiddenGem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHomepage()
      .then((data) => setGems(data.hiddenGems))
      .finally(() => setLoading(false))
  }, [])

  if (loading && gems.length === 0) {
    return (
      <section className="section-spacing bg-citra-surface">
        <div className="container-page">
          <div className="mb-10 md:mb-14 lg:mb-16">
            <span className="eyebrow mb-3 block">Hidden Gems</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
              Inspirasi Tersembunyi
            </h2>
            <p className="mt-3 max-w-lg text-citra-body">
              Sudut-sudut rahasia yang menunggu untuk ditemukan
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square skeleton-shimmer rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (gems.length === 0) return null

  return (
    <section className="section-spacing bg-citra-surface">
      <div className="container-page">
        <div className="mb-10 md:mb-14 lg:mb-16">
          <span className="eyebrow mb-3 block">Hidden Gems</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
            Inspirasi Tersembunyi
          </h2>
          <p className="mt-3 max-w-lg text-citra-body">
            Sudut-sudut rahasia yang menunggu untuk ditemukan
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
          {gems.map((gem, index) => (
            <Link
              key={gem.id}
              href={`/wisata?region=${gem.region.toLowerCase()}`}
              className={cn(
                'group relative overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-card-hover',
                index === 2 ? 'col-span-2 row-span-2' : '',
                index === 4 ? 'col-span-2' : '',
                index === 5 ? 'col-span-2 md:col-span-1' : ''
              )}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={gem.src}
                  alt={gem.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-4">
                  <h3 className="text-sm font-semibold text-white">{gem.label}</h3>
                  <span className="mt-0.5 block text-xs text-white/70">{gem.region}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
