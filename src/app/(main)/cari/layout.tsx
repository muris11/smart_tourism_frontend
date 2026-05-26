import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cari' }

export default function CariLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
