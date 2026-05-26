import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Rencana' }

export default function RencanaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
