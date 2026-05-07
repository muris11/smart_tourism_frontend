import { KulinerDetail } from '@/types/kuliner'
import { NongkrongDetail } from '@/types/nongkrong'
import { WisataDetail } from '@/types/wisata'

interface Props {
  wisata?: WisataDetail
  item?: WisataDetail | KulinerDetail | NongkrongDetail
}

export default function DetailInfo({ wisata, item }: Props) {
  const data = item ?? wisata
  if (!data) return null

  return (
    <section className="card p-8">
      <p className="eyebrow mb-4">Ulasan Destinasi</p>
      <h2 className="mb-5 text-3xl text-brand-navy">Informasi Detail</h2>
      <p className="text-base leading-8 font-light text-slate-600">{data.deskripsi ?? 'Deskripsi belum tersedia.'}</p>
    </section>
  )
}
