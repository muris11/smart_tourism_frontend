import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function FeaturedWisata() {
  const pillars = [
    {
      href: ROUTES.WISATA,
      title: 'Wisata Alam',
      label: 'Bentang Alam',
      description:
        'Menyusuri garis pantai, menembus kabut pegunungan, dan meresapi keheningan lanskap hijau.',
      image:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    },
    {
      href: ROUTES.KULINER,
      title: 'Kuliner Khas',
      label: 'Cita Rasa Lokal',
      description:
        'Warung otentik, rasa rumahan, hingga meja makan yang merawat resep warisan.',
      image:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
    },
    {
      href: ROUTES.NONGKRONG,
      title: 'Sudut Kumpul',
      label: 'Ruang Sosial',
      description:
        'Kedai kopi, ruang kreatif, dan tempat singgah yang membuat waktu terasa lebih pelan.',
      image:
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    },
  ]

  return (
    <section className="mx-auto max-w-[1400px] bg-white px-6 py-24 md:px-12">
      <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="eyebrow mb-4 block">Pilar Eksplorasi</span>
          <h2 className="section-title mb-4">Tiga cara menikmati perjalanan</h2>
          <p className="section-copy">
            Jalur utama untuk membaca destinasi: lanskap, rasa, dan ruang sosial. Semua dibangun di atas route yang sudah ada di frontend ini.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
        {pillars.map((item, index) => (
          <Link key={item.href} href={item.href} className={`group block cursor-pointer ${index === 1 ? 'md:mt-16' : ''} ${index === 2 ? 'md:mt-32' : ''}`}>
            <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-100">
              <img src={item.image} className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" alt={item.title} />
            </div>
            <div className="px-2">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-xs font-bold text-slate-600">0{index + 1}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-green">{item.label}</span>
              </div>
              <h3 className="mb-3 text-3xl tracking-tight text-brand-navy transition-colors group-hover:text-brand-green">{item.title}</h3>
              <p className="mb-6 text-sm leading-relaxed font-light text-slate-600">{item.description}</p>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-navy transition-all group-hover:gap-3">Jelajahi</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
