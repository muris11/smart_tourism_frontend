'use client'

import { Suspense } from 'react'
import CariContent from './CariContent'

export default function CariPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-citra-canvas pt-28 pb-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="h-14 animate-pulse rounded-full bg-citra-surface-soft" />
          </div>
        </div>
      </div>
    }>
      <CariContent />
    </Suspense>
  )
}
