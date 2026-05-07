interface Props {
  kode: string
  wilayah: string
}

export default function DetailRecommendation({ kode, wilayah }: Props) {
  return (
    <section className="card rounded-2xl p-6">
      <h2 className="text-lg font-semibold">Rekomendasi Terkait</h2>
      <p className="mt-3 text-sm text-gray-600">Placeholder rekomendasi untuk item {kode} di {wilayah}.</p>
    </section>
  )
}
