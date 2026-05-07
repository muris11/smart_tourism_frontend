import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ kode: string }>
}

const kulinerDetailMap: Record<
  string,
  {
    title: string
    category: string
    image: string
    intro: string
    story: string[]
    traits: string[]
    tasting: string[]
  }
> = {
  rendang: {
    title: 'Rendang Daging Minang',
    category: 'Warisan Dapur Nusantara',
    image: 'https://images.unsplash.com/photo-1574315042823-3563458b68aa?auto=format&fit=crop&q=80&w=1400',
    intro: 'Hidangan yang kekuatannya datang dari waktu, lapisan rempah, dan kesabaran dalam proses memasak.',
    story: [
      'Hidangan seperti ini tidak bekerja lewat kejutan instan. Yang terasa pertama justru kedalaman rasa yang datang bertahap, lalu tinggal lebih lama setelah suapan terakhir.',
      'Dalam konteks pengalaman pengguna, halaman ini diperlakukan seperti esai pendek tentang rasa. Fokusnya bukan semata daftar informasi, tetapi bagaimana sebuah makanan dibaca sebagai budaya yang hidup.',
      'Karena itu, penyajiannya dijaga tetap tenang: ritme baca lega, kontras lembut, dan blok pendukung yang membantu tanpa mengganggu alur utama.',
    ],
    traits: ['Rempah berlapis', 'Aroma tinggal lama', 'Tekstur matang penuh'],
    tasting: [
      'Cari rumah makan yang memasak dalam batch kecil untuk rasa lebih stabil.',
      'Lebih baik dinikmati perlahan daripada sebagai menu yang terburu-buru.',
      'Cocok diposisikan sebagai highlight utama dalam satu sesi makan.',
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kode } = await params
  const detail = kulinerDetailMap[kode]
  return {
    title: detail?.title ?? kode.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: detail?.intro ?? 'Halaman detail kuliner dengan komposisi yang lebih tenang dan rasa yang lebih premium.',
  }
}

export default async function KulinerDetailPage({ params }: Props) {
  const { kode } = await params
  const detail = kulinerDetailMap[kode] ?? {
    title: kode.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    category: 'Catatan Rasa',
    image: 'https://images.unsplash.com/photo-1574315042823-3563458b68aa?auto=format&fit=crop&q=80&w=1400',
    intro: 'Makanan yang dibaca sebagai rasa, proses, dan konteks budaya, bukan hanya daftar menu.',
    story: [
      'Halaman ini disusun agar pengalaman membaca terasa tenang dan fokus pada karakter hidangan.',
      'Alih-alih terasa seperti katalog cepat, detail di sini mencoba memberi lapisan konteks yang lebih manusiawi.',
      'Tujuannya sederhana: membuat pembaca mengerti mengapa sebuah hidangan pantas diingat, bukan hanya dicoba sekali.',
    ],
    traits: ['Rasa dalam', 'Porsi konteks', 'Aroma kuat'],
    tasting: ['Datang saat jam makan belum terlalu padat.', 'Pilih tempat yang fokus pada kualitas rasa, bukan hanya variasi menu.', 'Nikmati sebagai bagian utama, bukan pelengkap.'],
  }

  return (
    <div className="min-h-screen bg-[#FCFCFB] pt-24 pb-24 animate-fade-in md:pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/kuliner" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-navy">
          ← Indeks Cita Rasa
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <span className="mb-6 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500">
              {detail.category}
            </span>
            <h1 className="mb-6 max-w-4xl text-5xl leading-tight text-brand-navy md:text-6xl">{detail.title}</h1>
            <p className="max-w-2xl text-lg font-light leading-8 text-slate-600 md:text-xl">{detail.intro}</p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-brand-pale p-8 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Karakter Hidangan</p>
            <ul className="space-y-3 text-sm leading-7 text-slate-700">
              {detail.traits.map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
          <img src={detail.image} alt={detail.title} className="h-[420px] w-full object-cover md:h-[560px]" />
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cerita Rasa</p>
            <h2 className="mb-6 text-3xl leading-tight text-brand-navy">Dimasak perlahan, dibaca perlahan.</h2>
            <div className="space-y-5 text-base leading-8 font-light text-slate-600">
              {detail.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-5 text-2xl text-brand-navy">Cara Menikmati</h3>
              <ul className="space-y-4 text-sm leading-7 text-slate-600">
                {detail.tasting.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Rasa yang dicari</p>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
                <span className="rounded-full border border-slate-200 px-4 py-2">Dalam</span>
                <span className="rounded-full border border-slate-200 px-4 py-2">Hangat</span>
                <span className="rounded-full border border-slate-200 px-4 py-2">Berlapis</span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
