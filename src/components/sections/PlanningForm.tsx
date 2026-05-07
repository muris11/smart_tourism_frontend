'use client'

import { useState } from 'react'
import { recommendationApi } from '@/lib/api/recommendation'
import { PlanningResult } from '@/types/recommendation'

interface Props {
  onResult: (result: PlanningResult) => void
}

export default function PlanningForm({ onResult }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = {
      jumlah_hari: Number(formData.get('jumlah_hari') ?? 1),
      wilayah: [String(formData.get('wilayah') ?? 'Cirebon')],
      budget: String(formData.get('budget') ?? 'sedang') as 'murah' | 'sedang' | 'mahal',
    }
    setIsLoading(true)
    try {
      const result = await recommendationApi.planning(payload)
      onResult(result)
    } catch {
      onResult({ total_hari: payload.jumlah_hari, itinerary: [] })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card rounded-2xl p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm">
          <span className="mb-2 block font-medium">Jumlah hari</span>
          <input name="jumlah_hari" type="number" min={1} defaultValue={1} className="w-full rounded-xl border px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="mb-2 block font-medium">Wilayah</span>
          <select name="wilayah" className="w-full rounded-xl border px-3 py-2">
            <option>Cirebon</option>
            <option>Indramayu</option>
            <option>Majalengka</option>
            <option>Kuningan</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-2 block font-medium">Budget</span>
          <select name="budget" className="w-full rounded-xl border px-3 py-2">
            <option value="murah">Murah</option>
            <option value="sedang">Sedang</option>
            <option value="mahal">Mahal</option>
          </select>
        </label>
      </div>
      <button type="submit" disabled={isLoading} className="btn-primary mt-5">{isLoading ? 'Memproses...' : 'Generate Itinerary'}</button>
    </form>
  )
}
