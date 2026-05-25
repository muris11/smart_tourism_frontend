'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  ParkingCircle,
  Wifi,
  Coffee,
  ExternalLink,
  ArrowLeft,
  Share2,
  Heart,
  Check,
  DollarSign,
  Award,
  Utensils,
  Users,
  Zap,
} from 'lucide-react'
import { useNongkrongDetail } from '@/hooks/useNongkrong'
import { useRecommendation } from '@/hooks/useRecommendation'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils/cn'

const FALLBACK_IMAGE = '/images/fallback/fallback.jpg'

export default function NongkrongDetailPage() {
  const params = useParams()
  const kode = params.kode as string
  const { nongkrong, isLoading, error } = useNongkrongDetail(kode)
  const [isWishlist, setIsWishlist] = useState(false)
  const [isShared, setIsShared] = useState(false)
  const { trackHistory } = useRecommendation()

  useEffect(() => {
    if (nongkrong) {
      trackHistory('nongkrong', nongkrong.kode, 'kunjungi')
    }
  }, [nongkrong, trackHistory])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pt-32">
        <div className="container px-4 md:px-8">
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !nongkrong) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pt-32">
        <div className="container px-4 md:px-8">
          <EmptyState
            title="Tempat tidak ditemukan"
            description="Tempat nongkrong yang Anda cari tidak tersedia"
            actionLabel="Kembali ke Nongkrong"
            onAction={() => (window.location.href = '/nongkrong')}
          />
        </div>
      </div>
    )
  }

  const rating = typeof nongkrong.rating_google === 'number'
    ? nongkrong.rating_google
    : parseFloat(nongkrong.rating_google || '0')

  const imageUrl = nongkrong.gambar && nongkrong.gambar.length > 0
    ? nongkrong.gambar[0]
    : FALLBACK_IMAGE

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setIsShared(true)
    setTimeout(() => setIsShared(false), 2000)
  }

  const hasWifi = nongkrong.fasilitas?.some(f => f.toLowerCase().includes('wifi'))

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pb-16 pt-24">
      <div className="container px-4 md:px-8">
        <button
          onClick={() => window.history.back()}
          className="group mb-6 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:text-brand-navy"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl">
              <div className="relative h-72 w-full md:h-96">
                <Image
                  src={imageUrl}
                  alt={nongkrong.nama}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = FALLBACK_IMAGE
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>

              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className="rounded-full bg-white/90 p-2.5 text-slate-600 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                >
                  <Heart
                    className={cn('h-5 w-5 transition-colors', isWishlist && 'fill-red-500 text-red-500')}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="rounded-full bg-white/90 p-2.5 text-slate-600 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
                >
                  {isShared ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Share2 className="h-5 w-5" />
                  )}
                </button>
              </div>

              {hasWifi && (
                <div className="absolute bottom-4 left-4 rounded-full bg-linear-to-r from-indigo-600 to-indigo-500 px-4 py-2 shadow-lg">
                  <span className="flex items-center gap-1 text-sm font-semibold text-white">
                    <Wifi className="h-4 w-4" />
                    Free WiFi
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-brand-navy md:text-4xl">
                  {nongkrong.nama}
                </h1>
                {rating > 0 && (
                  <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 shadow-sm">
                    <Star className="h-5 w-5 fill-current text-amber-500" />
                    <span className="font-semibold text-amber-700">{rating.toFixed(1)}</span>
                    <span className="text-sm text-amber-500">
                      ({nongkrong.jumlah_ulasan_google?.toLocaleString() || 0} ulasan)
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{nongkrong.wilayah}</span>
                </div>
                {nongkrong.kecamatan && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <span>•</span>
                    <span>{nongkrong.kecamatan}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {nongkrong.konsep_suasana && (
                <span className="rounded-full bg-linear-to-r from-brand-pale to-brand-pale/50 px-3 py-1.5 text-sm font-medium text-brand-navy">
                  {nongkrong.konsep_suasana}
                </span>
              )}
              {nongkrong.target_pengunjung && (
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">
                  <Users className="inline h-3.5 w-3.5 mr-1" />
                  {nongkrong.target_pengunjung}
                </span>
              )}
            </div>

            {nongkrong.alamat_lengkap && (
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-brand-navy">
                  <Award className="h-5 w-5 text-brand-green" />
                  Alamat
                </h2>
                <p className="leading-relaxed text-slate-600">{nongkrong.alamat_lengkap}</p>
              </div>
            )}

            {nongkrong.menu_best_seller && (
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-brand-navy">
                  <Utensils className="h-5 w-5 text-brand-green" />
                  Menu Best Seller
                </h2>
                <p className="leading-relaxed text-slate-600">{nongkrong.menu_best_seller}</p>
              </div>
            )}

            {nongkrong.fasilitas && nongkrong.fasilitas.length > 0 && (
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-brand-navy">
                  <ParkingCircle className="h-5 w-5" />
                  Fasilitas
                </h2>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {nongkrong.fasilitas.map((facility, idx) => {
                    let icon = null
                    if (facility.toLowerCase().includes('parkir')) icon = <ParkingCircle className="h-4 w-4" />
                    else if (facility.toLowerCase().includes('wifi')) icon = <Wifi className="h-4 w-4" />
                    else if (facility.toLowerCase().includes('cafe')) icon = <Coffee className="h-4 w-4" />
                    else if (facility.toLowerCase().includes('rooftop')) icon = <Zap className="h-4 w-4" />
                    return (
                      <div key={idx} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                        {icon && <span className="text-slate-400">{icon}</span>}
                        <span>{facility}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-brand-navy">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Harga Menu
                </h3>
                <div>
                  <p className="text-3xl font-bold text-brand-navy">
                    Rp{nongkrong.harga_menu_min?.toLocaleString() || 0}
                  </p>
                  {nongkrong.harga_menu_max > nongkrong.harga_menu_min && (
                    <p className="mt-1 text-sm text-slate-500">
                      - Rp{nongkrong.harga_menu_max?.toLocaleString() || 0}
                    </p>
                  )}
                </div>
              </div>

              {(nongkrong.jam_buka || nongkrong.jam_tutup) && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-brand-navy">
                    <Clock className="h-5 w-5" />
                    Jam Operasional
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Buka</span>
                      <span className="font-medium text-slate-700">
                        {nongkrong.jam_buka?.slice(0, 5) || '00:00'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Tutup</span>
                      <span className="font-medium text-slate-700">
                        {nongkrong.jam_tutup?.slice(0, 5) || '00:00'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-brand-navy">
                  <Globe className="h-5 w-5" />
                  Kontak & Link
                </h3>
                <div className="space-y-2">
                  {nongkrong.link_google_maps && (
                    <a
                      href={nongkrong.link_google_maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-all hover:bg-red-50"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium">Google Maps</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </a>
                  )}
                  {nongkrong.kontak && (
                    <a
                      href={`tel:${nongkrong.kontak}`}
                      className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-all hover:bg-green-50"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">{nongkrong.kontak}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}