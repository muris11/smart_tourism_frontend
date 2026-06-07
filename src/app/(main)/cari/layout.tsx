import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pencarian Wisata, Kuliner & Cafe Terlengkap di Ciayumajakuning',
  description: 'Cari dan temukan destinasi liburan impianmu, kuliner legendaris, dan tempat nongkrong terfavorit di wilayah Cirebon, Indramayu, Majalengka, dan Kuningan secara cepat dan mudah bersama CITRA.',
  keywords: ['cari wisata cirebon', 'cari kuliner cirebon', 'pencarian destinasi ciayumajakuning', 'citra cari'],
}

export default function CariLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
