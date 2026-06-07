'use client'

import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'

function SentimentSkeletonContent() {
  return (
    <>
      <div className="text-center">
        <p className="eyebrow">Sentimen Wisatawan</p>
        <div className="mx-auto mt-3 h-10 max-w-md rounded skeleton-shimmer" />
        <div className="mx-auto mt-4 h-5 max-w-2xl rounded skeleton-shimmer" />
      </div>
      <div className="mt-8 rounded-xl bg-white p-6 shadow-card">
        <div className="mx-auto h-8 w-64 rounded skeleton-shimmer" />
        <div className="mt-8 h-80 rounded-lg skeleton-shimmer" />
      </div>
    </>
  )
}

const SentimentChart = dynamic(() => import('@/components/sections/tentang/SentimentChart'), {
  ssr: false,
  loading: () => <SentimentSkeletonContent />,
})

export default function LazySentimentChart() {
  const { ref, inView } = useInView({
    rootMargin: '400px 0px',
    triggerOnce: true,
  })

  return (
    <section ref={ref} className="section-spacing bg-citra-surface-soft">
      <div className="container-page">
        {inView ? <SentimentChart /> : <SentimentSkeletonContent />}
      </div>
    </section>
  )
}
