import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { ROUTES } from '@/lib/constants/routes'
import { formatRating } from '@/lib/utils/format'
import { WisataItem } from '@/types/wisata'

interface Props {
  wisata: WisataItem
}

export default function WisataCard({ wisata }: Props) {
  return (
    <Link href={ROUTES.WISATA_DETAIL(wisata.kode)} className="group block overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-md">
      <div className="relative h-44 bg-gray-100">
        {wisata.gambar ? (
          <Image src={wisata.gambar} alt={wisata.nama} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-300">Tidak ada gambar</div>
        )}
        <div className="absolute top-2 left-2">
          <Badge label={wisata.sentimen === 'positif' ? 'Positif' : wisata.sentimen === 'negatif' ? 'Negatif' : 'Belum Dianalisis'} variant={wisata.sentimen === 'positif' ? 'success' : wisata.sentimen === 'negatif' ? 'danger' : 'default'} />
        </div>
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs text-gray-400">{wisata.wilayah} · {wisata.kategori}</p>
        <h3 className="line-clamp-1 font-semibold text-gray-900">{wisata.nama}</h3>
        {wisata.alamat ? <p className="mt-1 line-clamp-1 text-xs text-gray-500">{wisata.alamat}</p> : null}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-brand)]">⭐ {formatRating(wisata.rating)}</span>
          {wisata.harga_tiket ? <span className="text-xs text-gray-400">{wisata.harga_tiket}</span> : null}
        </div>
      </div>
    </Link>
  )
}
