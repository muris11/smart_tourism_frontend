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
  title: {
    template: '%s | CITRA',
    default: 'CITRA',
  },
  description: 'CITRA — Ciayumajakuning Intelligent Tourism & Recommendation Assistant. Jelajahi keindahan, rasa, dan cerita Ciayumajakuning.',
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