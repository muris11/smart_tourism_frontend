import type { Metadata } from 'next'
import DetailHero from '@/components/detail/DetailHero'
import DetailInfo from '@/components/detail/DetailInfo'
import DetailMap from '@/components/detail/DetailMap'
import DetailRecommendation from '@/components/detail/DetailRecommendation'
import DetailSentiment from '@/components/detail/DetailSentiment'
import { wisataApi } from '@/lib/api/wisata'

interface Props {
  params: Promise<{ kode: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kode } = await params
  const wisata = await wisataApi.detail(kode).catch(() => null)
  return {
    title: wisata?.nama ?? 'Detail Wisata',
    description: wisata?.deskripsi?.slice(0, 160) ?? '',
  }
}

export default async function WisataDetailPage({ params }: Props) {
  const { kode } = await params
  const wisata = await wisataApi.detail(kode).catch(() => null)

  if (!wisata) {
    return <div className="container py-20 text-center">Wisata tidak ditemukan.</div>
  }

  return (
    <div>
      <DetailHero nama={wisata.nama} gambar={wisata.gambar} rating={wisata.rating} wilayah={wisata.wilayah} />
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <DetailInfo wisata={wisata} />
          <DetailSentiment kode={wisata.kode} tipe="wisata" sentimen={wisata.sentimen} pct={wisata.sentimen_positif_pct} />
        </div>
        <aside className="space-y-6">
          {wisata.koordinat ? <DetailMap koordinat={wisata.koordinat} nama={wisata.nama} /> : null}
          <DetailRecommendation kode={wisata.kode} wilayah={wisata.wilayah} />
        </aside>
      </div>
    </div>
  )
}
