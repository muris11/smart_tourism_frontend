import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tempat Nongkrong Terdekat, Cafe Estetik & Hits di Ciayumajakuning',
  description: 'Cari rekomendasi tempat nongkrong instagramable, cafe estetik, co-working space, dan tempat bersantai terpopuler di Cirebon, Indramayu, Majalengka, dan Kuningan (Ciayumajakuning) bersama CITRA.',
  keywords: ['tempat nongkrong cirebon', 'cafe estetik cirebon', 'cafe kuningan', 'nongkrong ciayumajakuning', 'citra cafe'],
}

export default function NongkrongLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
