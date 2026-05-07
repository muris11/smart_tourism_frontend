import type { Metadata } from 'next'
import DetailHero from '@/components/detail/DetailHero'
import DetailInfo from '@/components/detail/DetailInfo'
import DetailMap from '@/components/detail/DetailMap'
import DetailRecommendation from '@/components/detail/DetailRecommendation'
import DetailSentiment from '@/components/detail/DetailSentiment'
import { nongkrongApi } from '@/lib/api/nongkrong'

interface Props {
  params: Promise<{ kode: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kode } = await params
  const nongkrong = await nongkrongApi.detail(kode).catch(() => null)
  return { title: nongkrong?.nama ?? 'Detail Nongkrong', description: nongkrong?.deskripsi?.slice(0, 160) ?? '' }
}

export default async function NongkrongDetailPage({ params }: Props) {
  const { kode } = await params
  const nongkrong = await nongkrongApi.detail(kode).catch(() => null)
  if (!nongkrong) return <div className="container py-20 text-center">Tempat nongkrong tidak ditemukan.</div>

  return (
    <div>
      <DetailHero nama={nongkrong.nama} gambar={nongkrong.gambar} rating={nongkrong.rating} wilayah={nongkrong.wilayah} />
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <DetailInfo item={nongkrong} />
          <DetailSentiment kode={nongkrong.kode} tipe="nongkrong" sentimen={nongkrong.sentimen} pct={nongkrong.sentimen_positif_pct} />
        </div>
        <aside className="space-y-6">
          {nongkrong.koordinat ? <DetailMap koordinat={nongkrong.koordinat} nama={nongkrong.nama} /> : null}
          <DetailRecommendation kode={nongkrong.kode} wilayah={nongkrong.wilayah} />
        </aside>
      </div>
    </div>
  )
}
