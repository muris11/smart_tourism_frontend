'use client'

import Link from 'next/link'
import WisataCard from '@/components/cards/WisataCard'
import FilterPanel from '@/components/filters/FilterPanel'
import EmptyState from '@/components/ui/EmptyState'
import Skeleton from '@/components/ui/Skeleton'
import { useWisataList } from '@/hooks/useWisata'
import { ROUTES } from '@/lib/constants/routes'
import { useFilterStore } from '@/stores/filterStore'

const fallbackDestinations = [
  {
    id: 'bali-nusa',
    name: 'Bali & Nusa Tenggara',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    count: '124 Lokasi',
  },
  {
    id: 'jawa',
    name: 'Pulau Jawa',
    image: 'https://images.unsplash.com/photo-1584801198647-5d27b919d3f1?auto=format&fit=crop&q=80&w=800',
    count: '86 Lokasi',
  },
  {
    id: 'sumatera',
    name: 'Sumatera',
    image: 'https://images.unsplash.com/photo-1522204642456-11f81df682c0?auto=format&fit=crop&q=80&w=800',
    count: '64 Lokasi',
  },
  {
    id: 'kalimantan',
    name: 'Kalimantan',
    image: 'https://images.unsplash.com/photo-1512100256350-13f5188812c3?auto=format&fit=crop&q=80&w=800',
    count: '42 Lokasi',
  },
  {
    id: 'sulawesi',
    name: 'Sulawesi',
    image: 'https://images.unsplash.com/photo-1620802051772-132d73f11075?auto=format&fit=crop&q=80&w=800',
    count: '55 Lokasi',
  },
  {
    id: 'maluku-papua',
    name: 'Maluku & Papua',
    image: 'https://images.unsplash.com/photo-1542385311-6b453531bfa2?auto=format&fit=crop&q=80&w=800',
    count: '38 Lokasi',
  },
]

export default function WisataPage() {
  const filter = useFilterStore()
  const { data, isLoading, isError } = useWisataList({
    wilayah: filter.wilayah || undefined,
    sentimen: filter.sentimen || undefined,
    sort: filter.sort as 'rating' | 'terbaru' | 'nama',
    q: filter.q || undefined,
    page: filter.page,
  })

  return (
    <div className="animate-fade-in bg-[#fafafa] pt-32 pb-24">
      <section className="container mb-16 px-6 text-center md:px-12">
        <span className="eyebrow mb-4 block">Bentang Alam</span>
        <h1 className="mx-auto mb-6 max-w-4xl text-5xl leading-tight text-brand-navy md:text-7xl">
          Kanvas Hijau Ciayumajakuning
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-slate-600 md:text-xl">
          Menyusuri garis bukit, udara pesisir, dan suasana alam yang tersimpan di empat wilayah utama.
        </p>
      </section>

      <section className="container mb-14 px-6 md:px-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Kurasi Editorial
            </p>
            <h2 className="max-w-2xl text-3xl leading-tight text-brand-navy md:text-4xl">
              Lanskap yang terasa dekat, bukan sekadar ramai di foto.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 font-light text-slate-600 md:text-base">
              Halaman ini dirancang seperti katalog perjalanan yang tenang. Fokusnya bukan hanya pada lokasi, tetapi juga pada rasa ruang, karakter wilayah, dan konteks yang membuat orang ingin benar-benar datang.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-slate-200 bg-brand-pale p-8 shadow-sm md:p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Arah Eksplorasi
            </p>
            <ul className="space-y-3 text-sm leading-7 text-slate-700">
              <li>Pilih wilayah terlebih dahulu untuk mempersempit rasa pencarian.</li>
              <li>Gunakan sentimen saat ingin membaca tempat yang paling disukai pengunjung.</li>
              <li>Gunakan urutan rating saat ingin melihat pilihan yang paling stabil kualitasnya.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container flex gap-10 px-6 md:px-12">
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <div className="sticky top-28">
            <FilterPanel tipe="wisata" />
          </div>
        </aside>
        <div className="flex-1">
          {!isLoading && !isError && data.length > 0 ? (
            <div className="mb-10 flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Hasil Penjelajahan
                </p>
                <h2 className="mt-2 text-2xl text-brand-navy">{data.length} destinasi tampil</h2>
              </div>
              <p className="text-sm font-light text-slate-500">
                Katalog aktif mengikuti filter wilayah, sentimen, dan urutan yang kamu pilih.
              </p>
            </div>
          ) : null}

          {isLoading ? <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="mb-6 aspect-[4/3] rounded-3xl" />)}</div> : null}
          {isError ? <EmptyState message="Gagal memuat data. Menampilkan katalog editorial sementara." /> : null}

          {!isLoading && (isError || data.length === 0) ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {fallbackDestinations.map((dest) => (
                <Link key={dest.id} href={ROUTES.WISATA_DETAIL(dest.id)} className="group block cursor-pointer">
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                  </div>
                  <div className="flex items-start justify-between px-1">
                    <div>
                      <h3 className="mb-1 text-2xl leading-tight tracking-tight text-brand-navy transition-colors group-hover:text-[var(--color-brand-dark)]">
                        {dest.name}
                      </h3>
                      <span className="text-sm font-light text-slate-500">{dest.count}</span>
                    </div>
                    <div className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-500">
                      Lihat
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          {!isLoading && !isError && data.length > 0 ? <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">{data.map((w) => <WisataCard key={w.kode} wisata={w} />)}</div> : null}
        </div>
      </div>
    </div>
  )
}
