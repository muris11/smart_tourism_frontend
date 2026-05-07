import { WILAYAH } from '@/lib/constants/wilayah'

export default function WilayahSection() {
  return (
    <section className="container border-b border-slate-100 px-6 py-12 md:px-12">
      <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <p className="shrink-0 text-sm font-semibold uppercase tracking-widest text-slate-400">Cakupan wilayah</p>
        <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-4">
          {WILAYAH.map((wilayah) => (
            <div key={wilayah} className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-left shadow-sm transition-shadow hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Destinasi</p>
              <h3 className="mt-2 text-2xl text-brand-navy">{wilayah}</h3>
              <p className="mt-2 text-sm leading-6 font-light text-slate-600">Basis eksplorasi wisata, kuliner, dan ruang sosial.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
