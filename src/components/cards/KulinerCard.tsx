// src/components/cards/KulinerCard.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Utensils, Coffee, Pizza, ShoppingBag, Heart } from 'lucide-react'
import { useRecommendation } from '@/hooks/useRecommendation'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCallback, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import type { KulinerItem } from '@/types'

const FALLBACK_IMAGE = '/images/fallback/fallback-2.webp'

interface KulinerCardProps {
  item: KulinerItem
  className?: string
}

export default function KulinerCard({ item, className }: KulinerCardProps) {
  const { trackHistory } = useRecommendation()
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const startTimeRef = useRef<number>(0)
  const isSaved = isInWishlist(item.kode)

  const rating = typeof item.rating_google === 'number'
    ? item.rating_google
    : parseFloat(item.rating_google || '0')

  const imageUrl = item.gambar && item.gambar.length > 0
    ? item.gambar[0]
    : FALLBACK_IMAGE

  const getJenisIcon = (jenis: string) => {
    const lowerJenis = jenis?.toLowerCase() || ''
    if (lowerJenis.includes('cafe')) return <Coffee className="h-3.5 w-3.5" />
    if (lowerJenis.includes('restoran')) return <Utensils className="h-3.5 w-3.5" />
    if (lowerJenis.includes('oleh')) return <ShoppingBag className="h-3.5 w-3.5" />
    return <Pizza className="h-3.5 w-3.5" />
  }

  const handleMouseEnter = () => {
    startTimeRef.current = Date.now()
  }

  const handleClick = useCallback(async () => {
    const durasi = Math.floor((Date.now() - startTimeRef.current) / 1000)
    await trackHistory('kuliner', item.kode, 'klik', undefined, durasi)
  }, [item.kode, trackHistory])

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isSaved) {
      await removeItem(item.kode, 'kuliner')
    } else {
      await addItem(item.kode, 'kuliner')
    }
  }

  return (
    <Link
      href={`/kuliner/${item.kode}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className || ''}`}
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={item.nama}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = FALLBACK_IMAGE
          }}
        />

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy backdrop-blur-sm">
          {getJenisIcon(item.jenis_tempat || '')}
          <span>{item.jenis_tempat || 'Kuliner'}</span>
        </div>

        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 backdrop-blur-sm transition-all hover:scale-110"
          aria-label={isSaved ? 'Hapus dari favorit' : 'Simpan ke favorit'}
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isSaved ? 'fill-red-500 text-red-500' : 'text-slate-600'
            )}
          />
        </button>

        {item.sertifikat_halal && (
          <div className="absolute bottom-3 right-3 rounded-full bg-green-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Halal
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-lg font-semibold text-brand-navy transition-colors group-hover:text-brand-green">
            {item.nama}
          </h3>
          {rating > 0 && (
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-sm font-semibold text-amber-600">
              <Star className="h-3.5 w-3.5 fill-current" />
              {rating.toFixed(1)}
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">{item.wilayah}</span>
        </div>

        <div className="mt-3 text-sm font-semibold text-brand-green">
          Mulai Rp{item.harga_menu_min?.toLocaleString() || 0}
        </div>
      </div>
    </Link>
  )
}