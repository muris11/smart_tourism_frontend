'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, ArrowUpDown, SlidersHorizontal, X, Coffee } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Chip } from '@/components/ui/Chip'
import { Skeleton } from '@/components/ui/Skeleton'
import Pagination from '@/components/ui/Pagination'
import { cn } from '@/lib/utils/cn'
import { getHangouts, type Hangout } from '@/lib/api'
import { regionsApi } from '@/lib/api/regions'

const PAGE_SIZE = 12

// Regions di-load secara dinamis
// const REGIONS = ['Semua', 'Cirebon', 'Indramayu', 'Majalengka', 'Kuningan'] as const

const SORT_OPTIONS = [
  { value: 'popular', label: 'Terpopuler' },
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'newest', label: 'Terbaru' },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]['value']

function HangoutCard({ item }: { item: Hangout }) {
  return (
    <Link
      href={`/nongkrong/${item.slug}`}
      className="group block overflow-hidden rounded-lg bg-citra-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative h-48 w-full overflow-hidden bg-citra-surface-soft">
        <Image
          src={item.images[0]?.src || '/images/fallback/fallback-3.jpg'}
          alt={item.images[0]?.alt || item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-citra-ink backdrop-blur-sm">
            <Coffee className="h-3 w-3" />
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-base font-semibold font-display text-citra-ink group-hover:text-citra-primary transition-colors">
            {item.name}
          </h3>
          {item.rating > 0 && (
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-citra-surface-green px-2 py-0.5 text-xs font-semibold text-citra-rating">
              <Star className="h-3 w-3 fill-current" />
              {item.rating.toFixed(1)}
            </div>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm text-citra-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">{item.region}</span>
        </div>
        <p className="mt-2 line-clamp-1 text-sm text-citra-muted-soft italic">
          {item.ambience}
        </p>
        <p className="mt-1 line-clamp-2 text-sm text-citra-body">
          {item.description}
        </p>
        {item.priceRange && (
          <div className="mt-3 text-sm font-semibold text-citra-primary">
            {item.priceRange}
          </div>
        )}
      </div>
    </Link>
  )
}

function NongkrongPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [hangouts, setHangouts] = useState<Hangout[]>([])
  const [region, setRegion] = useState(searchParams.get('region') || 'Semua')
  const [sort, setSort] = useState<SortValue>('popular')
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [regions, setRegions] = useState<string[]>(['Semua'])

  useEffect(() => {
    Promise.all([getHangouts(), regionsApi.list()])
      .then(([hangData, regionData]) => {
        setHangouts(hangData)
        setRegions(['Semua', ...regionData.map(r => r.name)])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (region !== 'Semua') params.set('region', region)
    const qs = params.toString()
    router.replace(`/nongkrong${qs ? `?${qs}` : ''}`, { scroll: false })
    setPage(1)
  }, [region, router])

  const filtered = useMemo(() => {
    let result = [...hangouts]

    if (region !== 'Semua') {
      result = result.filter((d) => d.region === region)
    }

    switch (sort) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
        break
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return result
  }, [region, sort, hangouts])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginatedItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const activeFilterCount = [region !== 'Semua' ? region : ''].filter(Boolean).length

  return (
    <div className="container-page pt-32 pb-14 lg:pt-40 lg:pb-24">
      <div className="mb-8">
        <span className="eyebrow">Santai</span>
        <h1 className="mt-2 text-3xl font-bold font-display text-citra-ink md:text-4xl">
          Tempat Nongkrong
        </h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {regions.map((r) => (
          <Chip key={r} label={r} active={region === r} onClick={() => setRegion(r)} />
        ))}
        <button
          onClick={() => setShowMobileFilter(true)}
          className="md:hidden relative flex items-center justify-center gap-2 rounded-full bg-citra-primary px-4 py-2 text-sm font-semibold text-citra-on-primary shadow-sm transition-all active:scale-95"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-citra-terracotta text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-citra-muted">
            {!loading && filtered.length > 0 && (
              <span>
                Menampilkan {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}-{Math.min(page * PAGE_SIZE, filtered.length)} data dari <span className="font-semibold text-citra-primary">{filtered.length}</span> tempat
              </span>
            )}
            {!loading && filtered.length === 0 && (
              <span>
                Menampilkan <span className="font-semibold text-citra-primary">0</span> tempat
              </span>
            )}
          </p>
        </div>
        <div className="relative">
          <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-citra-muted" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="appearance-none rounded-full border border-citra-border bg-citra-surface py-2 pl-9 pr-10 text-sm font-medium text-citra-body transition-colors focus:border-citra-primary focus:ring-1 focus:ring-citra-primary"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>


      {loading ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-citra-surface shadow-card">
              <Skeleton variant="card" className="h-48 rounded-none" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-citra-surface-soft p-5">
            <Coffee className="h-10 w-10 text-citra-muted-soft" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-citra-ink">
            Tidak ada tempat ditemukan
          </h3>
          <p className="mb-6 max-w-sm text-sm text-citra-muted">
            Coba ubah filter wilayah untuk menemukan lebih banyak tempat nongkrong.
          </p>
          <button
            onClick={() => setRegion('Semua')}
            className="rounded-full bg-citra-primary px-6 py-2.5 text-sm font-semibold text-citra-on-primary transition-all hover:bg-citra-primary-hover"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {paginatedItems.map((item) => (
              <HangoutCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {showMobileFilter && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 cursor-pointer bg-citra-ink/50" onClick={() => setShowMobileFilter(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-xl bg-citra-surface p-6 shadow-modal">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold font-display text-citra-ink">Filter</h3>
              <button onClick={() => setShowMobileFilter(false)} className="rounded-full p-1 text-citra-muted hover:bg-citra-surface-soft">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-semibold text-citra-ink">Wilayah</p>
                <div className="flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <Chip key={r} label={r} active={region === r} onClick={() => setRegion(r)} />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowMobileFilter(false)}
              className="mt-6 w-full rounded-full bg-citra-primary py-3 text-sm font-semibold text-citra-on-primary transition-all hover:bg-citra-primary-hover"
            >
              Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function NongkrongPage() {
  usePageTitle('Nongkrong')
  return (
    <Suspense fallback={
      <div className="container-page pt-32 pb-14 lg:pt-40 lg:pb-24">
        <div className="skeleton-shimmer mb-8 h-8 w-64 rounded-lg" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-citra-surface shadow-card">
              <Skeleton variant="card" className="h-48 rounded-none" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <NongkrongPageContent />
    </Suspense>
  )
}
