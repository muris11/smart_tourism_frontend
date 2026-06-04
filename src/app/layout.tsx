import type { Metadata, Viewport } from 'next'
import { Inter, Manrope, Lora } from 'next/font/google'
import '@/styles/globals.css'
import AuthProvider from '@/providers/AuthProvider'

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const displayFont = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const editorialFont = Lora({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
  weight: '500',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://smart-tourism-citra.web.id'),
  title: {
    template: '%s | CITRA',
    default: 'CITRA — Asisten Wisata Cerdas Ciayumajakuning',
  },
  description: 'CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant). Temukan rekomendasi destinasi wisata, kuliner legendaris, tempat nongkrong estetik, dan buat rencana perjalanan itinerary otomatis berbasis AI di Cirebon, Indramayu, Majalengka, dan Kuningan.',
  keywords: ['smart tourism', 'ciayumajakuning', 'cirebon', 'indramayu', 'majalengka', 'kuningan', 'itinerary generator', 'wisata cirebon', 'kuliner cirebon', 'trip planner', 'asisten wisata ai'],
  authors: [{ name: 'CITRA Team' }],
  creator: 'CITRA Dev',
  publisher: 'CITRA',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://smart-tourism-citra.web.id',
    title: 'CITRA — Ciayumajakuning Intelligent Tourism & Recommendation Assistant',
    description: 'Rencanakan perjalanan liburan cerdasmu ke Cirebon, Indramayu, Majalengka, dan Kuningan dengan rekomendasi berbasis kecerdasan buatan (AI) terpercaya.',
    siteName: 'CITRA',
    images: [
      {
        url: '/images/hero/hero-1.jpeg',
        width: 1200,
        height: 630,
        alt: 'CITRA Smart Tourism Ciayumajakuning Banner',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CITRA — Asisten Wisata Cerdas Ciayumajakuning',
    description: 'Rencanakan liburanmu dengan asisten perjalanan AI. Temukan kuliner terlezat dan tempat nongkrong terbaik di wilayah Ciayumajakuning.',
    images: ['/images/hero/hero-1.jpeg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' }
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' }
    ]
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${editorialFont.variable} font-body antialiased bg-citra-canvas text-citra-body`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}