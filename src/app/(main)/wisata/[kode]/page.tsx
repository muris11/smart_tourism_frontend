import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ kode: string }>
}

const wisataDetailMap: Record<
  string,
  {
    title: string
    region: string
    mood: string
    image: string
    intro: string
    story: string[]
    notes: string[]
    tags: string[]
  }
> = {
  'bali-nusa': {
    title: 'Bali & Nusa Tenggara',
    region: 'Bentang Laut dan Tebing',
    mood: 'Pesisir terbuka',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000',
    intro: 'Wilayah yang bekerja lewat garis tebing, horizon panjang, dan ruang terbuka yang terasa lapang bahkan sebelum orang benar-benar berjalan jauh.',
    story: [
      'Di tempat seperti ini, kesan pertama datang dari skala. Tebing, angin, garis air, dan langit bekerja bersama membentuk rasa ruang yang jauh lebih besar dari layar atau foto dokumentasi.',
      'Karena itu, penyajiannya dibuat seperti catatan perjalanan, bukan sekadar kartu informasi. Fokusnya ada pada bagaimana sebuah tempat dinikmati, kapan waktu terbaik untuk datang, dan seperti apa ritme kunjungan yang terasa pas.',
      'Wisata yang baik bukan hanya yang terlihat indah. Ia juga memberi jeda, rasa tenang, dan cukup konteks agar orang paham mengapa tempat itu layak diingat lebih lama.',
    ],
    notes: [
      'Datang pagi untuk cahaya yang lebih bersih dan suhu yang lebih ringan.',
      'Sediakan waktu lebih dari kunjungan singkat jika ingin menikmati lanskap dengan utuh.',
      'Gunakan alas kaki yang nyaman untuk lokasi dengan medan tidak rata.',
    ],
    tags: ['Lanskap luas', 'Cocok pagi', 'Ritme tenang'],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kode } = await params
  const detail = wisataDetailMap[kode]
  return {
    title: detail?.title ?? kode.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: detail?.intro ?? 'Halaman detail wisata dengan pendekatan editorial dan ritme baca yang lebih refined.',
  }
}

export default async function WisataDetailPage({ params }: Props) {
  const { kode } = await params
  const detail = wisataDetailMap[kode] ?? {
    title: kode.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    region: 'Destinasi Alam',
    mood: 'Eksplorasi pelan',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000',
    intro: 'Destinasi yang dibaca sebagai pengalaman ruang, bukan hanya titik singgah cepat.',
    story: [
      'Halaman ini disusun untuk menjaga rasa tenang saat membaca detail sebuah tempat.',
      'Alih-alih menumpuk informasi, isinya dipecah menjadi blok yang memberi konteks, suasana, dan arah kunjungan.',
      'Tujuannya sederhana: membuat pengalaman membaca terasa seimbang dengan karakter tempat yang ditampilkan.',
    ],
    notes: [
      'Datang di waktu yang lebih lengang untuk pengalaman yang lebih tenang.',
      'Gunakan ritme kunjungan yang tidak terburu-buru.',
      'Lihat tempat ini sebagai pengalaman, bukan sekadar checklist.',
    ],
    tags: ['Ruang terbuka', 'Cahaya alami', 'Pemandangan tenang'],
  }

  return (
    <div className="animate-fade-in bg-white pb-24">
      <section className="relative flex h-[68vh] items-end px-6 pb-16 md:h-[84vh] md:px-12">
        <div className="absolute inset-0 bg-brand-navy">
          <img src={detail.image} className="h-full w-full object-cover opacity-72 transition-transform duration-[12s] ease-out hover:scale-105" alt={detail.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/55 to-transparent"></div>
        </div>

        <div className="animate-slide-up relative z-10 mx-auto w-full max-w-7xl">
          <Link href="/wisata" className="mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/72 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white">
            ← Kembali ke Penjelajahan
          </Link>
          <div className="mb-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">{detail.region}</span>
            <span className="rounded-full border border-white/20 bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">{detail.mood}</span>
          </div>
          <h1 className="mb-6 max-w-4xl text-5xl leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[5.5rem]">{detail.title}</h1>
          <p className="max-w-2xl text-lg font-light leading-8 text-white/82 md:text-xl">{detail.intro}</p>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-12 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Catatan Lanskap</p>
          <h2 className="mb-6 text-3xl leading-tight text-brand-navy md:text-4xl">Pemandangan yang bekerja lewat skala dan keheningan.</h2>
          <div className="space-y-5 text-base leading-8 font-light text-slate-600">
            {detail.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1555505019-8c3f1c4aba5f?auto=format&fit=crop&q=80&w=900" className="h-72 w-full rounded-[2rem] object-cover shadow-sm" alt="Pemandangan atas" />
            <img src="https://images.unsplash.com/photo-1505993597083-3ae198751c11?auto=format&fit=crop&q=80&w=900" className="h-72 w-full rounded-[2rem] object-cover shadow-sm" alt="Pesisir dan garis pantai" />
          </div>
        </article>

        <aside className="space-y-8 lg:pt-2">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <h3 className="mb-5 text-2xl text-brand-navy">Panduan Kunjungan</h3>
            <ul className="space-y-5 text-sm leading-7 text-slate-600">
              {detail.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Nuansa Tempat</p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
              {detail.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 px-4 py-2">{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
