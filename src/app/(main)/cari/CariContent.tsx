'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils/cn'
import DestinationCard from '@/components/cards/DestinationCard'
import CulinaryCard from '@/components/cards/CulinaryCard'
import HangoutCard from '@/components/cards/HangoutCard'
import { getDestinations, getCulinary, getHangouts } from '@/lib/api'
import { regionsApi } from '@/lib/api/regions'
import type { Destination, Culinary, Hangout } from '@/lib/api'

const popularSearches = [
  'Keraton Kasepuhan',
  'Nasi Jamblang',
  'Gunung Ciremai',
  'Pantai Kejawanan',
  'Empal Gentong',
  'Curug Putri',
]
const TIPE_OPTIONS = [
  { value: 'wisata', label: 'Wisata' },
  { value: 'kuliner', label: 'Kuliner' },
  { value: 'nongkrong', label: 'Nongkrong' },
]

interface UnifiedItem {
  id: string
  slug: string
  name: string
  region: string
  category: string
  rating: number
  image: string
  address: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
}

function toItem(d: Destination): UnifiedItem {
  return { id: `wisata-${d.id}`, slug: d.slug, name: d.name, region: d.region, category: d.category, rating: d.rating, image: d.images[0]?.src || '', address: d.address, tipe: 'wisata' }
}
function toCulinaryItem(c: Culinary): UnifiedItem {
  return { id: `kuliner-${c.id}`, slug: c.slug, name: c.name, region: c.region, category: c.category, rating: c.rating, image: c.images[0]?.src || '', address: c.address, tipe: 'kuliner' }
}
function toHangoutItem(h: Hangout): UnifiedItem {
  return { id: `nongkrong-${h.id}`, slug: h.slug, name: h.name, region: h.region, category: h.category, rating: h.rating, image: h.images[0]?.src || '', address: h.address, tipe: 'nongkrong' }
}

