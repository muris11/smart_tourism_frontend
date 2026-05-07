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
    <Link href={ROUTES.WISATA_DETAIL(wisata.kode)} className="group block cursor-pointer animate-fade-in">
      <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
        {wisata.gambar ? (
          <Image src={wisata.gambar} alt={wisata.nama} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-300">Tidak ada gambar</div>
        )}
        <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
        <div className="absolute top-4 left-4">
          <Badge label={wisata.sentimen === 'positif' ? 'Positif' : wisata.sentimen === 'negatif' ? 'Negatif' : 'Belum Dianalisis'} variant={wisata.sentimen === 'positif' ? 'success' : wisata.sentimen === 'negatif' ? 'danger' : 'default'} />
        </div>
      </div>
      <div className="flex items-start justify-between px-1">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {wisata.wilayah} · {wisata.kategori}
          </p>
          <h3 className="mb-2 text-2xl leading-tight tracking-tight text-brand-navy transition-colors group-hover:text-[var(--color-brand-dark)]">
            {wisata.nama}
          </h3>
          <p className="max-w-[18rem] text-sm leading-7 font-light text-slate-600">
            {wisata.alamat ?? `${wisata.sentimen_positif_pct}% sentimen positif`}
          </p>
        </div>
        <div className="text-right">
          <div className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600">
            {formatRating(wisata.rating)}
          </div>
          {wisata.harga_tiket ? <p className="mt-3 text-xs font-medium text-slate-400">{wisata.harga_tiket}</p> : null}
        </div>
      </div>
    </Link>
  )
}
