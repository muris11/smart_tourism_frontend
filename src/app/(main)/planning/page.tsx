'use client'

import { useState } from 'react'
import ItineraryResult from '@/components/sections/ItineraryResult'
import PlanningForm from '@/components/sections/PlanningForm'
import { PlanningResult } from '@/types/recommendation'

export default function PlanningPage() {
  const [result, setResult] = useState<PlanningResult | null>(null)

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold">Rencanakan Wisatamu</h1>
      <p className="mb-8 text-gray-500">Isi preferensi kamu, kami buatkan itinerary otomatis.</p>
      <PlanningForm onResult={setResult} />
      {result ? <div className="mt-10"><ItineraryResult result={result} /></div> : null}
    </div>
  )
}
