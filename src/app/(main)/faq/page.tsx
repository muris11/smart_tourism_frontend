import type { Metadata } from 'next'
import { ChevronDown, MessageSquare, Compass, Utensils, Coffee, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'FAQ - Pertanyaan Umum | CITRA',
  description: 'Temukan jawaban atas berbagai pertanyaan umum seputar penggunaan platform CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant).',
}

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
    a: 'CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant) adalah platform wisata cerdas berbasis AI yang dirancang untuk mempromosikan dan memudahkan penjelajahan potensi pariwisata di wilayah Ciayumajakuning (Kota & Kabupaten Cirebon, Indramayu, Majalengka, dan Kuningan). Kami menyediakan rekomendasi destinasi wisata, kuliner legendaris, tempat nongkrong hits, serta asisten AI interaktif dan perencana perjalanan otomatis.',
  },
  {
    category: 'Umum',
    q: 'Apakah platform CITRA gratis untuk digunakan?',
    a: 'Ya, CITRA sepenuhnya gratis untuk digunakan oleh siapa saja. Anda dapat mengakses informasi destinasi, menggunakan fitur pencarian pintar, membuat rencana perjalanan, dan berkonsultasi dengan asisten AI kami tanpa dikenakan biaya apapun.',
  },
  {
    category: 'Umum',
    q: 'Bagaimana asisten AI CITRA membantu perjalanan saya?',
    a: 'Asisten chatbot AI kami dilatih khusus dengan informasi detail seputar Ciayumajakuning. Anda dapat menanyakan rekomendasi tempat wisata alam terdekat, kuliner bebas gluten, tempat nongkrong dengan colokan listrik, hingga estimasi budget dan rute terbaik secara real-time.',
  },
  {
    category: 'Umum',
    q: 'Bagaimana cara mencari tempat tertentu dengan cepat?',
    a: 'Anda bisa membuka halaman "Cari" (ikon kaca pembesar di navbar). Di sana, Anda dapat mengetikkan kata kunci dan memfilter hasil berdasarkan Kategori (Wisata, Kuliner, Nongkrong), Kabupaten/Kota (Cirebon, Indramayu, Majalengka, Kuningan), serta mengurutkan berdasarkan rating, ulasan terbanyak, atau ulasan terbaru.',
  },
  {
    category: 'Wisata',
    q: 'Apa saja jenis wisata yang terdaftar di CITRA?',
    a: 'Kami mencakup destinasi yang sangat beragam: Wisata Sejarah & Budaya (seperti Keraton Kasepuhan Cirebon), Wisata Alam & Pegunungan (Gunung Ciremai, Curug Muara Jaya Majalengka), Wisata Pantai (Pantai Karangsong Indramayu), Wisata Religi (Masjid Agung Sang Cipta Rasa), hingga wisata rekreasi modern dan edukasi keluarga.',
  },
  {
    category: 'Wisata',
    q: 'Apakah CITRA menyediakan informasi harga tiket masuk?',
    a: 'Kami menampilkan estimasi harga tiket masuk (HTM) terkini pada detail destinasi. Namun, harap diingat bahwa pengelola dapat mengubah harga tiket sewaktu-waktu tanpa pemberitahuan sebelumnya, terutama saat hari libur nasional atau akhir pekan.',
  },
  {
    category: 'Wisata',
    q: 'Bagaimana cara mendapatkan petunjuk arah ke lokasi wisata?',
    a: 'Setiap halaman detail wisata dilengkapi dengan peta interaktif terintegrasi. Anda dapat mengklik tombol "Buka di Google Maps" untuk langsung diarahkan ke aplikasi navigasi di perangkat Anda guna mendapatkan rute berkendara tercepat.',
  },
  {
    category: 'Kuliner',
    q: 'Apa saja kuliner legendaris Ciayumajakuning yang wajib dicoba?',
    a: 'Di Cirebon, Anda wajib mencoba Empal Gentong, Nasi Jamblang, Mie Koclok, dan Docang. Di Indramayu, cobalah Nasi Lengko khas pesisir dan Pedesan Entog. Di Kuningan, nikmati Nasi Kasreng dan Hucap. Sedangkan di Majalengka, Anda bisa mencicipi Jalakotek dan masakan berbahan Kecap Majalengka yang legendaris.',
  },
  {
    category: 'Kuliner',
    q: 'Bagaimana CITRA mengelompokkan jenis kuliner?',
    a: 'Kami membagi kuliner menjadi hidangan utama tradisional (makanan berat khas daerah), jajanan/cemilan pasar tradisional, minuman khas, dan kuliner modern. Anda bisa memfilternya dengan mudah di halaman pencarian kuliner.',
  },
  {
    category: 'Nongkrong',
    q: 'Apakah semua tempat nongkrong yang terdaftar memiliki akses Wi-Fi?',
    a: 'Sebagian besar cafe, coffee shop, dan coworking space modern yang terdaftar di CITRA menyediakan fasilitas Wi-Fi gratis dan colokan listrik. Informasi ketersediaan fasilitas ini dapat Anda lihat pada bagian spesifikasi/fasilitas di halaman detail tempat nongkrong.',
  },
  {
    category: 'Nongkrong',
    q: 'Di mana saya bisa menemukan cafe dengan pemandangan alam terbaik?',
    a: 'Untuk cafe dengan pemandangan alam (mountain view atau sawah), Kabupaten Kuningan dan Majalengka adalah pilihan terbaik. Anda dapat memfilter kategori "Nongkrong" dengan wilayah "Kuningan" atau "Majalengka" untuk menemukan tempat nongkrong estetik di lereng Gunung Ciremai.',
  },
  {
    category: 'Akun',
    q: 'Apa keuntungan mendaftar akun di CITRA?',
    a: 'Dengan mendaftar akun, Anda dapat menyimpan destinasi favorit Anda ke daftar keinginan (Wishlist), memberikan rating dan ulasan tertulis pada tempat yang Anda kunjungi, serta menggunakan fitur "Rencana Perjalanan" (Itinerary Planner) untuk menyusun jadwal liburan Anda sendiri.',
  },
  {
    category: 'Akun',
    q: 'Bagaimana cara kerja fitur Rencana Perjalanan?',
    a: 'Masuk ke akun Anda, lalu akses halaman "Rencana". Di sana, Anda dapat menentukan tanggal perjalanan, memilih destinasi wisata, kuliner, dan tempat nongkrong yang ingin dikunjungi, lalu AI kami akan membantu merekomendasikan urutan kunjungan yang paling efisien berdasarkan lokasi geografis.',
  },
  {
    category: 'Akun',
    q: 'Bagaimana cara menghapus akun saya jika sudah tidak digunakan?',
    a: 'Anda dapat menghapus akun Anda secara permanen dengan masuk ke halaman "Profil", klik "Pengaturan Akun", lalu pilih "Hapus Akun". Seluruh data pribadi, ulasan, dan rencana perjalanan Anda akan dihapus secara permanen dari sistem kami demi menjaga privasi Anda.',
  },
]

