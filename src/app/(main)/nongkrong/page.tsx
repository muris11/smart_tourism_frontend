'use client'

import Link from 'next/link'

const spaces = [
  {
    slug: 'kopi-lokal-jakarta',
    title: 'Kopi Lokal Jakarta',
    place: 'Jakarta Selatan',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=900',
    description:
      'Kedai hangat dengan ritme pelan, meja kayu panjang, dan cahaya sore yang cocok untuk berbincang lama.',
  },
  {
    slug: 'ruang-senja-bandung',
    title: 'Ruang Senja Bandung',
    place: 'Bandung',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=900',
    description:
      'Ruang santai untuk membaca, menulis, dan menikmati kopi dengan suasana yang tidak tergesa-gesa.',
  },
  {
    slug: 'teras-cerita-yogyakarta',
    title: 'Teras Cerita Yogyakarta',
    place: 'Yogyakarta',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=900',
    description:
      'Sudut kota yang terasa akrab, tenang, dan cocok untuk pertemuan kecil tanpa kehilangan suasana lokal.',
  },
]

export default function NongkrongPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 animate-fade-in">
      <section className="container mb-20 px-6 text-center md:px-12">
        <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
          Ruang Sosial
        </span>
        <h1 className="mx-auto mb-8 max-w-4xl text-5xl leading-tight text-brand-navy md:text-6xl">
          Jeda, cerita, dan ritme yang lebih pelan.
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-slate-600 md:text-xl">
          Bukan sekadar tempat duduk dan kopi. Halaman ini mengumpulkan ruang yang nyaman untuk singgah, bekerja ringan, bertemu teman, atau menikmati waktu tanpa terburu-buru.
        </p>
      </section>

      <section className="container px-6 md:px-12">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-navy">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600"
              alt="Ruang sosial dan tempat nongkrong"
              className="h-full min-h-[420px] w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/25 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-8 md:p-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Pilihan Editor</p>
              <h2 className="max-w-xl text-4xl leading-tight text-white md:text-5xl">
                Tempat yang membuat percakapan terasa lebih utuh.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 font-light text-white/78 md:text-base">
                Dari kedai kopi independen sampai ruang kreatif yang tenang, pilihannya diarahkan untuk suasana yang lebih alami dan tidak terasa generik.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Apa yang dicari</p>
              <ul className="space-y-3 text-sm leading-7 text-slate-600">
                <li>Tempat dengan suasana hangat dan tidak bising</li>
                <li>Kopi yang baik, cahaya alami, dan ruang yang nyaman</li>
                <li>Sudut kota yang cocok untuk berbincang atau bekerja ringan</li>
              </ul>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-brand-pale p-8 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Arah eksplorasi</p>
              <p className="text-sm leading-7 font-light text-slate-700">
                Pilih tempat berdasarkan rasa ruang, bukan hanya menu. Fokus pada tempat yang terasa hidup, wajar, dan enak dipakai berlama-lama.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {spaces.map((space, index) => (
            <Link key={space.slug} href={`/nongkrong/${space.slug}`} className={`group block ${index === 1 ? 'md:mt-10' : ''} ${index === 2 ? 'md:mt-20' : ''}`}>
              <div className="mb-6 overflow-hidden rounded-[2.5rem] bg-slate-100">
                <img
                  src={space.image}
                  alt={space.title}
                  className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="px-2">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">{space.place}</p>
                <h3 className="mb-3 text-3xl leading-tight text-brand-navy transition-colors group-hover:text-brand-green">
                  {space.title}
                </h3>
                <p className="mb-5 text-sm leading-7 font-light text-slate-600">{space.description}</p>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-navy transition-colors group-hover:text-brand-green">Lihat detail</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
