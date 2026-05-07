import { formatSentimen } from '@/lib/utils/format'

interface Props {
  kode: string
  tipe: 'wisata' | 'kuliner' | 'nongkrong'
  sentimen: 'positif' | 'negatif' | 'belum_dianalisis'
  pct: number
}

export default function DetailSentiment({ kode, tipe, sentimen, pct }: Props) {
  return (
    <section className="card rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Sentiment</h2>
      <p className="mt-3 text-sm text-gray-600">{tipe} · {kode}</p>
      <p className="mt-1 text-sm text-gray-600">Status: {sentimen}</p>
      <p className="mt-1 font-medium text-[var(--color-brand)]">{formatSentimen(pct)}</p>
    </section>
  )
}