export default function CariContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialQuery = searchParams.get('q') || ''
  const initialTipe = searchParams.get('tipe') || ''
  const initialWilayah = searchParams.get('wilayah') || ''

  const [query, setQuery] = useState(initialQuery)
  const [tipe, setTipe] = useState(initialTipe)
  const [wilayah, setWilayah] = useState(initialWilayah)
  const [showFilters, setShowFilters] = useState(false)
  const [allItems, setAllItems] = useState<UnifiedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [wilayahOptions, setWilayahOptions] = useState<string[]>([])

  const debouncedQuery = useDebounce(query, 400)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [destinations, culinary, hangouts, regions] = await Promise.all([
        getDestinations(),
        getCulinary(),
        getHangouts(),
        regionsApi.list(),
      ])
      const items: UnifiedItem[] = [
        ...destinations.map(toItem),
        ...culinary.map(toCulinaryItem),
        ...hangouts.map(toHangoutItem),
      ]
      setAllItems(items)
      setWilayahOptions(regions.map(r => r.name))
    } catch (error) {
        console.error("Failed fetching data", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const filtered = allItems.filter((item) => {
    const matchQuery = debouncedQuery === '' || item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    const matchTipe = tipe === '' || item.tipe === tipe
    const matchWilayah = wilayah === '' || item.region === wilayah
    return matchQuery && matchTipe && matchWilayah
  })

  const sorted = [...filtered].sort((a, b) => b.rating - a.rating)
  const isLoading = loading

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

  const renderCard = (item: UnifiedItem) => {
    const cardProps = {
      id: item.id,
      slug: item.slug,
      name: item.name,
      region: item.region,
      category: item.category,
      rating: item.rating,
      image: item.image,
      address: item.address,
    }
    switch (item.tipe) {
      case 'wisata':
        return <DestinationCard key={item.id} destination={cardProps} />
      case 'kuliner':
        return <CulinaryCard key={item.id} culinary={cardProps} />
      case 'nongkrong':
        return <HangoutCard key={item.id} hangout={cardProps} />
    }
  }

  return (
    <div className="min-h-screen bg-citra-canvas pt-28 pb-24">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold text-citra-ink md:text-4xl">Pencarian</h1>
            <p className="mt-2 text-citra-muted">Temukan destinasi wisata, kuliner, atau tempat nongkrong favoritmu</p>
          </div>

          <div className="relative">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-citra-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari destinasi, kuliner, atau tempat nongkrong..."
              className="w-full rounded-full border border-citra-border bg-citra-surface py-4 pl-14 pr-14 text-sm text-citra-ink outline-none shadow-search transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 text-citra-muted transition-colors hover:bg-citra-surface-soft"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                hasActiveFilters
                  ? 'bg-citra-primary text-white'
                  : 'border border-citra-border-strong bg-citra-surface text-citra-body hover:bg-citra-surface-soft'
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {hasActiveFilters && (
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                  {[tipe, wilayah].filter(Boolean).length}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button onClick={handleResetFilters} className="text-sm text-citra-primary hover:underline">
                Reset Filter
              </button>
            )}
          </div>

          <div className="mt-4 hidden flex-wrap items-center gap-3 lg:flex">
            <SlidersHorizontal className="h-4 w-4 text-citra-muted" />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTipe('')}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  !tipe ? 'bg-citra-primary text-white' : 'bg-citra-surface text-citra-body hover:bg-citra-surface-soft border border-citra-border'
                )}
              >
                Semua
              </button>
              {TIPE_OPTIONS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTipe(t.value)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    tipe === t.value ? 'bg-citra-primary text-white' : 'bg-citra-surface text-citra-body hover:bg-citra-surface-soft border border-citra-border'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <span className="h-5 w-px bg-citra-border" />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setWilayah('')}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  !wilayah ? 'bg-citra-primary text-white' : 'bg-citra-surface text-citra-body hover:bg-citra-surface-soft border border-citra-border'
                )}
              >
                Semua Wilayah
              </button>
              {wilayahOptions.map((w) => (
                <button
                  key={w}
                  onClick={() => setWilayah(w)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    wilayah === w ? 'bg-citra-primary text-white' : 'bg-citra-surface text-citra-body hover:bg-citra-surface-soft border border-citra-border'
                  )}
                >
                  {w}
                </button>
              ))}
            </div>
            {hasActiveFilters && (
              <button onClick={handleResetFilters} className="text-sm font-medium text-citra-primary hover:underline">
                Reset
              </button>
            )}
          </div>

          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] rounded-t-xl bg-citra-surface p-6 shadow-modal">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-citra-ink">Filter</h3>
                  <button onClick={() => setShowFilters(false)} className="rounded-full p-1 text-citra-muted hover:bg-citra-surface-soft">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-citra-muted">Tipe</label>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setTipe('')} className={cn('rounded-full px-4 py-2 text-sm font-medium', !tipe ? 'bg-citra-primary text-white' : 'bg-citra-surface-soft text-citra-body')}>Semua</button>
                      {TIPE_OPTIONS.map((t) => (
                        <button key={t.value} onClick={() => setTipe(t.value)} className={cn('rounded-full px-4 py-2 text-sm font-medium', tipe === t.value ? 'bg-citra-primary text-white' : 'bg-citra-surface-soft text-citra-body')}>{t.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-citra-muted">Wilayah</label>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setWilayah('')} className={cn('rounded-full px-4 py-2 text-sm font-medium', !wilayah ? 'bg-citra-primary text-white' : 'bg-citra-surface-soft text-citra-body')}>Semua</button>
                      {wilayahOptions.map((w) => (
                        <button key={w} onClick={() => setWilayah(w)} className={cn('rounded-full px-4 py-2 text-sm font-medium', wilayah === w ? 'bg-citra-primary text-white' : 'bg-citra-surface-soft text-citra-body')}>{w}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3 border-t border-citra-border pt-4">
                  <button onClick={handleResetFilters} className="flex-1 rounded-full border border-citra-border-strong py-3 text-sm font-medium text-citra-body">Reset</button>
                  <button onClick={() => setShowFilters(false)} className="flex-1 rounded-full bg-citra-primary py-3 text-sm font-medium text-white">Terapkan</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10">
          {!debouncedQuery && !isLoading && (
            <div className="mx-auto max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-citra-muted">Pencarian Populer</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="rounded-full border border-citra-border bg-citra-surface px-4 py-2 text-sm text-citra-body shadow-hairline transition-all hover:border-citra-primary hover:text-citra-primary"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="overflow-hidden rounded-lg bg-citra-surface shadow-card">
                  <div className="aspect-[4/3] skeleton-shimmer" />
                  <div className="space-y-3 p-4">
                    <div className="h-3 w-1/4 rounded skeleton-shimmer" />
                    <div className="h-5 w-3/4 rounded skeleton-shimmer" />
                    <div className="h-4 w-1/3 rounded skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {debouncedQuery && !isLoading && sorted.length === 0 && (
            <div className="mx-auto max-w-md py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-citra-surface-soft">
                <Search className="h-10 w-10 text-citra-muted" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-citra-ink">Tidak ditemukan</h3>
              <p className="mt-2 text-sm text-citra-muted">
                Tidak ada hasil untuk &ldquo;{debouncedQuery}&rdquo;. Coba kata kunci lain atau filter yang berbeda.
              </p>
            </div>
          )}

          {debouncedQuery && !isLoading && sorted.length > 0 && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-citra-muted">
                  Menampilkan <span className="font-semibold text-citra-primary">{sorted.length}</span> hasil
                </p>
                {hasActiveFilters && (
                  <button onClick={handleResetFilters} className="text-sm font-medium text-citra-primary hover:underline">
                    Hapus Filter
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((item) => renderCard(item))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
