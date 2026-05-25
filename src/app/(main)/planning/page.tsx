'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import ItineraryResult from '@/components/sections/planning/ItineraryResult'
import PlanningForm from '@/components/sections/planning/PlanningForm'
import { PlanningResult } from '@/types/recommendation'

export default function PlanningPage() {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const [result, setResult] = useState<PlanningResult | null>(null)

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login?callback=/planning')
    }
  }, [isLoggedIn, isLoading, router])

  if (isLoading || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-28 pb-24">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-navy" />
          <p className="text-sm text-slate-500">Memeriksa autentikasi...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-slate-900">Planning Perjalanan</h1>
          <p className="text-base text-slate-600">Buat itinerary perjalanan Anda dengan bantuan AI. Pilih durasi, wilayah, dan preferensi.</p>
        </div>

        <PlanningForm onResult={setResult} />

        {result && (
          <div className="mt-10">
            <ItineraryResult result={result} />
          </div>
        )}
      </div>
    </div>
  )
}
