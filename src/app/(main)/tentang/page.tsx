import type { Metadata } from 'next'
import { Mountain, Heart, Search, Trees, Waves, Landmark, Coffee } from 'lucide-react'
import SentimentChart from '@/components/sections/tentang/SentimentChart'

export const metadata: Metadata = { title: 'Tentang' }

const regions = [
  {
    name: 'Cirebon',
    description: 'Kota Udang dengan kekayaan sejarah Kesultanan Cirebon, keraton megah, dan kuliner legendaris.',
    icon: Landmark,
  },
  {
    name: 'Indramayu',
    description: 'Pesona pantai utara Jawa dengan budidaya ikan dan mangga yang mendunia.',
    icon: Waves,
  },
  {
    name: 'Majalengka',
    description: 'Hamparan terasering hijau dan udara sejuk pegunungan di kaki Gunung Ciremai.',
    icon: Trees,
  },
  {
    name: 'Kuningan',
    description: 'Kota khatulistiwa dengan ribuan mata air, curug, dan panorama Gunung Ciremai.',
    icon: Coffee,
  },
]

const values = [
  {
    title: 'Keaslian',
    titleEn: 'Authenticity',
    description: 'Kami menghadirkan pengalaman wisata yang otentik, sesuai dengan karakter dan kearifan lokal masing-masing daerah.',
  },
  {
    title: 'Keberlanjutan',
    titleEn: 'Sustainability',
    description: 'Setiap rekomendasi yang kami berikan mempertimbangkan dampak lingkungan dan keberlanjutan pariwisata daerah.',
  },
  {
    title: 'Kebersamaan',
    titleEn: 'Community',
    description: 'Kami percaya pariwisata yang kuat dibangun atas kolaborasi antara masyarakat, pemerintah, dan pelaku usaha lokal.',
  },
]

export default function TentangPage() {
  return (
    <div className="min-h-screen animate-fade-in pt-28 pb-24">
      <section className="relative overflow-hidden bg-citra-forest py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="container-page relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-on-dark">Tentang CITRA</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Cerita di Balik CITRA
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              CITRA adalah platform wisata cerdas yang didedikasikan untuk memperkenalkan potensi luar biasa
              dari Ciayumajakuning — Cirebon, Indramayu, Majalengka, dan Kuningan. Kami hadir untuk menjadi
              teman perjalanan digital yang membantu setiap wisatawan menemukan keindahan, rasa, dan cerita
              dari setiap sudut daerah.
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Misi Kami</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-citra-ink md:text-4xl">Apa yang Kami Perjuangkan</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-citra-surface p-8 shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-citra-primary-soft">
                <Mountain className="h-7 w-7 text-citra-primary" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-citra-ink">Memperkenalkan Potensi Daerah</h3>
              <p className="mt-3 text-sm leading-relaxed text-citra-body">
                Menjembatani wisatawan dengan destinasi-destinasi unggulan dan hidden gems yang tersebar di seluruh Ciayumajakuning.
              </p>
            </div>
            <div className="rounded-lg bg-citra-surface p-8 shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-citra-primary-soft">
                <Heart className="h-7 w-7 text-citra-primary" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-citra-ink">Mendukung Pariwisata Lokal</h3>
              <p className="mt-3 text-sm leading-relaxed text-citra-body">
                Memberdayakan pelaku wisata lokal dan mendorong ekonomi kreatif melalui promosi destinasi berbasis komunitas.
              </p>
            </div>
            <div className="rounded-lg bg-citra-surface p-8 shadow-card transition-all duration-300 hover:shadow-card-hover">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-citra-primary-soft">
                <Search className="h-7 w-7 text-citra-primary" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-citra-ink">Kemudahan Akses Informasi</h3>
              <p className="mt-3 text-sm leading-relaxed text-citra-body">
                Menyediakan informasi wisata yang lengkap, akurat, dan mudah diakses kapan saja dan di mana saja.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-citra-surface-soft">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Wilayah Kami</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-citra-ink md:text-4xl">Jelajahi Empat Daerah</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {regions.map((region) => {
              const Icon = region.icon
              return (
                <div key={region.name} className="rounded-lg bg-citra-surface p-6 text-center shadow-card transition-all duration-300 hover:shadow-card-hover">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-citra-primary-soft">
                    <Icon className="h-7 w-7 text-citra-primary" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-citra-ink">{region.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-citra-body">{region.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Nilai Kami</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-citra-ink md:text-4xl">Prinsip yang Kami Pegang</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg border border-citra-border bg-citra-surface p-8 text-center">
                <h3 className="font-display text-xl font-bold text-citra-ink">{value.title}</h3>
                <p className="mt-1 text-sm font-medium text-citra-primary">{value.titleEn}</p>
                <p className="mt-4 text-sm leading-relaxed text-citra-body">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-citra-surface-soft">
        <div className="container-page">
          <SentimentChart />
        </div>
      </section>

      <section className="border-t border-citra-border bg-citra-surface-soft py-12">
        <div className="container-page text-center">
          <p className="font-editorial text-lg italic text-citra-muted">
            Sebuah inisiatif untuk Ciayumajakuning
          </p>
        </div>
      </section>
    </div>
  )
}
