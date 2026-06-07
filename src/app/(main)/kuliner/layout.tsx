import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kuliner Khas Legendaris & Tempat Makan Terbaik di Ciayumajakuning',
  description: 'Temukan kuliner legendaris terlezat, makanan khas tradisional, dan rekomendasi restoran terbaik di wilayah Cirebon, Indramayu, Majalengka, dan Kuningan (Ciayumajakuning) bersama CITRA.',
  keywords: ['kuliner ciayumajakuning', 'makanan khas cirebon', 'kuliner cirebon', 'empal gentong', 'nasi jamblang', 'nasi lengko', 'citra kuliner'],
}

export default function KulinerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
