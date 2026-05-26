import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kuliner' }

export default function KulinerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
