import type { Metadata } from 'next'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = { title: 'FAQ' }

const categories = ['Umum', 'Wisata', 'Kuliner', 'Nongkrong', 'Akun'] as const

interface FAQItem {
  q: string
  a: string
  category: (typeof categories)[number]
}

const faqs: FAQItem[] = [
  {
    category: 'Umum',
    q: 'Apa itu CITRA?',
    a: 'CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant) adalah platform wisata cerdas yang membantu Anda menjelajahi potensi pariwisata di Cirebon, Indramayu, Majalengka, dan Kuningan. Kami menyediakan informasi destinasi, rekomendasi kuliner, tempat nongkrong, dan fitur rencana perjalanan.',
  },
  {
    category: 'Umum',
    q: 'Apakah CITRA gratis digunakan?',
    a: 'Ya, CITRA sepenuhnya gratis untuk digunakan. Anda dapat menjelajahi semua fitur tanpa biaya, termasuk mencari destinasi, melihat rekomendasi, dan menyusun rencana perjalanan.',
  },
  {
    category: 'Umum',
    q: 'Bagaimana cara mencari destinasi di CITRA?',
    a: 'Anda dapat menggunakan fitur pencarian di halaman Cari. Cukup ketik nama tempat atau kata kunci, lalu filter berdasarkan tipe (wisata, kuliner, nongkrong) atau wilayah (Cirebon, Indramayu, Majalengka, Kuningan) untuk menemukan yang Anda cari.',
  },
  {
    category: 'Wisata',
    q: 'Apa saja jenis wisata yang tersedia di CITRA?',
    a: 'CITRA mencakup berbagai jenis wisata di Ciayumajakuning, mulai dari wisata alam (pantai, gunung, curug), wisata budaya (keraton, museum), wisata religi (masjid agung, gua maria), hingga wisata edukasi dan buatan.',
  },
  {
    category: 'Wisata',
    q: 'Bagaimana cara mengetahui rute menuju destinasi wisata?',
    a: 'Setiap halaman detail destinasi dilengkapi dengan alamat lengkap dan integrasi peta yang dapat membantu Anda merencanakan rute perjalanan menuju lokasi.',
  },
  {
    category: 'Kuliner',
    q: 'Apa saja kuliner khas yang direkomendasikan?',
    a: 'Kami merekomendasikan berbagai kuliner khas seperti Empal Gentong, Nasi Jamblang, Tahu Gejrot, dan Mie Koclok dari Cirebon; Ikan Bakar dari Indramayu; Sate Kalong dari Kuningan; serta berbagai hidangan khas Majalengka.',
  },
  {
    category: 'Kuliner',
    q: 'Apakah informasi harga dan jam buka kuliner akurat?',
    a: 'Kami berusaha menyajikan informasi harga dan jam operasional yang akurat berdasarkan data terkini. Namun, disarankan untuk menghubungi tempat kuliner langsung untuk konfirmasi sebelum berkunjung.',
  },
  {
    category: 'Nongkrong',
    q: 'Tempat nongkrong apa yang cocok untuk bekerja?',
    a: 'Beberapa tempat di Ciayumajakuning menyediakan suasana nyaman untuk bekerja, seperti Ruang Ngopi Jatiwangi di Majalengka yang dilengkapi Wi-Fi kencang, atau Atap Batik Coffee & Space di Cirebon dengan nuansa rooftop yang inspiratif.',
  },
  {
    category: 'Akun',
    q: 'Bagaimana cara menyimpan rencana perjalanan?',
    a: 'Setelah membuat akun dan masuk, Anda dapat menggunakan fitur Rencana Perjalanan untuk menyusun dan menyimpan itinerary. Cukup pilih destinasi yang ingin dikunjungi, atur jadwal, dan simpan untuk dilihat kapan saja.',
  },
  {
    category: 'Akun',
    q: 'Apakah bisa memberikan ulasan tentang tempat yang dikunjungi?',
    a: 'Tentu! Setelah mengunjungi suatu tempat, Anda dapat memberikan ulasan dan rating melalui halaman detail tempat tersebut. Ulasan Anda akan membantu wisatawan lain dalam memilih destinasi.',
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen animate-fade-in pt-28 pb-24">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Pusat Bantuan</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-citra-ink md:text-5xl">Pertanyaan Umum</h1>
          <p className="mt-4 text-citra-muted">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang CITRA
          </p>
        </div>

        <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase()}`}
              className="rounded-full border border-citra-border bg-citra-surface px-4 py-2 text-sm font-medium text-citra-body shadow-hairline transition-all hover:border-citra-primary hover:text-citra-primary"
            >
              {cat}
            </a>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {categories.map((category) => {
            const items = faqs.filter((f) => f.category === category)
            return (
              <div key={category} id={category.toLowerCase()} className="mb-8">
                <h2 className="mb-4 font-display text-xl font-bold text-citra-ink">{category}</h2>
                <div className="divide-y divide-citra-border overflow-hidden rounded-lg bg-citra-surface shadow-card">
                  {items.map((faq) => (
                    <details key={faq.q} className="group">
                      <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-medium text-citra-ink transition-colors hover:bg-citra-surface-soft [&::-webkit-details-marker]:hidden">
                        {faq.q}
                        <ChevronDown className="h-4 w-4 shrink-0 text-citra-muted transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="px-6 pb-5">
                        <p className="text-sm leading-relaxed text-citra-body">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mx-auto mt-16 max-w-lg rounded-lg bg-citra-surface-soft p-8 text-center shadow-card">
          <h3 className="font-display text-xl font-bold text-citra-ink">Masih punya pertanyaan?</h3>
          <p className="mt-2 text-sm text-citra-muted">Tim kami siap membantu menjawab pertanyaan Anda</p>
          <Link href="/kontak">
            <Button className="mt-5">Hubungi Kami</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
