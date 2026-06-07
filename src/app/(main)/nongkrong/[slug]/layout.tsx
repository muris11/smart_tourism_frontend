import type { Metadata } from 'next'
import { getHangoutBySlug } from '@/lib/api'

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { slug } = await params
  const hangout = await getHangoutBySlug(slug)

  if (!hangout) {
    return {
      title: 'Tempat Nongkrong Tidak Ditemukan',
      description: 'Halaman tempat nongkrong/cafe yang Anda cari di wilayah Ciayumajakuning tidak ditemukan.',
    }
  }

  const title = `${hangout.name} — Cafe Hits & Tempat Nongkrong di ${hangout.region}`
  const description = hangout.description || `Kunjungi cafe estetik ${hangout.name} di ${hangout.region}. Temukan info alamat, suasana (ambience), jam buka, dan kisaran harga menu bersama CITRA.`

  return {
    title,
    description,
    keywords: [
      hangout.name.toLowerCase(),
      `cafe ${hangout.name.toLowerCase()}`,
      `nongkrong di ${hangout.region.toLowerCase()}`,
      `cafe hits ${hangout.region.toLowerCase()}`,
      'citra ciayumajakuning',
      'smart tourism',
    ],
    openGraph: {
      title: `${title} | CITRA`,
      description,
      type: 'article',
      images: hangout.images.map((img) => ({
        url: img.src,
        alt: img.alt || hangout.name,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | CITRA`,
      description,
      images: hangout.images.map((img) => img.src),
    },
  }
}

export default function NongkrongDetailLayout({ children }: Props) {
  return <>{children}</>
}
