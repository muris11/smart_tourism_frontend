import { WILAYAH } from '@/lib/constants/wilayah'

export default function WilayahSection() {
  return (
    <section className="container px-4 py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--color-brand)]">Wilayah</p>
          <h2 className="text-2xl font-semibold">Empat pusat eksplorasi</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {WILAYAH.map((wilayah) => (
          <div key={wilayah} className="card rounded-2xl border border-green-100 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Destinasi</p>
            <h3 className="mt-2 text-xl font-semibold text-gray-900">{wilayah}</h3>
            <p className="mt-2 text-sm text-gray-600">Basis eksplorasi wisata, kuliner, dan tempat nongkrong.</p>
          </div>
        ))}
      </div>
    </section>
  )
}
