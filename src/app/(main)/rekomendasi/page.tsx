'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { MapPin, Compass, Star, Loader2 } from 'lucide-react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { recommendationApi } from '@/lib/api/recommendation'
import { RekoItem } from '@/types/recommendation'

const schema = z.object({
  mode: z.enum(['nearby', 'personal', 'popular']),
  wilayah: z.array(z.string()).optional(),
  tipe: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  limit: z.number().min(1).max(50),
})

type FormData = z.infer<typeof schema>

const WILAYAH_OPTIONS = ['Cirebon', 'Indramayu', 'Majalengka', 'Kuningan']
const TIPE_OPTIONS = [
  { value: '', label: 'Semua' },
  { value: 'wisata', label: 'Wisata' },
  { value: 'kuliner', label: 'Kuliner' },
  { value: 'nongkrong', label: 'Nongkrong' },
]

function tipeBadgeColor(tipe: string) {
  switch (tipe) {
    case 'wisata': return 'bg-emerald-100 text-emerald-700'
    case 'kuliner': return 'bg-amber-100 text-amber-700'
    case 'nongkrong': return 'bg-violet-100 text-violet-700'
    default: return 'bg-slate-100 text-slate-700'
  }
}

function tipeLink(tipe: string, kode: string) {
  switch (tipe) {
    case 'wisata': return `/wisata/${kode}`
    case 'kuliner': return `/kuliner/${kode}`
    case 'nongkrong': return `/nongkrong/${kode}`
    default: return '#'
  }
}

export default function RekomendasiPage() {
  const [results, setResults] = useState<RekoItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const geo = useGeolocation()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      mode: 'popular',
      wilayah: [],
      tipe: '',
      limit: 6,
    },
  })

  const currentMode = ('mode')

  const handleGetLocation = () => {
    geo.request()
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setHasSearched(true)

    const payload = {
      mode: data.mode,
      wilayah: data.wilayah && data.wilayah.length > 0 ? data.wilayah : undefined,
      tipe: data.tipe || undefined,
      latitude: data.mode === 'nearby' ? (geo.lat ?? data.latitude) : undefined,
      longitude: data.mode === 'nearby' ? (geo.lon ?? data.longitude) : undefined,
      limit: data.limit,
    }

    try {
      const result = await recommendationApi.get(payload)
      setResults(result)
    } catch {
      setSubmitError('Layanan AI sedang tidak tersedia. Silakan coba lagi.')
      setResults([])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-slate-900">Rekomendasi</h1>
          <p className="text-base text-slate-600">Dapatkan rekomendasi tempat wisata, kuliner, dan nongkrong yang dipersonalisasi oleh AI.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-widest text-slate-500">Mode Rekomendasi</label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${currentMode === 'nearby' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" value="nearby" {...register('mode')} className="sr-only" />
                <MapPin className={`h-5 w-5 ${currentMode === 'nearby' ? 'text-blue-600' : 'text-slate-400'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Terdekat</p>
                  <p className="text-xs text-slate-500">Berdasarkan lokasi</p>
                </div>
              </label>
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${currentMode === 'personal' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" value="personal" {...register('mode')} className="sr-only" />
                <Compass className={`h-5 w-5 ${currentMode === 'personal' ? 'text-blue-600' : 'text-slate-400'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Preferensi</p>
                  <p className="text-xs text-slate-500">Sesuai pilihan</p>
                </div>
              </label>
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-all ${currentMode === 'popular' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" value="popular" {...register('mode')} className="sr-only" />
                <Star className={`h-5 w-5 ${currentMode === 'popular' ? 'text-blue-600' : 'text-slate-400'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Populer</p>
                  <p className="text-xs text-slate-500">Rating tertinggi</p>
                </div>
              </label>
            </div>
          </div>

          {currentMode === 'nearby' && (
            <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Lokasi Anda</p>
                  {geo.lat && geo.lon ? (
                    <p className="text-xs text-blue-600">{geo.lat.toFixed(4)}, {geo.lon.toFixed(4)}</p>
                  ) : (
                    <p className="text-xs text-blue-600">Belum terdeteksi</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={geo.isLoading}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {geo.isLoading ? 'Mendeteksi...' : 'Gunakan Lokasi'}
                </button>
              </div>
              {geo.error && <p className="mt-2 text-xs text-red-600">{geo.error}</p>}
              {errors.latitude && <p className="mt-2 text-xs text-red-600">{errors.latitude.message}</p>}
            </div>
          )}

          {(currentMode === 'personal' || currentMode === 'popular') && (
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-500">Wilayah</label>
                <div className="flex flex-wrap gap-2">
                  {WILAYAH_OPTIONS.map((w) => (
                    <label key={w} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={w}
                        {...register('wilayah')}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{w}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-500">Tipe Tempat</label>
                <select
                  {...register('tipe')}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
                  aria-label="Tipe tempat"
                >
                  {TIPE_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-500">Jumlah Rekomendasi</label>
            <input
              type="number"
              {...register('limit', { valueAsNumber: true })}
              min={1}
              max={50}
              className="w-32 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (currentMode === 'nearby' && !geo.lat)}
            className="w-full rounded-full bg-slate-900 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-50 sm:w-auto sm:px-8"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                AI sedang memproses...
              </span>
            ) : (
              'Dapatkan Rekomendasi'
            )}
          </button>
        </form>

        <div className="mt-10">
          {isSubmitting && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          )}

          {submitError && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-600">
              {submitError}
            </div>
          )}

          {!isSubmitting && hasSearched && !submitError && results.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <Compass className="mb-4 h-12 w-12 text-slate-300" />
              <h3 className="mb-2 text-lg font-semibold text-slate-700">Tidak ada rekomendasi</h3>
              <p className="text-sm text-slate-500">Coba ubah preferensi atau pilih wilayah lain.</p>
            </div>
          )}

          {!isSubmitting && results.length > 0 && (
            <div>
              <p className="mb-5 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{results.length}</span> rekomendasi ditemukan
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((item) => (
                  <Link
                    key={`${item.tipe}-${item.kode}`}
                    href={tipeLink(item.tipe, item.kode)}
                    className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tipeBadgeColor(item.tipe)}`}>
                        {item.tipe.charAt(0).toUpperCase() + item.tipe.slice(1)}
                      </span>
                      {item.skor_rekomendasi !== undefined && (
                        <span className="text-xs font-medium text-blue-600">{Math.round(item.skor_rekomendasi * 100)}% cocok</span>
                      )}
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                      {item.nama}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {item.wilayah}
                    </p>
                    {item.jarak_km !== undefined && (
                      <p className="mt-1 text-xs text-slate-400">{item.jarak_km.toFixed(1)} km dari lokasi Anda</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
