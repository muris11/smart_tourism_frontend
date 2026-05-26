import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kontak' }

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
