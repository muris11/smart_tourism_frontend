'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { getRegions, type Region } from '@/lib/api'

export default function RegionGridSection() {
  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRegions()
      .then(setRegions)
      .finally(() => setLoading(false))
  }, [])

  if (loading && regions.length === 0) {
    return (
      <section className="section-spacing">
        <div className="container-page">
          <div className="mb-10 md:mb-14 lg:mb-16">
            <span className="eyebrow mb-3 block">Wilayah</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
              Jelajahi Berdasarkan Wilayah
            </h2>
            <p className="mt-3 max-w-lg text-citra-body">
              Empat kabupaten/kota, tak terbatas cerita
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg bg-citra-surface shadow-card">
                <div className="aspect-4/5 skeleton-shimmer" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (regions.length === 0) {
    return null
  }

  return (
    <section className="section-spacing">
      <div className="container-page">
        <div className="mb-10 md:mb-14 lg:mb-16">
          <span className="eyebrow mb-3 block">Wilayah</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
            Jelajahi Berdasarkan Wilayah
          </h2>
          <p className="mt-3 max-w-lg text-citra-body">
            Empat kabupaten/kota, tak terbatas cerita
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((region) => (
            <Link
              key={region.id}
              href={`/wisata?region=${region.slug}`}
              className="group relative overflow-hidden rounded-lg bg-citra-surface shadow-card transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={region.image.src}
                  alt={region.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-citra-ink backdrop-blur-sm">
                  {region.destinationCount}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {region.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/75">
                    {region.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-xs font-medium text-citra-primary">Lihat destinasi</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-citra-primary-soft text-citra-primary transition-all duration-300 group-hover:bg-citra-primary group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
