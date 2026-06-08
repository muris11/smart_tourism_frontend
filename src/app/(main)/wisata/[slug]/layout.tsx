import type { Metadata } from 'next'
import { getDestinationBySlug } from '@/lib/api'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)

  if (!destination) {
    return {
      title: 'Destinasi Wisata Tidak Ditemukan',
      description: 'Halaman wisata yang Anda cari di wilayah Ciayumajakuning tidak ditemukan.',
    }
  }

  const title = `${destination.name} — Wisata Populer di ${destination.region}`
  const description = destination.description || `Jelajahi keindahan destinasi wisata ${destination.name} di ${destination.region}. Temukan info jam buka, harga tiket masuk, alamat lengkap, dan tips berkunjung bersama CITRA.`

  return {
    title,
    description,
    alternates: {
      canonical: `/wisata/${slug}`,
    },
    keywords: [
      destination.name.toLowerCase(),
      `wisata ${destination.name.toLowerCase()}`,
      `wisata di ${destination.region.toLowerCase()}`,
      `destinasi ${destination.name.toLowerCase()}`,
      'citra ciayumajakuning',
      'smart tourism',
    ],
    openGraph: {
      title: `${title} | CITRA`,
      description,
      type: 'article',
      images: destination.images.map((img) => ({
        url: img.src,
        alt: img.alt || destination.name,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | CITRA`,
      description,
      images: destination.images.map((img) => img.src),
    },
  }
}

export default function WisataDetailLayout({ children }: Props) {
  return <>{children}</>
}
