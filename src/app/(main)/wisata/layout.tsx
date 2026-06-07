import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Destinasi Wisata Terpopuler di Ciayumajakuning',
  description: 'Temukan destinasi wisata alam terindah, situs budaya bersejarah, dan wisata religi terbaik di Cirebon, Indramayu, Majalengka, dan Kuningan (Ciayumajakuning) bersama CITRA.',
  keywords: ['destinasi wisata ciayumajakuning', 'wisata cirebon', 'wisata kuningan', 'wisata majalengka', 'wisata indramayu', 'citra wisata'],
}

export default function WisataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
