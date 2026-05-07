import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { ROUTES } from '@/lib/constants/routes'
import { formatRating } from '@/lib/utils/format'
import { KulinerItem } from '@/types/kuliner'

interface Props {
  kuliner: KulinerItem
}

export default function KulinerCard({ kuliner }: Props) {
  return (
    <Link href={ROUTES.KULINER_DETAIL(kuliner.kode)} className="card block rounded-2xl p-4 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400">{kuliner.wilayah} · {kuliner.jenis}</p>
          <h3 className="font-semibold">{kuliner.nama}</h3>
        </div>
        <Badge label={kuliner.sentimen} variant={kuliner.sentimen === 'positif' ? 'success' : kuliner.sentimen === 'negatif' ? 'danger' : 'default'} />
      </div>
      <p className="text-sm text-gray-500">{kuliner.alamat ?? 'Alamat belum tersedia'}</p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--color-brand)]">⭐ {formatRating(kuliner.rating)}</span>
        <span className="text-gray-400">{kuliner.range_harga ?? '-'}</span>
      </div>
    </Link>
  )
}
