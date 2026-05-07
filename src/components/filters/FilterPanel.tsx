'use client'

import { WILAYAH } from '@/lib/constants/wilayah'
import { useFilterStore } from '@/stores/filterStore'

interface Props {
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
}

export default function FilterPanel({ tipe }: Props) {
  const { wilayah, sentimen, sort, setWilayah, setSentimen, setSort, reset } = useFilterStore()

  return (
    <div className="space-y-5 rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filter {tipe}</h3>
        <button onClick={reset} className="text-xs text-[var(--color-brand)] hover:underline">Reset</button>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-gray-500">Wilayah</label>
        <div className="space-y-1">
          {['', ...WILAYAH].map((w) => (
            <button key={w || 'all'} onClick={() => setWilayah(w)} className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition ${wilayah === w ? 'bg-[var(--color-brand)] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
              {w || 'Semua Wilayah'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-gray-500">Sentimen</label>
        <div className="space-y-1">
          {[
            { value: '', label: 'Semua' },
            { value: 'positif', label: 'Positif' },
            { value: 'negatif', label: 'Negatif' },
          ].map((s) => (
            <button key={s.value} onClick={() => setSentimen(s.value)} className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition ${sentimen === s.value ? 'bg-[var(--color-brand)] text-white' : 'text-gray-700 hover:bg-gray-50'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-gray-500">Urutkan</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]">
          <option value="rating">Rating Tertinggi</option>
          <option value="terbaru">Terbaru</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>
    </div>
  )
}
