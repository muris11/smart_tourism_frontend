import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Nongkrong' }

export default function NongkrongLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
