import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Rekomendasi' }

export default function RekomendasiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
