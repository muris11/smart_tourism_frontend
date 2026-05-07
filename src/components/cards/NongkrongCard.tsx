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
    <Link href={ROUTES.NONGKRONG_DETAIL(nongkrong.kode)} className="card block rounded-2xl p-4 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400">{nongkrong.wilayah} · {nongkrong.tipe}</p>
          <h3 className="font-semibold">{nongkrong.nama}</h3>
        </div>
        <Badge label={nongkrong.sentimen} variant={nongkrong.sentimen === 'positif' ? 'success' : nongkrong.sentimen === 'negatif' ? 'danger' : 'default'} />
      </div>
      <p className="text-sm text-gray-500">{nongkrong.alamat ?? 'Alamat belum tersedia'}</p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--color-brand)]">⭐ {formatRating(nongkrong.rating)}</span>
        <span className="text-gray-400">{nongkrong.ada_wifi ? 'WiFi' : 'No WiFi'} · {nongkrong.ada_colokan ? 'Colokan' : 'Tanpa Colokan'}</span>
      </div>
    </Link>
  )
}
