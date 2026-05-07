import { Koordinat } from '@/types/wisata'

interface Props {
  koordinat: Koordinat
  nama: string
}

export default function DetailMap({ koordinat, nama }: Props) {
  return (
    <section className="card p-6">
      <h2 className="text-2xl text-brand-navy">Peta</h2>
      <p className="mt-3 text-sm text-slate-600">{nama}</p>
      <div className="mt-4 rounded-[1.5rem] bg-brand-pale p-5 text-sm leading-7 text-slate-500">
        Lat {koordinat.lat}, Lng {koordinat.lng}
      </div>
    </section>
  )
}
