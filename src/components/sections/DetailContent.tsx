import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Ticket, Lightbulb } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import type { DetailItem } from '@/types/detail'

interface DetailContentProps {
  item: DetailItem
}

export default function DetailContent({ item }: DetailContentProps) {
  const descriptionParagraphs = item.description ? item.description.split('\n').filter(Boolean) : []
  const hasGallery = item.images.length > 1

  return (
    <article className="space-y-10">
      <div className="flex items-center gap-2 text-xs font-medium text-citra-muted">
        <Link href="/" className="hover:text-citra-primary transition-colors">Beranda</Link>
        <span className="text-citra-muted-soft">/</span>
        <span className="text-citra-body">{item.region}</span>
        <span className="text-citra-muted-soft">/</span>
        <span className="text-citra-primary">{item.category}</span>
      </div>

      <div>
        <h1 className="font-display text-3xl font-bold text-citra-ink md:text-4xl">
          {item.name}
        </h1>
      </div>

      <div className="flex flex-wrap items-start gap-4 text-sm">
        {item.address && (
          <div className="flex items-start gap-2 text-citra-body">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-citra-primary" />
            <span>{item.address}</span>
          </div>
        )}
        {item.hours && (
          <div className="flex items-start gap-2 text-citra-body">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-citra-primary" />
            <span>{item.hours}</span>
          </div>
        )}
        {item.priceRange && (
          <div className="flex items-start gap-2 text-citra-body">
            <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-citra-primary" />
            <span>{item.priceRange}</span>
          </div>
        )}
      </div>

      {descriptionParagraphs.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-citra-ink">Tentang</h2>
          <div className="space-y-4 font-body text-base leading-relaxed text-citra-body">
            {descriptionParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {item.ambience && (
        <div>
          <h2 className="mb-3 font-display text-xl font-bold text-citra-ink">Suasana</h2>
          <p className="font-body text-base leading-relaxed text-citra-body">{item.ambience}</p>
        </div>
      )}

      {item.tips && item.tips.length > 0 && (
        <div className="rounded-lg bg-citra-surface-green p-6">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-citra-primary" />
            <h2 className="font-display text-xl font-bold text-citra-ink">Tips</h2>
          </div>
          <ul className="space-y-3">
            {item.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-citra-body">
                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-citra-primary" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasGallery && (
        <div>
          <h2 className="mb-4 font-display text-xl font-bold text-citra-ink">Galeri</h2>
          <div className="grid grid-cols-2 gap-3">
            {item.images.slice(1).map((img, i) => (
              <div
                key={i}
                className={cn(
                  'relative overflow-hidden rounded-lg bg-citra-surface-soft',
                  i === 0 ? 'row-span-2' : ''
                )}
                style={{ aspectRatio: i === 0 ? '3/4' : '16/9' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-citra-border bg-citra-surface-soft p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-citra-primary-soft">
            <MapPin className="h-5 w-5 text-citra-primary" />
          </div>
          <div>
            <h3 className="mb-1 font-display text-base font-bold text-citra-ink">Lokasi</h3>
            <p className="mb-3 text-sm text-citra-body">{item.address}</p>
            <Link
              href={`https://www.google.com/maps/search/${encodeURIComponent(item.address || item.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-citra-primary transition-colors hover:text-citra-primary-hover"
            >
              <MapPin className="h-4 w-4" />
              Lihat di Google Maps
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
