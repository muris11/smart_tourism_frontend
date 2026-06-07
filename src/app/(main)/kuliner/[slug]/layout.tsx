import type { Metadata } from 'next'
import { getCulinaryBySlug } from '@/lib/api'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { slug } = await params
  const culinary = await getCulinaryBySlug(slug)

  if (!culinary) {
    return {
      title: 'Kuliner Khas Tidak Ditemukan',
      description: 'Halaman kuliner khas yang Anda cari di wilayah Ciayumajakuning tidak ditemukan.',
    }
  }

  const title = `${culinary.name} — Kuliner Khas & Tempat Makan di ${culinary.region}`
  const description = culinary.description || `Nikmati cita rasa khas kuliner ${culinary.name} di ${culinary.region}. Temukan alamat lengkap, menu rekomendasi, jam buka, dan kisaran harga makanan bersama CITRA.`

  return {
    title,
    description,
    keywords: [
      culinary.name.toLowerCase(),
      `kuliner ${culinary.name.toLowerCase()}`,
      `tempat makan di ${culinary.region.toLowerCase()}`,
      `kuliner khas ${culinary.region.toLowerCase()}`,
      'citra ciayumajakuning',
      'smart tourism',
    ],
    openGraph: {
      title: `${title} | CITRA`,
      description,
      type: 'article',
      images: culinary.images.map((img) => ({
        url: img.src,
        alt: img.alt || culinary.name,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | CITRA`,
      description,
      images: culinary.images.map((img) => img.src),
    },
  }
}

export default function KulinerDetailLayout({ children }: Props) {
  return <>{children}</>
}
