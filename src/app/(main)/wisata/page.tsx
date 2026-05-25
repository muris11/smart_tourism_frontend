'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useWisata, useFeaturedWisata } from '@/hooks/useWisata'
import { useKategoriWisata } from '@/hooks/useKategoriWisata'
import { useDebounce } from '@/hooks/useDebounce'
import WisataCard from '@/components/cards/WisataCard'
import { SlidersHorizontal, Search, X, Sparkles } from 'lucide-react'
import Pagination from '@/components/ui/Pagination'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils/cn'
import { WILAYAH_LIST, type Wilayah } from '@/lib/constants/wilayah'
import type { Sentimen } from '@/lib/constants/sentimen'

interface FilterContentProps {
  filters: {
    wilayah: string
    searchQuery: string
    kategori_utama: string
    sentimen: string
  }
  kategoriOptions: string[]
  onFilterChange: (key: string, value: string | number) => void
  onReset: () => void
}

function FilterContent({
  filters,
  kategoriOptions,
  onFilterChange,
  onReset,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-brand-navy">Filter</h3>
        <button onClick={onReset} className="text-sm text-brand-navy hover:underline transition-colors">
          Reset
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Wilayah</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange('wilayah', '')}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              !filters.wilayah
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            Semua
          </button>
          {WILAYAH_LIST.map((w) => (
            <button
              key={w}
              onClick={() => onFilterChange('wilayah', w)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                filters.wilayah === w
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Kategori</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange('kategori_utama', '')}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              !filters.kategori_utama
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            Semua
          </button>
          {kategoriOptions.map((k) => (
            <button
              key={k}
              onClick={() => onFilterChange('kategori_utama', k)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                filters.kategori_utama === k
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Sentimen</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange('sentimen', '')}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              !filters.sentimen
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            Semua
          </button>
          {['positif', 'negatif', 'netral'].map((s) => (
            <button
              key={s}
              onClick={() => onFilterChange('sentimen', s)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                filters.sentimen === s
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Cari Wisata</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            placeholder="Cari wisata, nama tempat, atau lokasi..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
          />
        </div>
      </div>
    </div>
  )
}

export default function WisataPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    wilayah: searchParams.get('wilayah') || '',
    searchQuery: searchParams.get('q') || '',
    kategori_utama: searchParams.get('kategori_utama') || '',
    sentimen: searchParams.get('sentimen') || '',
  })
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page')
    return page ? parseInt(page, 10) : 1
  })
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const debouncedSearch = useDebounce(filters.searchQuery, 500)
  const { kategori: kategoriOptions } = useKategoriWisata()

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.wilayah) params.set('wilayah', filters.wilayah)
    if (filters.kategori_utama) params.set('kategori_utama', filters.kategori_utama)
    if (filters.sentimen) params.set('sentimen', filters.sentimen)
    if (debouncedSearch) params.set('q', debouncedSearch)
    if (currentPage > 1) params.set('page', currentPage.toString())

    const newUrl = `/wisata${params.toString() ? `?${params.toString()}` : ''}`
    router.push(newUrl, { scroll: false })
  }, [filters, debouncedSearch, currentPage, router])

  const { data, isLoading, error, meta } = useWisata({
    wilayah: (filters.wilayah as Wilayah) || undefined,
    kategori_utama: filters.kategori_utama || undefined,
    sentimen: (filters.sentimen as Sentimen) || undefined,
    q: debouncedSearch || undefined,
    page: currentPage,
    per_page: 12,
  })

  const { data: rekomendasi, isLoading: rekomendasiLoading } = useFeaturedWisata()

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handleReset = () => {
    setFilters({
      wilayah: '',
      searchQuery: '',
      kategori_utama: '',
      sentimen: '',
    })
    setCurrentPage(1)
    setShowMobileFilter(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeFilterCount = [
    filters.wilayah,
    filters.kategori_utama,
    filters.sentimen,
    filters.searchQuery,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 pb-8 pt-32 md:px-6 md:pt-36 lg:px-8 lg:pt-32">
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-brand-navy md:text-4xl">
            Destinasi Wisata Ciayumajakuning
          </h1>
          <p className="mt-2 text-slate-500 max-w-2xl lg:mx-0 mx-auto">
            Temukan berbagai destinasi wisata menarik di Cirebon, Indramayu, Majalengka, dan Kuningan
          </p>
        </div>

        {rekomendasi && rekomendasi.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-green" />
              <h2 className="text-xl font-semibold text-brand-navy">
                Rekomendasi untuk Kamu
              </h2>
              <span className="text-xs text-slate-400">
                Berdasarkan aktivitasmu
              </span>
            </div>
            {rekomendasiLoading ? (
              <div className="flex justify-center py-10">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {rekomendasi.map((item) => (
                  <WisataCard key={item.kode} data={item} />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <aside className="hidden lg:block lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <FilterContent
                filters={filters}
                kategoriOptions={kategoriOptions}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:hidden">
              <p className="text-sm text-slate-500">
                {!isLoading && !error && meta && (
                  <span>
                    Menampilkan <span className="font-semibold text-brand-navy">{data?.length || 0}</span>{' '}
                    dari <span className="font-semibold">{meta.total}</span> destinasi
                  </span>
                )}
              </p>
              <button
                onClick={() => setShowMobileFilter(true)}
                className="relative flex items-center justify-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white shadow-sm transition-all active:scale-95"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            <div className="mb-4 hidden items-center justify-between lg:flex">
              <p className="text-sm text-slate-500">
                {!isLoading && !error && meta && (
                  <span>
                    Menampilkan <span className="font-semibold text-brand-navy">{data?.length || 0}</span>{' '}
                    dari <span className="font-semibold">{meta.total}</span> destinasi
                  </span>
                )}
              </p>
            </div>

            {isLoading && (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            )}

            {error && !isLoading && (
              <div className="flex justify-center py-20">
                <EmptyState
                  title="Gagal memuat data"
                  description="Terjadi kesalahan saat memuat data wisata. Silakan coba lagi."
                  actionLabel="Coba Lagi"
                  onAction={() => window.location.reload()}
                />
              </div>
            )}

            {!isLoading && !error && data && data.length === 0 && (
              <div className="flex justify-center py-20">
                <EmptyState
                  title="Tidak ada wisata ditemukan"
                  description="Coba ubah filter atau kata kunci pencarian Anda."
                  actionLabel="Reset Filter"
                  onAction={handleReset}
                />
              </div>
            )}

            {!isLoading && !error && data && data.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((item) => (
                    <WisataCard key={item.kode} data={item} />
                  ))}
                </div>

                {meta && meta.last_page > 1 && (
                  <div className="mt-10 flex justify-center">
                    <Pagination
                      currentPage={meta.current_page}
                      totalPages={meta.last_page}
                      onPageChange={handlePageChange}
                      siblingCount={1}
                      size="md"
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] animate-in slide-in-from-bottom duration-300 rounded-t-3xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-lg font-semibold text-brand-navy">Filter</h3>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="rounded-full p-1.5 transition-colors hover:bg-slate-100"
                aria-label="Tutup filter"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="max-h-[calc(85vh-140px)] overflow-y-auto px-5 py-4">
              <FilterContent
                filters={filters}
                kategoriOptions={kategoriOptions}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
            <div className="flex gap-3 border-t border-slate-100 px-5 py-4">
              <button
                onClick={handleReset}
                className="flex-1 rounded-full border border-slate-300 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Reset Filter
              </button>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="flex-1 rounded-full bg-brand-navy py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}