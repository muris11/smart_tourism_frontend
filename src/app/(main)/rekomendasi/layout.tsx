import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rekomendasi Wisata & Aktivitas Liburan Cerdas AI',
  description: 'Dapatkan rekomendasi perjalanan yang personal dan cerdas berbasis AI untuk menjelajahi keindahan alam, budaya, dan cita rasa kuliner terbaik di Ciayumajakuning bersama CITRA.',
  keywords: ['rekomendasi wisata ai', 'asisten liburan cerdas', 'rekomendasi ciayumajakuning', 'itinerary ai', 'citra rekomendasi'],
}

export default function RekomendasiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
