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
    <section className="card rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Informasi Detail</h2>
      <p className="mt-3 text-sm leading-6 text-gray-600">{data.deskripsi ?? 'Deskripsi belum tersedia.'}</p>
    </section>
  )
}
