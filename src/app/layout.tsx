import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Smart Tourism Ciayumajakuning',
    default: 'Smart Tourism Ciayumajakuning',
  },
  description:
    'Temukan wisata, kuliner, dan tempat nongkrong terbaik di Cirebon, Indramayu, Majalengka, dan Kuningan.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  )
}
