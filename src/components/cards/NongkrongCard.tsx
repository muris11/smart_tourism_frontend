import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { ROUTES } from '@/lib/constants/routes'
import { formatRating } from '@/lib/utils/format'
import { NongkrongItem } from '@/types/nongkrong'

interface Props {
  nongkrong: NongkrongItem
}

export default function NongkrongCard({ nongkrong }: Props) {
  return (
    <Link href={ROUTES.NONGKRONG_DETAIL(nongkrong.kode)} className="group block rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{nongkrong.wilayah} · {nongkrong.tipe}</p>
          <h3 className="mt-2 text-2xl leading-tight text-brand-navy transition-colors group-hover:text-[var(--color-brand-dark)]">{nongkrong.nama}</h3>
        </div>
        <Badge label={nongkrong.sentimen} variant={nongkrong.sentimen === 'positif' ? 'success' : nongkrong.sentimen === 'negatif' ? 'danger' : 'default'} />
      </div>
      <p className="text-sm leading-7 font-light text-slate-600">{nongkrong.alamat ?? 'Alamat belum tersedia'}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="font-medium text-brand-navy">Rating {formatRating(nongkrong.rating)}</span>
        <span className="text-slate-400">{nongkrong.ada_wifi ? 'WiFi' : 'No WiFi'} · {nongkrong.ada_colokan ? 'Colokan' : 'Tanpa Colokan'}</span>
      </div>
    </Link>
  )
}
