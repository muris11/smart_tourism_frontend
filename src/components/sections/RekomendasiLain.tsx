import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'

interface RekomendasiItem {
  id: string
  slug: string
  name: string
  region: string
  category: string
  rating: number
  images: { src: string; alt: string }[]
}

interface Props {
  items: RekomendasiItem[]
  basePath: string
  label: string
}

export default function RekomendasiLain({ items, basePath, label }: Props) {
  if (items.length === 0) return null

  return (
    <section className="border-t border-citra-border pt-12">
      <h2 className="mb-2 font-display text-2xl font-bold text-citra-ink">
        Rekomendasi {label} Lainnya
      </h2>
      <p className="mb-6 text-sm text-citra-muted">
        Tempat lain yang mungkin kamu suka di wilayah yang sama
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            href={`/${basePath}/${item.slug}`}
            className="group block overflow-hidden rounded-lg bg-citra-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="relative h-36 w-full overflow-hidden bg-citra-surface-soft">
              <Image
                src={item.images[0]?.src || '/images/fallback/fallback-1.jpg'}
                alt={item.images[0]?.alt || item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            <div className="p-3">
              <h3 className="line-clamp-1 text-sm font-semibold text-citra-ink group-hover:text-citra-primary transition-colors">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-citra-muted">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="line-clamp-1">{item.region}</span>
              </div>
              {item.rating > 0 && (
                <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-citra-rating">
                  <Star className="h-3 w-3 fill-current" />
                  {item.rating.toFixed(1)}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
