'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Save, Calendar, MapPin, Tag, Wallet } from 'lucide-react'
import { recommendationApi } from '@/lib/api/recommendation'
import { PlanningPayload, PlanningResult } from '@/types/recommendation'
import { useAuth } from '@/hooks/useAuth'

const WILAYAH_OPTIONS = ['Cirebon', 'Indramayu', 'Majalengka', 'Kuningan']
const KATEGORI_OPTIONS = ['Alam', 'Buatan', 'Budaya', 'Religi', 'Petualangan', 'Edukasi', 'Kuliner', 'Nongkrong']

const schema = z.object({
  jumlah_hari: z.number().min(1, 'Minimal 1 hari').max(14, 'Maksimal 14 hari'),
  wilayah: z.array(z.string()).min(1, 'Pilih minimal 1 wilayah'),
  kategori_preferensi: z.array(z.string()).optional(),
  budget: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  onResult: (result: PlanningResult) => void
}

export default function PlanningForm({ onResult }: Props) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      jumlah_hari: 2,
      wilayah: [],
      kategori_preferensi: [],
      budget: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setError(null)

    const budgetMap: Record<string, number> = {
      murah: 200000,
      sedang: 500000,
      mahal: 1000000,
    }

    const payload: PlanningPayload = {
      user_id: user?.id ?? null,
      jumlah_hari: data.jumlah_hari,
      jumlah_orang: 1,
      wilayah: data.wilayah as PlanningPayload['wilayah'],
      kategori_preferensi: data.kategori_preferensi,
      budget: data.budget ? budgetMap[data.budget] : null,
      tanggal_mulai: new Date().toISOString().split('T')[0],
    }

    try {
      const result = await recommendationApi.planning(payload)
      onResult(result)
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as { message?: string })?.message ||
        'Gagal membuat itinerary. Layanan AI mungkin sedang tidak tersedia.'
      setError(msg)
      onResult({ itinerary: [], total_budget: 0, total_durasi_jam: 0 })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Atur preferensi</p>
        <h2 className="text-2xl font-bold text-slate-900">Rencanakan Perjalanan Anda</h2>
        <p className="mt-2 text-sm text-slate-600">Pilih durasi, wilayah, kategori, dan budget. AI akan menyusun itinerary untuk Anda.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            Jumlah Hari
          </label>
          <input
            type="number"
            {...register('jumlah_hari', { valueAsNumber: true })}
            min={1}
            max={14}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
          />
          {errors.jumlah_hari && <p className="mt-1 text-xs text-red-500">{errors.jumlah_hari.message}</p>}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <Wallet className="h-3.5 w-3.5" />
            Budget
          </label>
          <select
            {...register('budget')}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
            aria-label="Budget"
          >
            <option value="">Fleksibel</option>
            <option value="murah">Murah (&lt; 200rb/hari)</option>
            <option value="sedang">Sedang (200-500rb/hari)</option>
            <option value="mahal">Mahal (&gt; 500rb/hari)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            Wilayah
          </label>
          <div className="flex flex-wrap gap-2">
            {WILAYAH_OPTIONS.map((w) => (
              <label key={w} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm transition-colors hover:border-blue-300">
                <input
                  type="checkbox"
                  value={w}
                  {...register('wilayah')}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700">{w}</span>
              </label>
            ))}
          </div>
          {errors.wilayah && <p className="mt-1 text-xs text-red-500">{errors.wilayah.message}</p>}
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <Tag className="h-3.5 w-3.5" />
            Kategori Preferensi
          </label>
          <div className="flex flex-wrap gap-2">
            {KATEGORI_OPTIONS.map((k) => (
              <label key={k} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm transition-colors hover:border-blue-300">
                <input
                  type="checkbox"
                  value={k}
                  {...register('kategori_preferensi')}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700">{k}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 w-full rounded-full bg-slate-900 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            AI sedang menyusun itinerary...
          </span>
        ) : (
          'Buat Rencana Perjalanan'
        )}
      </button>
    </form>
  )
}
