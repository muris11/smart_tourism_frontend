import { Koordinat } from '@/types/wisata'

interface Props {
  koordinat: Koordinat
  nama: string
}

export default function DetailMap({ koordinat, nama }: Props) {
  return (
    <section className="card rounded-2xl p-6">
      <h2 className="text-lg font-semibold">Peta</h2>
      <p className="mt-3 text-sm text-gray-600">{nama}</p>
      <p className="text-sm text-gray-500">Lat {koordinat.lat}, Lng {koordinat.lng}</p>
    </section>
  )
}
