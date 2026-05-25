/** 
 * Root Layout - Layout utama aplikasi
 * 
 * File ini adalah ROOT LAYOUT yang membungkus SEMUA halaman.
 * Hanya berisi struktur HTML dasar, font, dan metadata.
 * 
 * - (main)/layout.tsx untuk Navbar & Footer
 * - (auth)/layout.tsx untuk layout tanpa navigasi
 * 
 */
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import AuthProvider from '@/providers/AuthProvider'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })

const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

/**
 * Metadata untuk SEO aplikasi
 * - Template title akan menggabungkan judul halaman dengan "| CITRA"
 * - Default title digunakan jika halaman tidak menentukan title sendiri
 */
export const metadata: Metadata = {
  title: {
    template: '%s | CITRA',
    default: 'CITRA',
  },
  description: 'CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant)',
  icons: {
    icon: '/favicon.ico',
  },
}

/**
 * Viewport configuration untuk responsive design pada mobile devices
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

/**
 * RootLayout Component
 * Layout utama yang membungkus seluruh aplikasi. Hanya berisi struktur HTML dasar dan font.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Konten dari layout turunan (seperti (main)/layout.tsx)
 * 
 * @returns {JSX.Element} HTML document dengan struktur minimal
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-[#f6f1eb] text-[#1c1917]`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}