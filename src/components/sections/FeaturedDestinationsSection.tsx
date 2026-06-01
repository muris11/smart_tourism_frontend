'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui/Badge'
import { getDestinations, type Destination } from '@/lib/api'

export default function FeaturedDestinationsSection() {
  const [featured, setFeatured] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDestinations()
      .then((data) => setFeatured(data.filter((d) => d.featured).slice(0, 16)))
      .finally(() => setLoading(false))
  }, [])

  if (loading && featured.length === 0) {
    return (
      <section className="section-spacing bg-citra-surface">
        <div className="container-page">
          <div className="mb-10 md:mb-14 lg:mb-16">
            <span className="eyebrow mb-3 block">Destinasi</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
              Destinasi Pilihan
            </h2>
            <p className="mt-3 max-w-lg text-citra-body">
              Rekomendasi terbaik untuk perjalananmu
            </p>
          </div>
          <div className="hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg bg-citra-surface shadow-card">
                <div className="aspect-[3/4] skeleton-shimmer rounded-t-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (featured.length === 0) return null

  return (
    <section className="section-spacing bg-citra-surface">
      <div className="container-page">
        <div className="mb-10 md:mb-14 lg:mb-16">
          <span className="eyebrow mb-3 block">Destinasi</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl">
            Destinasi Pilihan
          </h2>
          <p className="mt-3 max-w-lg text-citra-body">
            Rekomendasi terbaik untuk perjalananmu
          </p>
        </div>

        <div className="hidden grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:grid">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={`/wisata/${item.slug}`}
              className="group rounded-lg bg-citra-surface shadow-card transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                <Image
                  src={item.images[0].src}
                  alt={item.images[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute left-3 top-3">
                  <Badge variant={item.category === 'Alam' || item.category === 'Pantai' ? 'nature' : 'default'}>
                    {item.category}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-display font-semibold text-citra-ink transition-colors group-hover:text-citra-primary">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-citra-muted">{item.region}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-citra-rating text-citra-rating" />
                    <span className="text-xs font-semibold text-citra-rating">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none md:hidden">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={`/wisata/${item.slug}`}
              className="w-[260px] shrink-0 snap-start rounded-lg bg-citra-surface shadow-card transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                <Image
                  src={item.images[0].src}
                  alt={item.images[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="260px"
                />
                <div className="absolute left-3 top-3">
                  <Badge variant="overlay">{item.category}</Badge>
                </div>
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-display text-sm font-semibold text-citra-ink">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-citra-muted">{item.region}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-citra-rating text-citra-rating" />
                    <span className="text-xs font-semibold text-citra-rating">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
