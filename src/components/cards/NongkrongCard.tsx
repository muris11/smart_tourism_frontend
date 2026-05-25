// src/components/cards/NongkrongCard.tsx

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Coffee, Wifi, Zap, Heart } from 'lucide-react'
import { useRecommendation } from '@/hooks/useRecommendation'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCallback, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import type { NongkrongItem } from '@/types'

const FALLBACK_IMAGE = '/images/fallback/fallback-3.jpg'

interface NongkrongCardProps {
  data: NongkrongItem
  className?: string
}

export default function NongkrongCard({ data, className }: NongkrongCardProps) {
  const { trackHistory } = useRecommendation()
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const startTimeRef = useRef<number>(0)
  const isSaved = isInWishlist(data.kode)

  const rating = typeof data.rating_google === 'number'
    ? data.rating_google
    : parseFloat(data.rating_google || '0')

  const imageUrl = data.gambar && data.gambar.length > 0
    ? data.gambar[0]
    : FALLBACK_IMAGE

  const getKonsepIcon = () => {
    const konsep = data.konsep_suasana?.toLowerCase() || ''
    if (konsep.includes('cafe')) return <Coffee className="h-3.5 w-3.5" />
    if (konsep.includes('rooftop')) return <Zap className="h-3.5 w-3.5" />
    return <Coffee className="h-3.5 w-3.5" />
  }

  const handleMouseEnter = () => {
    startTimeRef.current = Date.now()
  }

  const handleClick = useCallback(async () => {
    const durasi = Math.floor((Date.now() - startTimeRef.current) / 1000)
    await trackHistory('nongkrong', data.kode, 'klik', undefined, durasi)
  }, [data.kode, trackHistory])

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isSaved) {
      await removeItem(data.kode, 'nongkrong')
    } else {
      await addItem(data.kode, 'nongkrong')
    }
  }

  return (
    <Link
      href={`/nongkrong/${data.kode}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className || ''}`}
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={data.nama}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = FALLBACK_IMAGE
          }}
        />

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy backdrop-blur-sm">
          {getKonsepIcon()}
          <span>{data.konsep_suasana || 'Nongkrong'}</span>
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

        <div className="absolute bottom-3 right-3 flex gap-1">
          {data.fasilitas?.some(f => f.toLowerCase().includes('wifi')) && (
            <div className="rounded-full bg-white/90 px-1.5 py-1 text-brand-navy backdrop-blur-sm">
              <Wifi className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-lg font-semibold text-brand-navy transition-colors group-hover:text-brand-green">
            {data.nama}
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
          <span className="line-clamp-1">{data.wilayah}</span>
        </div>

        {data.jam_buka && data.jam_tutup && (
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <span>{data.jam_buka.slice(0, 5)} - {data.jam_tutup.slice(0, 5)}</span>
          </div>
        )}

        <div className="mt-3 text-sm font-semibold text-brand-green">
          Mulai Rp{data.harga_menu_min?.toLocaleString() || 0}
        </div>
      </div>
    </Link>
  )
}