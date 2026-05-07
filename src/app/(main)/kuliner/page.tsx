'use client'

import KulinerCard from '@/components/cards/KulinerCard'
import FilterPanel from '@/components/filters/FilterPanel'
import EmptyState from '@/components/ui/EmptyState'
import Skeleton from '@/components/ui/Skeleton'
import { useKulinerList } from '@/hooks/useKuliner'
import { useFilterStore } from '@/stores/filterStore'

export default function KulinerPage() {
  const filter = useFilterStore()
  const { data, isLoading, isError } = useKulinerList({
    wilayah: filter.wilayah || undefined,
    sentimen: filter.sentimen || undefined,
    sort: filter.sort as 'rating' | 'terbaru' | 'nama',
    q: filter.q || undefined,
    page: filter.page,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Kuliner Ciayumajakuning</h1>
      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 lg:block"><FilterPanel tipe="kuliner" /></aside>
        <div className="flex-1">
          {isLoading ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-2xl" />)}</div> : null}
          {isError ? <EmptyState message="Gagal memuat data kuliner." /> : null}
          {!isLoading && !isError && data.length === 0 ? <EmptyState message="Tidak ada kuliner ditemukan." /> : null}
          {!isLoading && data.length > 0 ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.map((item) => <KulinerCard key={item.kode} kuliner={item} />)}</div> : null}
        </div>
      </div>
    </div>
  )
}
