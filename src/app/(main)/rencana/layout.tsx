import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rencana Perjalanan & Pembuat Itinerary Otomatis AI',
  description: 'Rancang rencana perjalanan (itinerary) liburan impianmu secara otomatis dalam hitungan detik dengan dukungan kecerdasan buatan (AI) di Cirebon, Indramayu, Majalengka, dan Kuningan bersama CITRA.',
  keywords: ['pembuat itinerary otomatis', 'itinerary ai', 'rencana perjalanan cirebon', 'trip planner ciayumajakuning', 'citra rencana'],
}

export default function RencanaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
