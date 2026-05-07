import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function FeaturedWisata() {
  return (
    <section className="container px-4 py-14">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--color-brand)]">Featured</p>
          <h2 className="text-2xl font-semibold">Ruang list wisata siap dihubungkan API</h2>
        </div>
        <Link href={ROUTES.WISATA} className="text-sm font-medium text-[var(--color-brand)]">Buka halaman wisata</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {['Kurasi destinasi', 'Filter wilayah', 'Kartu responsif'].map((item) => (
          <div key={item} className="card rounded-2xl p-6">
            <h3 className="font-semibold">{item}</h3>
            <p className="mt-2 text-sm text-gray-600">Placeholder section untuk integrasi data backend Laravel.</p>
          </div>
        ))}
      </div>
    </section>
  )
}
