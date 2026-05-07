interface Props {
  nama: string
  gambar: string | null
  rating: number
  wilayah: string
}

export default function DetailHero({ nama, gambar, rating, wilayah }: Props) {
  return (
    <section className="border-b border-gray-100 bg-gradient-to-br from-green-50 to-white">
      <div className="container px-4 py-12">
        <p className="text-sm text-[var(--color-brand)]">{wilayah}</p>
        <h1 className="mt-2 text-4xl font-semibold">{nama}</h1>
        <p className="mt-3 text-gray-600">Rating {rating.toFixed(1)} · {gambar ? 'Gambar tersedia' : 'Tanpa gambar'}</p>
      </div>
    </section>
  )
}
