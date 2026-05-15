'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import useSWR from 'swr'
import { Search, MapPin, SlidersHorizontal } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { searchApi, SearchParams, SearchResultItem } from '@/lib/api/search'

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
const TIPE_OPTIONS = ['wisata', 'kuliner', 'nongkrong']

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

function CariContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialQuery = searchParams.get('q') || ''
  const initialTipe = searchParams.get('tipe') || ''
  const initialWilayah = searchParams.get('wilayah') || ''

  const [query, setQuery] = useState(initialQuery)
  const [tipe, setTipe] = useState(initialTipe)
  const [wilayah, setWilayah] = useState(initialWilayah)

  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedQuery) params.set('q', debouncedQuery)
    if (tipe) params.set('tipe', tipe)
    if (wilayah) params.set('wilayah', wilayah)
    const paramString = params.toString()
    router.replace(`/cari${paramString ? `?${paramString}` : ''}`, { scroll: false })
  }, [debouncedQuery, tipe, wilayah, router])

  const swrParams: SearchParams | null = debouncedQuery
    ? { q: debouncedQuery, tipe: tipe || undefined, wilayah: wilayah || undefined, limit: 20 }
    : null

  const { data, isLoading, error } = useSWR(
    swrParams ? ['/search', swrParams] : null,
    ([, params]) => searchApi.search(params),
    { revalidateOnFocus: false }
  )

  const results: SearchResultItem[] = data?.data ?? []
  const totalResults = data?.meta?.total ?? results.length

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative">
          <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari destinasi, kuliner, atau tempat nongkrong..."
            className="w-full rounded-full border-2 border-slate-100 bg-slate-50 py-4 pl-14 pr-6 text-base font-medium text-slate-800 shadow-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
            autoFocus
            aria-label="Cari"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
              aria-label="Filter tipe"
            >
              <option value="">Semua Tipe</option>
              {TIPE_OPTIONS.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            <select
              value={wilayah}
              onChange={(e) => setWilayah(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
              aria-label="Filter wilayah"
            >
              <option value="">Semua Wilayah</option>
              {WILAYAH_OPTIONS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10">
          {!debouncedQuery && !isLoading && (
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Pencarian Populer</h4>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-blue-400 hover:text-blue-600"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-600">
              Terjadi kesalahan saat mencari. Silakan coba lagi.
            </div>
          )}

          {debouncedQuery && !isLoading && !error && results.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <Search className="mb-4 h-12 w-12 text-slate-300" />
              <h3 className="mb-2 text-lg font-semibold text-slate-700">Tidak ditemukan hasil</h3>
              <p className="text-sm text-slate-500">Tidak ada hasil untuk &ldquo;{debouncedQuery}&rdquo;. Coba kata kunci lain.</p>
            </div>
          )}

          {debouncedQuery && !isLoading && !error && results.length > 0 && (
            <div>
              <p className="mb-5 text-sm text-slate-500">
                Ditemukan <span className="font-semibold text-slate-700">{totalResults}</span> hasil untuk &ldquo;{debouncedQuery}&rdquo;
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((item) => (
                  <Link
                    key={`${item.tipe}-${item.kode}`}
                    href={tipeLink(item.tipe, item.kode)}
                    className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tipeBadgeColor(item.tipe)}`}>
                        {item.tipe.charAt(0).toUpperCase() + item.tipe.slice(1)}
                      </span>
                      {item.rating_google && (
                        <span className="text-xs font-medium text-slate-500">⭐ {item.rating_google}</span>
                      )}
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                      {item.nama}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {item.wilayah}{item.kecamatan ? `, ${item.kecamatan}` : ''}
                    </p>
                    {item.sentimen && (
                      <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.sentimen === 'positif' ? 'bg-green-100 text-green-700' :
                        item.sentimen === 'negatif' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {item.sentimen}
                      </span>
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

export default function CariPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white pt-28 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-14 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    }>
      <CariContent />
    </Suspense>
  )
}
