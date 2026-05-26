import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Wisata' }

export default function WisataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
