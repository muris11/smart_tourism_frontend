import { formatSentimen } from '@/lib/utils/format'

interface Props {
  kode: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  sentimen: 'positif' | 'negatif' | 'belum_dianalisis'
  pct: number
}

export default function DetailSentiment({ kode, tipe, sentimen, pct }: Props) {
  return (
    <section className="card p-6">
      <h2 className="text-2xl text-brand-navy">Sentiment</h2>
      <p className="mt-3 text-sm text-slate-600">{tipe} · {kode}</p>
      <p className="mt-1 text-sm text-slate-600">Status: {sentimen}</p>
      <p className="mt-2 text-lg font-medium text-brand-green">{formatSentimen(pct)}</p>
    </section>
  )
}
