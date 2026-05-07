import type { Metadata } from 'next'
import DetailHero from '@/components/detail/DetailHero'
import DetailInfo from '@/components/detail/DetailInfo'
import DetailMap from '@/components/detail/DetailMap'
import DetailRecommendation from '@/components/detail/DetailRecommendation'
import DetailSentiment from '@/components/detail/DetailSentiment'
import { kulinerApi } from '@/lib/api/kuliner'

interface Props {
  params: Promise<{ kode: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kode } = await params
  const kuliner = await kulinerApi.detail(kode).catch(() => null)
  return { title: kuliner?.nama ?? 'Detail Kuliner', description: kuliner?.deskripsi?.slice(0, 160) ?? '' }
}

export default async function KulinerDetailPage({ params }: Props) {
  const { kode } = await params
  const kuliner = await kulinerApi.detail(kode).catch(() => null)
  if (!kuliner) return <div className="container py-20 text-center">Kuliner tidak ditemukan.</div>

  return (
    <div>
      <DetailHero nama={kuliner.nama} gambar={kuliner.gambar} rating={kuliner.rating} wilayah={kuliner.wilayah} />
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <DetailInfo item={kuliner} />
          <DetailSentiment kode={kuliner.kode} tipe="kuliner" sentimen={kuliner.sentimen} pct={kuliner.sentimen_positif_pct} />
        </div>
        <aside className="space-y-6">
          {kuliner.koordinat ? <DetailMap koordinat={kuliner.koordinat} nama={kuliner.nama} /> : null}
          <DetailRecommendation kode={kuliner.kode} wilayah={kuliner.wilayah} />
        </aside>
      </div>
    </div>
  )
}
