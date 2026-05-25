'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  ParkingCircle,
  Accessibility,
  Car,
  ExternalLink,
  ArrowLeft,
  Share2,
  Heart,
  Check,
  Calendar,
  DollarSign,
  Award,
} from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { useWisataDetail } from '@/hooks/useWisata'
import { useRecommendation } from '@/hooks/useRecommendation'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils/cn'

/** Halaman detail destinasi wisata */
export default function WisataDetailPage() {
  const params = useParams()
  const kode = params.kode as string
  const { wisata, isLoading, error } = useWisataDetail(kode)
  const [isWishlist, setIsWishlist] = useState(false)
  const [isShared, setIsShared] = useState(false)
  const { trackHistory } = useRecommendation()

  useEffect(() => {
    if (wisata) {
      trackHistory('wisata', wisata.kode, 'kunjungi')
    }
  }, [wisata, trackHistory])
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

  if (error || !wisata) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pt-32">
        <div className="container px-4 md:px-8">
          <EmptyState
            title="Wisata tidak ditemukan"
            description="Destinasi wisata yang Anda cari tidak tersedia"
            actionLabel="Kembali ke Wisata"
            onAction={() => (window.location.href = '/wisata')}
          />
        </div>
      </div>
    )
  }

  const rating = typeof wisata.rating_google === 'number'
    ? wisata.rating_google
    : parseFloat(wisata.rating_google || '0')

  const imageUrl = wisata.gambar && wisata.gambar.length > 0
    ? wisata.gambar[0]
    : '/images/fallback/fallback.jpg'

  const isFree = wisata.harga_tiket_min === 0 && wisata.harga_tiket_max === 0

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setIsShared(true)
    setTimeout(() => setIsShared(false), 2000)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pb-16 pt-24">
      <div className="container px-4 md:px-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="group mb-6 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:text-brand-navy"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Kembali
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="group relative overflow-hidden rounded-2xl shadow-xl">
              <div className="relative h-72 w-full md:h-96">
                <Image
                  src={imageUrl}
                  alt={wisata.nama}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/fallback/fallback.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>

              {/* Action Buttons */}
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

              {/* Price Badge */}
              {!isFree && (
                <div className="absolute bottom-4 left-4 rounded-full bg-linear-to-r from-brand-navy to-brand-navy/80 px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-1 text-white">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      Mulai Rp{wisata.harga_tiket_min.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Rating */}
            <div className="mt-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-brand-navy md:text-4xl">
                  {wisata.nama}
                </h1>
                {rating > 0 && (
                  <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 shadow-sm">
                    <Star className="h-5 w-5 fill-current text-amber-500" />
                    <span className="font-semibold text-amber-700">{rating.toFixed(1)}</span>
                    <span className="text-sm text-amber-500">
                      ({wisata.jumlah_ulasan_google.toLocaleString()} ulasan)
                    </span>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="mt-2 flex flex-wrap items-center gap-4 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{wisata.wilayah}</span>
                </div>
                {wisata.kecamatan && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <span>•</span>
                    <span>{wisata.kecamatan}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Category Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {wisata.kategori_utama && (
                <span className="rounded-full bg-linear-to-r from-brand-pale to-brand-pale/50 px-3 py-1.5 text-sm font-medium text-brand-navy">
                  {wisata.kategori_utama}
                </span>
              )}
              {wisata.sub_kategori && (
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">
                  {wisata.sub_kategori}
                </span>
              )}
              {wisata.jenis_tempat && (
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">
                  {wisata.jenis_tempat}
                </span>
              )}
              {isFree && (
                <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
                  Gratis
                </span>
              )}
            </div>

            {/* Description */}
            {wisata.deskripsi && (
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-brand-navy">
                  <Award className="h-5 w-5 text-brand-green" />
                  Tentang Destinasi
                </h2>
                <p className="leading-relaxed text-slate-600">{wisata.deskripsi}</p>
              </div>
            )}

            {/* Facilities */}
            {wisata.fasilitas && wisata.fasilitas.length > 0 && (
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-brand-navy">
                  <ParkingCircle className="h-5 w-5" />
                  Fasilitas yang Tersedia
                </h2>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {wisata.fasilitas.map((facility, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600"
                    >
                      {facility}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              {/* Price Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-brand-navy">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Harga Tiket
                </h3>
                {isFree ? (
                  <p className="text-3xl font-bold text-green-600">Gratis</p>
                ) : (
                  <div>
                    <p className="text-3xl font-bold leading-none text-brand-navy">
                      Rp{wisata.harga_tiket_min.toLocaleString()}
                      {wisata.harga_tiket_max > wisata.harga_tiket_min && (
                        <>
                          {' '}
                          - Rp{wisata.harga_tiket_max.toLocaleString()}
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Opening Hours */}
              {(wisata.jam_buka || wisata.jam_tutup) && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-brand-navy">
                    <Clock className="h-5 w-5" />
                    Jam Operasional
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Buka</span>
                      <span className="font-medium text-slate-700">
                        {wisata.jam_buka?.slice(0, 5) || '00:00'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Tutup</span>
                      <span className="font-medium text-slate-700">
                        {wisata.jam_tutup?.slice(0, 5) || '00:00'}
                      </span>
                    </div>
                    {wisata.hari_libur_operasional && (
                      <div className="mt-3 rounded-lg bg-red-50 p-2 text-center text-sm text-red-600">
                        Tutup: {wisata.hari_libur_operasional}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Accessibility & Transportation */}
              {(wisata.aksesibilitas || wisata.moda_transportasi || wisata.estimasi_durasi_jam) && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-brand-navy">
                    <Calendar className="h-5 w-5" />
                    Informasi Lain
                  </h3>
                  <div className="space-y-3">
                    {wisata.estimasi_durasi_jam && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-400">Estimasi Durasi</p>
                          <p className="text-sm font-medium text-slate-700">
                            {wisata.estimasi_durasi_jam} jam
                          </p>
                        </div>
                      </div>
                    )}
                    {wisata.aksesibilitas && (
                      <div className="flex items-center gap-3">
                        <Accessibility className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-400">Aksesibilitas</p>
                          <p className="text-sm font-medium text-slate-700">
                            {wisata.aksesibilitas}
                          </p>
                        </div>
                      </div>
                    )}
                    {wisata.moda_transportasi && (
                      <div className="flex items-center gap-3">
                        <Car className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-400">Transportasi</p>
                          <p className="text-sm font-medium text-slate-700">
                            {wisata.moda_transportasi}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Contact & Links */}
              {(wisata.link_google_maps ||
                wisata.kontak ||
                wisata.link_instagram ||
                wisata.link_website) && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-brand-navy">
                      <Globe className="h-5 w-5" />
                      Kontak & Link
                    </h3>
                    <div className="space-y-2">
                      {wisata.link_google_maps && (
                        <a
                          href={wisata.link_google_maps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-all hover:bg-red-50 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-red-500" />
                            <span className="text-sm font-medium">Google Maps</span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-400" />
                        </a>
                      )}
                      {wisata.kontak && (
                        <a
                          href={`tel:${wisata.kontak}`}
                          className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-all hover:bg-green-50 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-medium">{wisata.kontak}</span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-400" />
                        </a>
                      )}
                      {wisata.link_instagram && (
                        <a
                          href={wisata.link_instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-all hover:bg-pink-50 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <FaInstagram />
                            <span className="text-sm font-medium">Instagram</span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-400" />
                        </a>
                      )}
                      {wisata.link_website && (
                        <a
                          href={wisata.link_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-all hover:bg-blue-50 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium">Website</span>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-400" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}