// src/app/(main)/cari/page.tsx

'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { useWisata } from '@/hooks/useWisata'
import { useKuliner } from '@/hooks/useKuliner'
import { useNongkrong } from '@/hooks/useNongkrong'
import { cn } from '@/lib/utils/cn'
import type { WisataItem, KulinerItem, NongkrongItem } from '@/types'

const popularSearches = [
  'Keraton Kasepuhan',
  'Nasi Jamblang',
  'Gunung Ciremai',
  'Pantai Kejawanan',
  'Situ Sedong',
  'Taman Sari Gua Sunyaragi',
  'Empal Gentong',
  'Curug Putri',
]

const WILAYAH_OPTIONS = ['Cirebon', 'Indramayu', 'Majalengka', 'Kuningan']
const TIPE_OPTIONS = [
  { value: 'wisata', label: 'Wisata', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'kuliner', label: 'Kuliner', color: 'bg-amber-100 text-amber-700' },
  { value: 'nongkrong', label: 'Nongkrong', color: 'bg-violet-100 text-violet-700' },
]

interface SearchResult {
  kode: string
  nama: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  wilayah: string
  kecamatan: string | null
  alamat: string | null
  gambar: string | null
  rating: number | null
  sentimen: string | null
  harga_min: number
}

function tipeLink(tipe: string, kode: string): string {
  switch (tipe) {
    case 'wisata': return `/wisata/${kode}`
    case 'kuliner': return `/kuliner/${kode}`
    case 'nongkrong': return `/nongkrong/${kode}`
    default: return '#'
  }
}

function getSentimenBadge(sentimen: string | null): { label: string; className: string } | null {
  if (sentimen === 'positif') return { label: 'Positif', className: 'bg-green-100 text-green-700' }
  if (sentimen === 'negatif') return { label: 'Negatif', className: 'bg-red-100 text-red-700' }
  if (sentimen === 'netral') return { label: 'Netral', className: 'bg-gray-100 text-gray-600' }
  return null
}

function CariContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialQuery = searchParams.get('q') || ''
  const initialTipe = searchParams.get('tipe') || ''
  const initialWilayah = searchParams.get('wilayah') || ''

  const [query, setQuery] = useState(initialQuery)
  const [tipe, setTipe] = useState(initialTipe)
  const [wilayah, setWilayah] = useState(initialWilayah)
  const [showFilters, setShowFilters] = useState(false)

  const debouncedQuery = useDebounce(query, 400)

  // Ambil semua data wisata, kuliner, nongkrong
  const { data: wisataData, isLoading: wisataLoading } = useWisata({ per_page: 50 })
  const { data: kulinerData, isLoading: kulinerLoading } = useKuliner({ per_page: 50 })
  const { data: nongkrongData, isLoading: nongkrongLoading } = useNongkrong({ per_page: 50 })

  const isLoading = wisataLoading || kulinerLoading || nongkrongLoading

  // Gabungkan dan filter hasil pencarian
  const results: SearchResult[] = []

  // Tambah wisata
  if (wisataData) {
    wisataData.forEach((item: WisataItem) => {
      results.push({
        kode: item.kode,
        nama: item.nama,
        tipe: 'wisata',
        wilayah: item.wilayah,
        kecamatan: item.kecamatan,
        alamat: item.alamat_lengkap,
        gambar: item.gambar?.[0] || null,
        rating: typeof item.rating_google === 'number' ? item.rating_google : parseFloat(item.rating_google || '0'),
        sentimen: item.sentimen,
        harga_min: item.harga_tiket_min,
      })
    })
  }

  // Tambah kuliner
  if (kulinerData) {
    kulinerData.forEach((item: KulinerItem) => {
      results.push({
        kode: item.kode,
        nama: item.nama,
        tipe: 'kuliner',
        wilayah: item.wilayah,
        kecamatan: item.kecamatan,
        alamat: item.alamat_lengkap,
        gambar: item.gambar?.[0] || null,
        rating: typeof item.rating_google === 'number' ? item.rating_google : parseFloat(item.rating_google || '0'),
        sentimen: item.sentimen,
        harga_min: item.harga_menu_min,
      })
    })
  }

  // Tambah nongkrong
  if (nongkrongData) {
    nongkrongData.forEach((item: NongkrongItem) => {
      results.push({
        kode: item.kode,
        nama: item.nama,
        tipe: 'nongkrong',
        wilayah: item.wilayah,
        kecamatan: item.kecamatan,
        alamat: item.alamat_lengkap,
        gambar: item.gambar?.[0] || null,
        rating: typeof item.rating_google === 'number' ? item.rating_google : parseFloat(item.rating_google || '0'),
        sentimen: item.sentimen,
        harga_min: item.harga_menu_min,
      })
    })
  }

  // Filter berdasarkan query, tipe, wilayah
  const filteredResults = results.filter((item) => {
    const matchQuery = debouncedQuery === '' || item.nama.toLowerCase().includes(debouncedQuery.toLowerCase())
    const matchTipe = tipe === '' || item.tipe === tipe
    const matchWilayah = wilayah === '' || item.wilayah === wilayah
    return matchQuery && matchTipe && matchWilayah
  })

  // Sort by rating (highest first) and relevance
  const sortedResults = [...filteredResults].sort((a, b) => (b.rating || 0) - (a.rating || 0))

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedQuery) params.set('q', debouncedQuery)
    if (tipe) params.set('tipe', tipe)
    if (wilayah) params.set('wilayah', wilayah)
    const paramString = params.toString()
    router.replace(`/cari${paramString ? `?${paramString}` : ''}`, { scroll: false })
  }, [debouncedQuery, tipe, wilayah, router])

  const handleQuickSearch = (term: string) => {
    setQuery(term)
    setTipe('')
    setWilayah('')
  }

  const handleResetFilters = () => {
    setTipe('')
    setWilayah('')
    setShowFilters(false)
  }

  const hasActiveFilters = tipe !== '' || wilayah !== ''

  const getTipeBadgeColor = (tipeValue: string) => {
    switch (tipeValue) {
      case 'wisata': return 'bg-emerald-100 text-emerald-700'
      case 'kuliner': return 'bg-amber-100 text-amber-700'
      case 'nongkrong': return 'bg-violet-100 text-violet-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-brand-navy md:text-4xl">
            Pencarian
          </h1>
          <p className="mt-2 text-slate-500 max-w-2xl mx-auto">
            Temukan destinasi wisata, kuliner, atau tempat nongkrong favoritmu
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari destinasi, kuliner, atau tempat nongkrong..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-24 text-base outline-none transition-all focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="mt-4 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {hasActiveFilters && (
                <span className="ml-1 rounded-full bg-brand-green px-1.5 py-0.5 text-xs">
                  {[tipe, wilayah].filter(Boolean).length}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-sm text-slate-500 hover:text-brand-navy transition-colors"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Filter Section Desktop */}
          <div className="mt-4 hidden flex-wrap items-center gap-3 lg:flex">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTipe('')}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm transition-all',
                  !tipe ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                Semua Tipe
              </button>
              {TIPE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTipe(t.value)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-all',
                    tipe === t.value ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setWilayah('')}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm transition-all',
                  !wilayah ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                Semua Wilayah
              </button>
              {WILAYAH_OPTIONS.map((w) => (
                <button
                  key={w}
                  onClick={() => setWilayah(w)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-all',
                    wilayah === w ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  )}
                >
                  {w}
                </button>
              ))}
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-sm text-brand-navy hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Filter Drawer Mobile */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] rounded-t-3xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-brand-navy">Filter</h3>
                  <button onClick={() => setShowFilters(false)} className="rounded-full p-1 hover:bg-slate-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Tipe</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setTipe('')}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-sm',
                          !tipe ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        Semua
                      </button>
                      {TIPE_OPTIONS.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => setTipe(t.value)}
                          className={cn(
                            'rounded-full px-3 py-1.5 text-sm',
                            tipe === t.value ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600'
                          )}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Wilayah</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setWilayah('')}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-sm',
                          !wilayah ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        Semua
                      </button>
                      {WILAYAH_OPTIONS.map((w) => (
                        <button
                          key={w}
                          onClick={() => setWilayah(w)}
                          className={cn(
                            'rounded-full px-3 py-1.5 text-sm',
                            wilayah === w ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600'
                          )}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3 pt-4 border-t">
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 rounded-full border border-slate-300 py-2 text-sm font-medium text-slate-600"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 rounded-full bg-brand-navy py-2 text-sm font-medium text-white"
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="mt-10 max-w-3xl mx-auto">
          {/* Popular Searches */}
          {!debouncedQuery && !isLoading && (
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Pencarian Populer
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="rounded-full bg-white border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-all hover:border-brand-navy hover:text-brand-navy hover:shadow-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-white border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-lg bg-slate-200" />
                    <div className="flex-1">
                      <div className="h-4 w-1/3 rounded bg-slate-200 mb-2" />
                      <div className="h-3 w-1/2 rounded bg-slate-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {debouncedQuery && !isLoading && sortedResults.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-700">
                Tidak ditemukan hasil
              </h3>
              <p className="text-sm text-slate-500">
                Tidak ada hasil untuk &rdquo;{debouncedQuery}&rdquo;. Coba kata kunci lain.
              </p>
            </div>
          )}

          {/* Results */}
          {debouncedQuery && !isLoading && sortedResults.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Menampilkan <span className="font-semibold text-brand-navy">{sortedResults.length}</span> hasil
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-brand-navy hover:underline"
                  >
                    Hapus Filter
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {sortedResults.map((item) => {
                  const sentimenBadge = getSentimenBadge(item.sentimen)
                  return (
                    <Link
                      key={`${item.tipe}-${item.kode}`}
                      href={tipeLink(item.tipe, item.kode)}
                      className="group block rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-navy hover:shadow-md"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTipeBadgeColor(item.tipe)}`}>
                            {item.tipe.charAt(0).toUpperCase() + item.tipe.slice(1)}
                          </span>
                          {item.rating && item.rating > 0 && (
                            <span className="flex items-center gap-1 text-sm text-amber-600">
                              <span className="text-amber-500">⭐</span>
                              {item.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-brand-navy transition-colors group-hover:text-brand-green">
                          {item.nama}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <MapPin className="h-4 w-4" />
                          <span>{item.wilayah}</span>
                          {item.kecamatan && (
                            <span className="text-slate-400">• {item.kecamatan}</span>
                          )}
                        </div>
                        {sentimenBadge && (
                          <span className={`inline-block w-fit rounded-full px-2 py-0.5 text-xs font-medium ${sentimenBadge.className}`}>
                            {sentimenBadge.label}
                          </span>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CariPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    }>
      <CariContent />
    </Suspense>
  )
}