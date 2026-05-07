'use client'

import WisataCard from '@/components/cards/WisataCard'
import FilterPanel from '@/components/filters/FilterPanel'
import EmptyState from '@/components/ui/EmptyState'
import Skeleton from '@/components/ui/Skeleton'
import { useWisataList } from '@/hooks/useWisata'
import { useFilterStore } from '@/stores/filterStore'

export default function WisataPage() {
  const filter = useFilterStore()
  const { data, isLoading, isError } = useWisataList({
    wilayah: filter.wilayah || undefined,
    sentimen: filter.sentimen || undefined,
    sort: filter.sort as 'rating' | 'terbaru' | 'nama',
    q: filter.q || undefined,
    page: filter.page,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Wisata Ciayumajakuning</h1>
      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 lg:block"><FilterPanel tipe="wisata" /></aside>
        <div className="flex-1">
          {isLoading ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}</div> : null}
          {isError ? <EmptyState message="Gagal memuat data. Coba lagi." /> : null}
          {!isLoading && !isError && data.length === 0 ? <EmptyState message="Tidak ada wisata ditemukan." /> : null}
          {!isLoading && data.length > 0 ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{data.map((w) => <WisataCard key={w.kode} wisata={w} />)}</div> : null}
        </div>
      </div>
    </div>
  )
}