const iconMap = {
  Umum: MessageSquare,
  Wisata: Compass,
  Kuliner: Utensils,
  Nongkrong: Coffee,
  Akun: User,
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-citra-canvas pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-citra-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-citra-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-citra-primary/10 text-xs font-semibold uppercase tracking-wider text-citra-primary">
            Pusat Bantuan & Edukasi
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-citra-ink md:text-5xl lg:text-6xl">
            Ada yang Bisa <span className="text-transparent bg-clip-text bg-gradient-to-r from-citra-primary to-citra-accent">Kami Bantu?</span>
          </h1>
          <p className="mt-4 text-lg text-citra-muted max-w-2xl mx-auto">
            Temukan jawaban cepat dari daftar pertanyaan yang paling sering diajukan oleh pengguna platform CITRA.
          </p>
        </div>

        {/* Quick Category Navigation */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat]
            return (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-full border border-citra-border bg-citra-surface px-5 py-2.5 text-sm font-semibold text-citra-body shadow-hairline transition-all duration-300 hover:-translate-y-0.5 hover:border-citra-primary hover:text-citra-primary hover:shadow-card"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {cat}
              </a>
            )
          })}
        </div>

        {/* FAQ Accordions by Category */}
        <div className="mx-auto mt-16 max-w-3xl space-y-12">
          {categories.map((category) => {
            const items = faqs.filter((f) => f.category === category)
            const Icon = iconMap[category]
            return (
              <div key={category} id={category.toLowerCase()} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-citra-border/60">
                  {Icon && <Icon className="h-5 w-5 text-citra-primary" />}
                  <h2 className="font-display text-2xl font-bold text-citra-ink tracking-tight">{category}</h2>
                  <span className="ml-auto text-xs bg-citra-surface border border-citra-border px-2.5 py-1 rounded-full text-citra-muted font-medium">
                    {items.length} Pertanyaan
                  </span>
                </div>
                <div className="space-y-4">
                  {items.map((faq) => (
                    <details
                      key={faq.q}
                      className="group border border-citra-border/60 bg-citra-surface rounded-2xl overflow-hidden transition-all duration-300 hover:border-citra-primary/40 hover:shadow-card [&::-webkit-details-marker]:hidden open:border-citra-primary open:shadow-card"
                    >
                      <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-base font-bold text-citra-ink transition-colors hover:bg-citra-surface-soft [&::-webkit-details-marker]:hidden list-none">
                        <span className="pr-4">{faq.q}</span>
                        <div className="p-1.5 rounded-lg bg-citra-surface-soft border border-citra-border/40 group-hover:border-citra-primary/20 group-open:bg-citra-primary-soft group-open:border-citra-primary/20 transition-all duration-300">
                          <ChevronDown className="h-4 w-4 shrink-0 text-citra-muted group-hover:text-citra-ink group-open:text-citra-primary transition-transform duration-300 group-open:rotate-180" />
                        </div>
                      </summary>
                      <div className="px-6 pb-6 pt-1 border-t border-citra-border/30">
                        <p className="text-sm leading-relaxed text-citra-body text-justify">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact CTA card */}
        <div className="mx-auto mt-20 max-w-2xl rounded-3xl bg-gradient-to-br from-citra-surface to-citra-surface-soft border border-citra-border/80 p-8 md:p-12 text-center shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-citra-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-citra-accent/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="font-display text-2xl font-extrabold text-citra-ink tracking-tight">Belum menemukan jawaban Anda?</h3>
          <p className="mt-3 text-sm text-citra-muted max-w-md mx-auto">
            Jangan khawatir! Tim layanan pelanggan kami siap membantu menyelesaikan kendala atau pertanyaan Anda mengenai Ciayumajakuning.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/kontak" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-8 font-semibold shadow-md shadow-citra-primary/20 hover:shadow-lg hover:shadow-citra-primary/30 transition-all">
                Hubungi Kami
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto font-semibold">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
