'use client'

import { WILAYAH } from '@/lib/constants/wilayah'
import { useFilterStore } from '@/stores/filterStore'

interface Props {
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
}

export default function FilterPanel({ tipe }: Props) {
  const { wilayah, sentimen, sort, setWilayah, setSentimen, setSort, reset } = useFilterStore()

  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-navy">Filter {tipe}</h3>
        <button onClick={reset} className="text-xs font-medium text-slate-500 transition-colors hover:text-[var(--color-brand)] hover:underline">Reset</button>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Wilayah</label>
        <div className="space-y-2">
          {['', ...WILAYAH].map((w) => (
            <button key={w || 'all'} onClick={() => setWilayah(w)} className={`block w-full rounded-2xl px-3 py-2.5 text-left text-sm transition ${wilayah === w ? 'bg-brand-navy text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
              {w || 'Semua Wilayah'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Sentimen</label>
        <div className="space-y-2">
          {[
            { value: '', label: 'Semua' },
            { value: 'positif', label: 'Positif' },
            { value: 'negatif', label: 'Negatif' },
          ].map((s) => (
            <button key={s.value} onClick={() => setSentimen(s.value)} className={`block w-full rounded-2xl px-3 py-2.5 text-left text-sm transition ${sentimen === s.value ? 'bg-brand-navy text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Urutkan</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy">
          <option value="rating">Rating Tertinggi</option>
          <option value="terbaru">Terbaru</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>
    </div>
  )
}
