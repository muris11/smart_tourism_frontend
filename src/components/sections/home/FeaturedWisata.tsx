'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin, Star } from 'lucide-react'
import { useWisata } from '@/hooks/useWisata'
import { WisataItem } from '@/types/wisata'

function getImageUrl(item: WisataItem): string | null {
  if (item.gambar && item.gambar.length > 0) {
    const first = item.gambar[0]
    if (first && !first.includes('via.placeholder.com') && !first.includes('placehold.co')) {
      return first
    }
  }
  return null
}

function getGradientByWilayah(wilayah: string): string {
  const gradients: Record<string, string> = {
    Cirebon: 'from-amber-900/80 to-amber-800/30',
    Indramayu: 'from-cyan-900/80 to-cyan-800/30',
    Majalengka: 'from-emerald-900/80 to-emerald-800/30',
    Kuningan: 'from-violet-900/80 to-violet-800/30',
  }
  return gradients[wilayah] || 'from-stone-900/70 to-stone-800/40'
}

function getAccentByWilayah(wilayah: string): string {
  const accents: Record<string, string> = {
    Cirebon: 'text-amber-700',
    Indramayu: 'text-cyan-700',
    Majalengka: 'text-emerald-700',
    Kuningan: 'text-violet-700',
  }
  return accents[wilayah] || 'text-citra-primary'
}

export default function FeaturedWisata() {
  const { data: wisataList, isLoading, error } = useWisata({
    per_page: 20
  })

  if (isLoading) {
    return (
      <section className="bg-citra-canvas-alt py-20 md:py-28">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative overflow-hidden rounded-3xl bg-white shadow-card">
                <div className="aspect-[16/10] skeleton-shimmer bg-slate-200" />
                <div className="space-y-3 p-6">
                  <div className="h-5 w-24 rounded-full bg-slate-200" />
                  <div className="h-7 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-citra-canvas-alt py-20 md:py-28">
        <div className="container-page text-center">
          <p className="text-red-500">Gagal memuat data wisata</p>
        </div>
      </section>
    )
  }

  if (!wisataList || wisataList.length === 0) {
    return (
      <section className="bg-citra-canvas-alt py-20 md:py-28">
        <div className="container-page text-center">
          <p className="text-slate-500">Belum ada data wisata</p>
        </div>
      </section>
    )
  }

  const getVariedWisata = (): WisataItem[] => {
    const wilayahSet = new Set<string>()
    const result: WisataItem[] = []

    for (const item of wisataList) {
      if (!wilayahSet.has(item.wilayah)) {
        wilayahSet.add(item.wilayah)
        result.push(item)
      }
      if (result.length === 4) break
    }

    if (result.length < 4) {
      for (const item of wisataList) {
        if (!result.includes(item)) {
          result.push(item)
          if (result.length === 4) break
        }
      }
    }

    return result
  }

  const featuredWisata = getVariedWisata()

  return (
    <section className="bg-citra-canvas-alt py-20 md:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow mb-4 block">Destinasi Pilihan</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl lg:text-5xl mt-2">
              Destinasi Pilihan Terbaik
            </h2>
          </div>
          <p className="text-citra-body max-w-lg">
            Tempat wisata terbaik dari berbagai wilayah Ciayumajakuning yang siap kamu jelajahi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredWisata.map((item) => {
            const imgUrl = getImageUrl(item)
            const gradient = getGradientByWilayah(item.wilayah)
            const accent = getAccentByWilayah(item.wilayah)

            return (
              <Link
                key={item.kode}
                href={`/wisata/${item.kode}`}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {imgUrl ? (
                    <>
                      <img
                        src={imgUrl}
                        alt={item.nama}
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-linear-to-t ${gradient}`} />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#1a1f2e]">
                      <span className="text-5xl font-bold text-white/10 font-display tracking-tight">
                        {item.nama.charAt(0)}
                      </span>
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    </div>
                  )}

                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    <span className="inline-flex rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold tracking-wide text-slate-700 backdrop-blur-sm shadow-xs">
                      {item.kategori_utama || 'Wisata'}
                    </span>
                    {item.rating_google && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-amber-600 backdrop-blur-sm shadow-xs">
                        <Star className="h-3 w-3 fill-amber-400" />
                        {item.rating_google}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-2xl font-bold text-white font-display tracking-tight drop-shadow-sm">
                      {item.nama}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{item.wilayah}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-relaxed text-slate-500 line-clamp-2">
                    {item.deskripsi || item.alamat_lengkap || 'Nikmati pengalaman wisata terbaik di destinasi ini.'}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${accent}`}>
                      Jelajahi
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-citra-canvas-alt text-citra-muted transition-all duration-300 group-hover:bg-citra-primary group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/wisata"
            className="inline-flex items-center gap-2 rounded-full border border-citra-border bg-white px-6 py-3 text-sm font-semibold text-citra-ink transition-all hover:bg-citra-canvas-alt hover:border-citra-border-strong"
          >
            Lihat Semua Wisata
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
