interface Props {
  kode: string
  wilayah: string
}

export default function DetailRecommendation({ kode, wilayah }: Props) {
  return (
    <section className="card p-6">
      <h2 className="text-2xl text-brand-navy">Rekomendasi Terkait</h2>
      <p className="mt-3 text-sm leading-7 font-light text-slate-600">Kurasi lanjutan untuk item {kode} di wilayah {wilayah}. Komponen ini siap diisi hasil endpoint rekomendasi.</p>
    </section>
  )
}
