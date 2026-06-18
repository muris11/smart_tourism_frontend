'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, ArrowUpDown, SlidersHorizontal, X } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Chip } from '@/components/ui/Chip'
import { Skeleton } from '@/components/ui/Skeleton'
import Pagination from '@/components/ui/Pagination'
import { getDestinations, type Destination } from '@/lib/api'
import { regionsApi } from '@/lib/api/regions'

const PAGE_SIZE = 12

const CATEGORIES = ['Semua', 'Alam', 'Budaya', 'Religi'] as const
const SORT_OPTIONS = [
  { value: 'popular', label: 'Terpopuler' },
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'newest', label: 'Terbaru' },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]['value']

// 🔥 FIX: Handle string | null
function capitalizeFirstLetter(str: string | null): string {
  if (!str || str === 'Semua') return 'Semua'
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function DestinationCard({ item }: { item: Destination }) {
  return (
    <Link
      href={`/wisata/${item.slug}`}
      className="group block overflow-hidden rounded-lg bg-citra-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative h-52 w-full overflow-hidden bg-citra-surface-soft">
        <Image
          src={item.images[0]?.src || '/images/fallback/fallback-1.jpg'}
          alt={item.images[0]?.alt || item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-citra-ink backdrop-blur-sm">
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
        <p className="mt-2 line-clamp-2 text-sm text-citra-body">
          {item.address}
        </p>
      </div>
    </Link>
  )
}

function WisataPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [region, setRegion] = useState(
    capitalizeFirstLetter(searchParams.get('region'))
  )
  const [category, setCategory] = useState(searchParams.get('category') || 'Semua')
  const [sort, setSort] = useState<SortValue>('popular')
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [regions, setRegions] = useState<string[]>(['Semua'])

  // Load data
  useEffect(() => {
    Promise.all([getDestinations(), regionsApi.list()])
      .then(([destData, regionData]) => {
        setDestinations(destData)
        setRegions(['Semua', ...regionData.map(r => r.name)])
      })
      .catch(error => {
        console.error('Error loading data:', error)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (region !== 'Semua') params.set('region', region)
    if (category !== 'Semua') params.set('category', category)
    const qs = params.toString()
    router.replace(`/wisata${qs ? `?${qs}` : ''}`, { scroll: false })

    setPage(1)
  }, [region, category, router])

  const filtered = useMemo(() => {
    let result = [...destinations]

    if (region !== 'Semua') {
      result = result.filter((d) =>
        d.region.toLowerCase() === region.toLowerCase()
      )
    }
    if (category !== 'Semua') {
      result = result.filter((d) => d.category === category)
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
  }, [region, category, sort, destinations])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginatedItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const activeFilterCount = [region !== 'Semua' ? region : '', category !== 'Semua' ? category : ''].filter(Boolean).length

  return (
    <div className="container-page section-spacing pt-32 lg:pt-40">
      <div className="mb-8">
        <span className="eyebrow">Jelajahi</span>
        <h1 className="mt-2 text-3xl font-bold font-display text-citra-ink md:text-4xl">
          Wisata Alam & Budaya
        </h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {regions.map((r) => (
          <Chip
            key={r}
            label={r}
            active={region === r}
            onClick={() => setRegion(r)}
          />
        ))}
        <div className="ml-auto hidden md:flex items-center gap-3">
          {CATEGORIES.map((c) => (
            <Chip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
          ))}
        </div>
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
        <p className="text-sm text-citra-muted">
          {!loading && filtered.length > 0 && (
            <span>
              Menampilkan {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}-{Math.min(page * PAGE_SIZE, filtered.length)} data dari <span className="font-semibold text-citra-primary">{filtered.length}</span> destinasi
            </span>
          )}
          {!loading && filtered.length === 0 && (
            <span>
              Menampilkan <span className="font-semibold text-citra-primary">0</span> destinasi
            </span>
          )}
        </p>
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
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-citra-surface shadow-card">
              <Skeleton variant="card" className="h-52 rounded-none" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-citra-surface-soft p-5">
            <MapPin className="h-10 w-10 text-citra-muted-soft" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-citra-ink">
            Tidak ada destinasi ditemukan
          </h3>
          <p className="mb-6 max-w-sm text-sm text-citra-muted">
            Coba ubah filter wilayah atau kategori untuk menemukan lebih banyak tempat.
          </p>
          <button
            onClick={() => { setRegion('Semua'); setCategory('Semua') }}
            className="rounded-full bg-citra-primary px-6 py-2.5 text-sm font-semibold text-citra-on-primary transition-all hover:bg-citra-primary-hover"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {paginatedItems.map((item) => (
              <DestinationCard key={item.id} item={item} />
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
              <div>
                <p className="mb-2 text-sm font-semibold text-citra-ink">Kategori</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <Chip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
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

export default function WisataPage() {
  usePageTitle('Wisata')
  return (
    <Suspense fallback={
      <div className="container-page section-spacing pt-32 lg:pt-40">
        <div className="skeleton-shimmer mb-8 h-8 w-64 rounded-lg" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-citra-surface shadow-card">
              <Skeleton variant="card" className="h-52 rounded-none" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <WisataPageContent />
    </Suspense>
  )
}