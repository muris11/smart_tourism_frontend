'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

interface Region {
  id: string | number
  name: string
  slug: string
  description: string
  image: string
  destinationCount: number
}

interface RegionCardProps {
  region: Region
  className?: string
}

const FALLBACK_IMAGE = '/images/fallback/fallback-1.jpg'

export default function RegionCard({ region, className }: RegionCardProps) {
  const { name, slug, description, image, destinationCount } = region

  return (
    <Link
      href={`/wisata?region=${slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2',
        className
      )}
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = FALLBACK_IMAGE
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-citra-forest/80 via-citra-forest/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-2xl font-bold text-white">{name}</h3>

          <p className="mt-1 text-sm text-white/80 line-clamp-2">{description}</p>

          <span className="mt-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {destinationCount} Destinasi
          </span>
        </div>
      </div>
    </Link>
  )
}
