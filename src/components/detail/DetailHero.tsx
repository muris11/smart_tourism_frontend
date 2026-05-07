interface Props {
  nama: string
  gambar: string | null
  rating: number
  wilayah: string
}

export default function DetailHero({ nama, gambar, rating, wilayah }: Props) {
  return (
    <section className="relative px-4 pt-28 pb-10 md:px-6">
      <div className="relative mx-auto min-h-[420px] w-full max-w-[1400px] overflow-hidden rounded-[2rem] bg-brand-navy md:rounded-[3rem]">
        <img src={gambar ?? 'https://images.unsplash.com/photo-1512100256350-13f5188812c3?auto=format&fit=crop&q=80&w=1800'} alt={nama} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
        <div className="relative z-10 flex min-h-[420px] flex-col justify-end px-8 pb-12 md:px-16">
          <p className="eyebrow mb-3 text-green-200">{wilayah}</p>
          <h1 className="max-w-3xl text-4xl leading-tight text-white md:text-6xl">{nama}</h1>
          <p className="mt-4 text-lg font-light text-white/75">Rating {rating.toFixed(1)} · {gambar ? 'Galeri visual tersedia' : 'Visual placeholder editorial'}</p>
        </div>
      </div>
    </section>
  )
}
