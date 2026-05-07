'use client'

import { useState } from 'react'
import ItineraryResult from '@/components/sections/ItineraryResult'
import PlanningForm from '@/components/sections/PlanningForm'
import { PlanningResult } from '@/types/recommendation'

export default function PlanningPage() {
  const [result, setResult] = useState<PlanningResult | null>(null)

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 animate-fade-in">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="mb-4 text-5xl text-brand-navy">Planning Perjalanan</h1>
        <p className="mb-12 font-light text-slate-600">Atur itinerary Anda hari demi hari dengan mudah.</p>

        <PlanningForm onResult={setResult} />

        {result ? (
          <div className="mt-10">
            <ItineraryResult result={result} />
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
            <h3 className="mb-2 text-lg font-bold text-slate-700">Belum ada rencana perjalanan</h3>
            <p className="mb-6 text-sm text-slate-500">Mulai tambahkan preferensi atau destinasi untuk membuat itinerary Anda.</p>
            <button className="rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900">
              Buat Plan Baru
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
