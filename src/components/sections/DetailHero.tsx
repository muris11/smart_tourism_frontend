'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Star } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'

interface DetailHeroProps {
  images: { src: string; alt: string }[]
  title: string
  region: string
  category: string
  rating: number
}

export default function DetailHero({ images, title, region, category, rating }: DetailHeroProps) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const safeImages = images.length > 0 ? images : [{ src: '/images/fallback/fallback-1.jpg', alt: title }]
  const mainImage = safeImages[activeIndex] || safeImages[0]
  const hasMultiple = safeImages.length > 1

  return (
    <section className="relative bg-citra-forest">
      <div className="relative h-[50vh] min-h-[400px] md:h-[65vh]">
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <button
          onClick={() => router.back()}
          className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-citra-ink backdrop-blur-sm transition-all hover:bg-white active:scale-95"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="overlay">{region}</Badge>
              <Badge variant="overlay">{category}</Badge>
              {rating > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-citra-rating backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-current" />
                  {rating.toFixed(1)}
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {hasMultiple && (
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-6 pb-6 md:px-10">
          {safeImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                index === activeIndex
                  ? 'border-citra-sand opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-90'
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
