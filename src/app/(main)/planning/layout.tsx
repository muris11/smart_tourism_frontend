import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perencanaan Perjalanan Liburan Mandiri & Rencana Itinerary',
  description: 'Rencanakan, kelola, dan sesuaikan rute liburanmu di daerah Cirebon, Indramayu, Majalengka, dan Kuningan (Ciayumajakuning) secara interaktif bersama asisten pintar CITRA.',
  keywords: ['perencanaan liburan mandiri', 'itinerary planner', 'rencanakan liburan ciayumajakuning', 'citra planning'],
}

export default function PlanningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
