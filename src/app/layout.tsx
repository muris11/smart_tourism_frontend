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
    default: 'CITRA Ciayumajakuning — Asisten Wisata Cerdas & Rencana Itinerary AI',
  },
  description: 'CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant). Temukan rekomendasi destinasi wisata, kuliner legendaris, tempat nongkrong estetik, dan buat rencana perjalanan itinerary otomatis berbasis AI di Cirebon, Indramayu, Majalengka, dan Kuningan.',
  keywords: ['smart tourism', 'citra', 'citra ciayumajakuning', 'ciayumajakuning', 'cirebon', 'indramayu', 'majalengka', 'kuningan', 'itinerary generator', 'wisata cirebon', 'kuliner cirebon', 'trip planner', 'asisten wisata ai'],
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
      { url: '/images/logo/citra-logo.png', type: 'image/png' }
    ],
    apple: [
      { url: '/images/logo/citra-logo.png', type: 'image/png' }
    ]
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'CITRA',
    'alternateName': 'CITRA Ciayumajakuning',
    'url': 'https://smart-tourism-citra.web.id',
    'description': 'Ciayumajakuning Intelligent Tourism & Recommendation Assistant. Asisten wisata cerdas berbasis AI.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://smart-tourism-citra.web.id/cari?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  const sitelinksSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'SiteNavigationElement',
        'position': 1,
        'name': 'Destinasi Wisata',
        'url': 'https://smart-tourism-citra.web.id/wisata'
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 2,
        'name': 'Kuliner Khas',
        'url': 'https://smart-tourism-citra.web.id/kuliner'
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 3,
        'name': 'Tempat Nongkrong',
        'url': 'https://smart-tourism-citra.web.id/nongkrong'
      },
      {
        '@type': 'SiteNavigationElement',
        'position': 4,
        'name': 'Rencana Perjalanan (Itinerary AI)',
        'url': 'https://smart-tourism-citra.web.id/rencana'
      }
    ]
  }

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
        />
      </head>
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