/**
 * FeaturedWisata - Komponen untuk menampilkan destinasi wisata unggulan
 * 
 * Fitur:
 * - Menampilkan 4 wisata dengan variasi wilayah berbeda
 * - Menggunakan custom hook useWisata untuk fetching data
 * - Loading skeleton dengan animasi pulse
 * - Error handling dengan pesan error yang ramah
 * - Empty state ketika belum ada data
 * - Link ke detail wisata dengan hover effect
 * - Rating Google ditampilkan dengan icon star
 * - Responsive grid (mobile 1 kolom, desktop 2 kolom)
 * - Tombol CTA untuk melihat semua wisata
 * 
 * @component
 * @returns {JSX.Element} Komponen featured wisata section
 * 
 * @example
 * // Penggunaan di halaman beranda
 * <FeaturedWisata />
 * 
 * @example
 * // Penggunaan dengan layout wrapper
 * <div className="bg-white">
 *   <FeaturedWisata />
 * </div>
 */
'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin, Star } from 'lucide-react'
import { useWisata } from '@/hooks/useWisata'
import { WisataItem } from '@/types/wisata'

/**
 * Komponen FeaturedWisata untuk menampilkan destinasi wisata unggulan
 * dengan variasi wilayah yang berbeda
 * 
 * @returns {JSX.Element} Featured wisata section dengan grid destinasi
 */
export default function FeaturedWisata() {
  const { data: wisataList, isLoading, error } = useWisata({
    limit: 20
  })

  if (isLoading) {
    return (
      <section className="bg-brand-pale py-28">
        <div className="container px-6 md:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse rounded-4xl border border-slate-200 bg-white p-8">
                <div className="mb-8">
                  <div className="mb-4 h-6 w-24 rounded-full bg-slate-200" />
                  <div className="mb-3 h-8 w-40 rounded bg-slate-200" />
                  <div className="h-4 w-32 rounded bg-slate-200" />
                </div>
                <div className="mb-10 h-16 rounded bg-slate-200" />
                <div className="flex justify-between">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-12 w-12 rounded-full bg-slate-200" />
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
      <section className="bg-brand-pale py-28">
        <div className="container px-6 md:px-12 text-center">
          <p className="text-red-500">Gagal memuat data wisata</p>
        </div>
      </section>
    )
  }

  if (!wisataList || wisataList.length === 0) {
    return (
      <section className="bg-brand-pale py-28">
        <div className="container px-6 md:px-12 text-center">
          <p className="text-slate-500">Belum ada data wisata</p>
        </div>
      </section>
    )
  }

  /**
   * Memilih 4 wisata dengan variasi wilayah yang berbeda
   * Jika kurang dari 4, akan diisi dengan wisata lainnya
   * 
   * @returns {WisataItem[]} Array destinasi wisata yang telah divariasikan
   */
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
    <section className="bg-brand-pale py-28">
      <div className="container px-6 md:px-12">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-brand-green">
              Featured Destination
            </span>
            <h2 className="text-4xl leading-tight text-brand-navy md:text-5xl">
              Destinasi Wisata
              <br />
              Pilihan Terbaik
            </h2>
          </div>
          <p className="max-w-lg text-lg leading-relaxed font-light text-slate-500">
            Jelajahi tempat wisata populer dengan pengalaman terbaik
            dari berbagai wilayah Ciayumajakuning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredWisata.map((item) => (
            <Link
              key={item.kode}
              href={`/wisata/${item.kode}`}
              className="group rounded-4xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green hover:shadow-xl"
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <span className="mb-4 inline-flex rounded-full bg-brand-pale px-4 py-1 text-xs font-semibold tracking-wide text-brand-green uppercase">
                    {item.kategori_utama || 'Wisata'}
                  </span>
                  <h3 className="mb-3 text-3xl text-brand-navy transition-colors duration-300 group-hover:text-brand-green">
                    {item.nama}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{item.wilayah}</span>
                  </div>
                </div>
                {item.rating_google && (
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    {item.rating_google}
                  </div>
                )}
              </div>
              <p className="mb-10 leading-relaxed font-light text-slate-500 line-clamp-2">
                {item.deskripsi || item.alamat_lengkap || 'Nikmati pengalaman wisata terbaik di destinasi ini.'}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium tracking-wide text-slate-400 uppercase">
                  Explore Destination
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-pale group-hover:text-brand-green">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/wisata"
            className="inline-flex items-center gap-3 rounded-full border border-slate-300 px-8 py-4 text-sm font-semibold tracking-wide text-brand-navy transition-all duration-300 hover:border-brand-navy hover:bg-white"
          >
            Lihat Semua Wisata
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}