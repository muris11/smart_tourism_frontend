'use client'

import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

function MapSkeleton() {
  return (
    <section className="section-spacing">
      <div className="container-page">
        <div className="mb-8 text-center">
          <p className="eyebrow">Peta Wilayah</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl">
            Jelajahi Peta Interaktif
          </h2>
          <p className="mt-2 text-citra-body">
            Menyiapkan data destinasi dan koordinat peta.
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-citra-border bg-citra-surface-soft shadow-card sm:aspect-[16/9]">
          <div className="absolute inset-0 skeleton-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

const InteractiveMap = dynamic(() => import('@/components/sections/InteractiveMap'), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

export default function LazyInteractiveMap() {
  const { ref, inView } = useInView({
    rootMargin: '500px 0px',
    triggerOnce: true,
  })

  return (
    <div ref={ref}>
      {inView ? <InteractiveMap /> : <MapSkeleton />}
    </div>
  )
}
