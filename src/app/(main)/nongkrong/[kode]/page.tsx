import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ kode: string }>
}

const detailMap: Record<
  string,
  {
    title: string
    city: string
    image: string
    intro: string
    story: string
    atmosphere: string
    tips: string[]
  }
> = {
  'ruang-senja-bandung': {
    title: 'Ruang Senja Bandung',
    city: 'Bandung',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1400',
    intro:
      'Ruang yang tenang, terang, dan tidak berlebihan. Cocok untuk sore yang lambat, percakapan kecil, atau beberapa jam bekerja tanpa terganggu ritme kota.',
    story:
      'Ruang Senja Bandung dibayangkan sebagai tempat singgah yang tidak memaksa perhatian. Meja kayu sederhana, pencahayaan alami, dan komposisi ruang yang longgar membuat orang betah tinggal lebih lama. Bukan tipe tempat yang ramai oleh dekorasi, melainkan tempat yang menang lewat rasa tenang dan proporsi yang pas.',
    atmosphere:
      'Suasana hangat, ritme pelan, dan cukup sunyi untuk membaca atau menulis. Tempat seperti ini biasanya dicari bukan karena viral, tapi karena terasa nyaman dipakai kembali.',
    tips: [
      'Datang sebelum jam sibuk sore untuk mendapat tempat dekat cahaya alami.',
      'Pilih meja sudut untuk bekerja ringan atau membaca lebih lama.',
      'Cocok untuk pertemuan kecil, bukan kelompok besar yang ramai.',
    ],
  },
  'kopi-lokal-jakarta': {
    title: 'Kopi Lokal Jakarta',
    city: 'Jakarta Selatan',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1400',
    intro:
      'Tempat yang terasa akrab sejak pertama masuk. Cocok untuk rapat santai, menyusun ide, atau sekadar duduk lebih lama dari yang direncanakan.',
    story:
      'Kopi Lokal Jakarta mewakili tipologi kedai yang sederhana tapi matang: kursi nyaman, jarak antar meja cukup lega, dan pencahayaan yang tidak terlalu keras. Nilainya ada pada konsistensi suasana dan rasa ruang yang stabil.',
    atmosphere:
      'Hangat, fungsional, dan cukup hidup tanpa berubah menjadi bising. Tempat seperti ini baik untuk transisi dari kerja ke waktu pribadi.',
    tips: [
      'Datang pagi untuk suasana paling tenang.',
      'Jika ingin berbincang lama, pilih area dalam yang lebih stabil suaranya.',
      'Cocok untuk kerja laptop singkat dan pertemuan informal.',
    ],
  },
  'teras-cerita-yogyakarta': {
    title: 'Teras Cerita Yogyakarta',
    city: 'Yogyakarta',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1400',
    intro:
      'Teras yang terasa akrab dan tidak dibuat-buat. Tempat ini bekerja baik untuk ngobrol, menunggu sore turun, atau menghabiskan waktu tanpa agenda khusus.',
    story:
      'Teras Cerita Yogyakarta menonjol lewat skala yang terasa manusiawi. Tidak terlalu padat, tidak terlalu penuh gimmick. Fokusnya ada pada rasa santai yang alami, dengan ruang yang cukup terbuka namun tetap memberi rasa teduh.',
    atmosphere:
      'Santai, sosial, dan lebih cair. Tempat seperti ini cocok untuk orang yang mencari suasana kota yang lembut tanpa kehilangan karakter lokal.',
    tips: [
      'Datang menjelang sore untuk suasana paling enak.',
      'Bagian teras depan biasanya lebih hidup untuk berbincang.',
      'Bagian dalam lebih cocok jika ingin tinggal sedikit lebih lama.',
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kode } = await params
  const detail = detailMap[kode]

  return {
    title: detail?.title ?? kode.replace(/-/g, ' '),
    description:
      detail?.intro ?? 'Halaman detail tempat nongkrong dengan pendekatan editorial dan suasana yang lebih natural.',
  }
}

export default async function NongkrongDetailPage({ params }: Props) {
  const { kode } = await params
  const detail = detailMap[kode] ?? {
    title: kode.replace(/-/g, ' '),
    city: 'Pilihan Kota',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1400',
    intro:
      'Ruang singgah yang diarahkan untuk suasana tenang, percakapan yang utuh, dan waktu yang tidak terasa tergesa-gesa.',
    story:
      'Halaman ini belum terhubung penuh ke data backend, tetapi tetap disusun agar memiliki kualitas visual dan ritme baca yang terasa utuh.',
    atmosphere:
      'Hangat, tenang, dan cukup fleksibel untuk bekerja ringan atau bertemu santai.',
    tips: [
      'Datang di luar jam sibuk untuk suasana terbaik.',
      'Pilih sudut yang paling sesuai dengan kebutuhanmu.',
      'Gunakan halaman ini sebagai referensi rasa ruang, bukan hanya lokasi.',
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 animate-fade-in md:pt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <Link
          href="/nongkrong"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-brand-navy"
        >
          ← Kembali ke daftar ruang sosial
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              {detail.city}
            </p>
            <h1 className="max-w-3xl text-5xl leading-tight text-brand-navy md:text-6xl">
              {detail.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 font-light text-slate-600">
              {detail.intro}
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Karakter Tempat
            </p>
            <p className="text-sm leading-7 font-light text-slate-700">{detail.atmosphere}</p>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
          <img
            src={detail.image}
            alt={detail.title}
            className="h-[420px] w-full object-cover md:h-[560px]"
          />
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Catatan Editorial
            </p>
            <h2 className="mb-6 text-3xl leading-tight text-brand-navy">
              Tempat yang menang lewat suasana, bukan kebisingan.
            </h2>
            <div className="space-y-5 text-base leading-8 font-light text-slate-600">
              <p>{detail.story}</p>
              <p>
                Dalam konteks halaman nongkrong, yang paling penting bukan hanya apa yang dijual, tetapi bagaimana ruang itu dipakai. Tempat yang baik memberi jeda, membuat percakapan lebih mudah, dan tidak melelahkan mata atau kepala.
              </p>
              <p>
                Karena itu, halaman ini disusun seperti catatan suasana: fokus pada rasa ruang, ritme, dan karakter penggunaan, bukan sekadar daftar fasilitas.
              </p>
            </div>
          </article>

          <aside className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-brand-pale p-8 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Tips Singkat
              </p>
              <ul className="space-y-3 text-sm leading-7 text-slate-700">
                {detail.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Cocok Untuk
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
                <span className="rounded-full border border-slate-200 px-4 py-2">Ngobrol santai</span>
                <span className="rounded-full border border-slate-200 px-4 py-2">Kerja ringan</span>
                <span className="rounded-full border border-slate-200 px-4 py-2">Menunggu sore</span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
