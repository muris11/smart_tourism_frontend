'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getDestinations, getDestinationBySlug, type Destination } from '@/lib/api'
import DetailHero from '@/components/sections/DetailHero'
import DetailContent from '@/components/sections/DetailContent'
import DetailSidebar from '@/components/sections/DetailSidebar'
import RekomendasiLain from '@/components/sections/RekomendasiLain'
import NotFoundState from '@/components/sections/NotFoundState'

export default function WisataDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [item, setItem] = useState<Destination | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [allItems, setAllItems] = useState<Destination[]>([])

  useEffect(() => {
    Promise.all([
      getDestinationBySlug(slug),
      getDestinations(),
    ]).then(([detail, list]) => {
      setItem(detail)
      setAllItems(list)
    }).finally(() => setLoading(false))
  }, [slug])

  const rekomendasi = useMemo(() =>
    item
      ? allItems.filter((d) => d.region === item.region && d.id !== item.id)
      : [],
    [item, allItems]
  )

  if (loading) {
    return (
      <div className="min-h-screen animate-pulse bg-citra-canvas">
        <div className="h-[50vh] bg-citra-surface-soft" />
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-citra-surface-soft" />
              <div className="h-4 w-full rounded bg-citra-surface-soft" />
              <div className="h-4 w-full rounded bg-citra-surface-soft" />
              <div className="h-4 w-2/3 rounded bg-citra-surface-soft" />
            </div>
            <div className="h-64 rounded bg-citra-surface-soft" />
          </div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <NotFoundState
        title="Destinasi tidak ditemukan"
        description="Destinasi wisata yang kamu cari tidak tersedia atau telah dihapus."
        actionLabel="Jelajahi Wisata Lain"
        actionHref="/wisata"
      />
    )
  }

  return (
    <div>
      <DetailHero
        images={item.images}
        title={item.name}
        region={item.region}
        category={item.category}
        rating={item.rating}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <DetailContent item={item} />
          <DetailSidebar item={item} />
        </div>
        <RekomendasiLain items={rekomendasi} basePath="wisata" label="Wisata" />
      </div>
    </div>
  )
}
