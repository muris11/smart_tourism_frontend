'use client'

import { useState } from 'react'
import ItineraryResult from '@/components/sections/planning/ItineraryResult'
import PlanningForm from '@/components/sections/planning/PlanningForm'
import { PlanningResult } from '@/types/recommendation'

export default function PlanningPage() {
  const [result, setResult] = useState<PlanningResult | null>(null)

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
