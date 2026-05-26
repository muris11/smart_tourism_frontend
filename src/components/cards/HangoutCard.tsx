'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Badge } from '@/components/ui/Badge'

interface Hangout {
  id: string | number
  slug: string
  name: string
  region: string
  category: string
  image: string
  rating: number
  tags?: string[]
}

interface HangoutCardProps {
  hangout: Hangout
  className?: string
}

const FALLBACK_IMAGE = '/images/fallback/fallback-3.jpg'

export default function HangoutCard({ hangout, className }: HangoutCardProps) {
  const { slug, name, region, category, image, rating, tags } = hangout

  return (
    <Link
      href={`/nongkrong/${slug}`}
      className={cn(
        'group block rounded-lg bg-citra-surface shadow-card transition-all duration-300 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2',
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = FALLBACK_IMAGE
          }}
        />

        <div className="absolute left-3 top-3">
          <Badge variant="editor">{category}</Badge>
        </div>
      </div>

      <div className="p-4">
        <span className="text-xs font-medium text-citra-muted">{region}</span>

        <h3 className="mt-1 font-display text-lg font-semibold text-citra-ink line-clamp-1 group-hover:text-citra-primary transition-colors">
          {name}
        </h3>

        {rating > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-citra-rating text-citra-rating" />
            <span className="text-sm font-semibold text-citra-ink">{rating.toFixed(1)}</span>
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-citra-surface-soft px-2.5 py-0.5 text-[11px] font-medium text-citra-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
