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
    <form onSubmit={handleSubmit} className="card border border-slate-200 p-8 shadow-sm">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Atur preferensi</p>
        <h2 className="text-3xl leading-tight text-brand-navy">Mulai dari tiga keputusan sederhana.</h2>
        <p className="mt-3 text-sm leading-7 font-light text-slate-600">Pilih durasi, wilayah utama, dan kisaran budget. Sisanya akan dipakai sebagai dasar untuk membentuk rencana perjalanan awal.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <label className="text-sm">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Jumlah hari</span>
          <input name="jumlah_hari" type="number" min={1} defaultValue={1} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition-all focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy" />
        </label>
        <label className="text-sm">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Wilayah</span>
          <select name="wilayah" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition-all focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy">
            <option>Cirebon</option>
            <option>Indramayu</option>
            <option>Majalengka</option>
            <option>Kuningan</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Budget</span>
          <select name="budget" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition-all focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy">
            <option value="murah">Murah</option>
            <option value="sedang">Sedang</option>
            <option value="mahal">Mahal</option>
          </select>
        </label>
      </div>
      <button type="submit" disabled={isLoading} className="btn-primary mt-8">{isLoading ? 'Memproses...' : 'Buat rancangan itinerary'}</button>
    </form>
  )
}
