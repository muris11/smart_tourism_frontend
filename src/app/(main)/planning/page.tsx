'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useHydrated } from '@/stores/authStore'
import ItineraryResult from '@/components/sections/planning/ItineraryResult'
import PlanningForm, { PlanningFormRef } from '@/components/sections/planning/PlanningForm'
import { PlanningResult } from '@/types/recommendation'

export default function PlanningPage() {
  usePageTitle('Planning')
  const { isLoggedIn } = useAuth()
  const hasHydrated = useHydrated()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [result, setResult] = useState<PlanningResult | null>(null)
  const formRef = useRef<PlanningFormRef>(null)

  // Baca params dari URL
  const wilayah = searchParams.get('wilayah')
  const hari = searchParams.get('hari')
  const budget = searchParams.get('budget')
  const kategoriParam = searchParams.get('kategori')

  useEffect(() => {
    if (hasHydrated && !isLoggedIn) {
      router.push('/login?callback=/planning')
    }
  }, [isLoggedIn, hasHydrated, router])

  // Auto submit form jika ada params dari chatbot
  useEffect(() => {
    if (wilayah || hari || budget || kategoriParam) {
      const timer = setTimeout(() => {
        formRef.current?.submitWithData({
          wilayah: wilayah || undefined,
          hari: hari ? parseInt(hari) : undefined,
          budget: budget ? parseInt(budget) : undefined,
          kategori: kategoriParam || undefined,
        })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [wilayah, hari, budget, kategoriParam])

  if (!hasHydrated || !isLoggedIn) {
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

        <PlanningForm
          ref={formRef}
          onResult={(r) => {
            if (r && Array.isArray(r.itinerary)) {
              setResult(r as PlanningResult)
            } else {
              setResult({ itinerary: [], total_budget: 0, total_durasi_jam: 0 })
            }
          }}
        />

        {result && (
          <div className="mt-10">
            <ItineraryResult result={result} />
          </div>
        )}
      </div>
    </div>
  )
}