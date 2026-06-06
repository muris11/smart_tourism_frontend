'use client'

import { useState, useEffect } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { getDestinations, getCulinary, getHangouts, type Destination } from '@/lib/api'
import { feedbackApi } from '@/lib/api/feedback'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import DestinationCard from '@/components/cards/DestinationCard'
import CulinaryCard from '@/components/cards/CulinaryCard'
import HangoutCard from '@/components/cards/HangoutCard'

export default function RekomendasiPage() {
  usePageTitle('Rekomendasi')
  const [alamDestinations, setAlamDestinations] = useState<any[]>([])
  const [budayaDestinations, setBudayaDestinations] = useState<any[]>([])
  const [culinaryItems, setCulinaryItems] = useState<any[]>([])
  const [hangoutItems, setHangoutItems] = useState<any[]>([])
  const [hiddenGems, setHiddenGems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [feedbackStatus, setFeedbackStatus] = useState<number | null>(null)

  const handleFeedback = async (rating: number) => {
    if (feedbackStatus !== null) return
    setFeedbackStatus(rating)
    try {
      await feedbackApi.submit({
        feature: 'recommendation',
        rating,
        context: { page: 'rekomendasi_spesial' }
      })
    } catch {
      setFeedbackStatus(null)
    }
  }

  useEffect(() => {
    Promise.all([
      getDestinations(),
      getCulinary(),
      getHangouts(),
    ]).then(([destinations, culinary, hangouts]) => {
      setAlamDestinations(
        destinations
          .filter((d) => d.category === 'Alam' || d.category === 'Pantai')
          .slice(0, 3)
          .map((d) => ({
            id: d.id,
            slug: d.slug,
            name: d.name,
            region: d.region,
            category: d.category,
            rating: d.rating,
            address: d.address,
            image: d.images[0]?.src || '',
            featured: d.featured,
          }))
      )

      setBudayaDestinations(
        destinations
          .filter((d) => d.category === 'Budaya' || d.category === 'Religi')
          .slice(0, 3)
          .map((d) => ({
            id: d.id,
            slug: d.slug,
            name: d.name,
            region: d.region,
            category: d.category,
            rating: d.rating,
            address: d.address,
            image: d.images[0]?.src || '',
            featured: d.featured,
          }))
      )

      setCulinaryItems(
        culinary.slice(0, 3).map((c) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          region: c.region,
          category: c.category,
          rating: c.rating,
          image: c.images[0]?.src || '',
        }))
      )

      setHangoutItems(
        hangouts.slice(0, 3).map((h) => ({
          id: h.id,
          slug: h.slug,
          name: h.name,
          region: h.region,
          category: h.category,
          rating: h.rating,
          image: h.images[0]?.src || '',
        }))
      )

      setHiddenGems([
        ...destinations.slice(3, 5).map((d) => ({
          type: 'wisata' as const,
          id: d.id,
          slug: d.slug,
          name: d.name,
          region: d.region,
          category: d.category,
          rating: d.rating,
          address: d.address,
          image: d.images[0]?.src || '',
          featured: d.featured,
        })),
        ...culinary.slice(3, 5).map((c) => ({
          type: 'kuliner' as const,
          id: c.id,
          slug: c.slug,
          name: c.name,
          region: c.region,
          category: c.category,
          rating: c.rating,
          image: c.images[0]?.src || '',
        })),
        ...hangouts.slice(3, 5).map((h) => ({
          type: 'nongkrong' as const,
          id: h.id,
          slug: h.slug,
          name: h.name,
          region: h.region,
          category: h.category,
          rating: h.rating,
          image: h.images[0]?.src || '',
        })),
      ])
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-24">
        <section className="bg-citra-surface-green py-16 md:py-20">
          <div className="container-page text-center">
            <div className="mx-auto h-6 w-48 skeleton-shimmer rounded" />
            <div className="mx-auto mt-3 h-10 w-80 skeleton-shimmer rounded" />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen animate-fade-in pt-28 pb-24">
      <section className="bg-citra-surface-green py-16 md:py-20">
        <div className="container-page text-center">
          <p className="eyebrow">Pilihan Tim CITRA</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-citra-ink md:text-5xl">Rekomendasi Spesial</h1>
          <p className="mx-auto mt-4 max-w-xl text-citra-muted">
            Kumpulan tempat terbaik pilihan tim CITRA untuk pengalaman wisata yang tak terlupakan
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-page">
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold text-citra-ink md:text-3xl">Destinasi Alam Terbaik</h2>
            <p className="mt-2 text-sm text-citra-muted">Nikmati keindahan alam Ciayumajakuning yang memukau</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alamDestinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-citra-surface-soft">
        <div className="container-page">
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold text-citra-ink md:text-3xl">Kuliner Wajib Coba</h2>
            <p className="mt-2 text-sm text-citra-muted">Sajian khas yang menggugah selera dari setiap daerah</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {culinaryItems.map((c) => (
              <CulinaryCard key={c.id} culinary={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-page">
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold text-citra-ink md:text-3xl">Tempat Nongkrong Favorit</h2>
            <p className="mt-2 text-sm text-citra-muted">Hangout seru dengan suasana dan pemandangan terbaik</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hangoutItems.map((h) => (
              <HangoutCard key={h.id} hangout={h} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-citra-surface-green">
        <div className="container-page">
          <div className="mb-10">
            <p className="eyebrow">Jelajahi Lebih Dalam</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-citra-ink md:text-3xl">Hidden Gems</h2>
            <p className="mt-2 text-sm text-citra-muted">Tempat-tempat unik yang sayang untuk dilewatkan</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hiddenGems.map((item: any) => {
              if (item.type === 'wisata') {
                return <DestinationCard key={item.id} destination={item} />
              }
              if (item.type === 'kuliner') {
                return <CulinaryCard key={item.id} culinary={item} />
              }
              return <HangoutCard key={item.id} hangout={item} />
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-page flex flex-col items-center text-center">
          <p className="text-sm font-medium text-slate-700 mb-4">Apakah rekomendasi di halaman ini membantu Anda?</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleFeedback(1)}
              disabled={feedbackStatus !== null}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                feedbackStatus === 1 ? "bg-green-100 text-green-700" : "bg-citra-surface-soft text-citra-ink hover:bg-green-50 hover:text-green-600 border border-citra-border"
              } ${feedbackStatus === -1 ? "opacity-40" : ""}`}
            >
              <ThumbsUp className="h-4 w-4" /> Sangat Membantu
            </button>
            <button 
              onClick={() => handleFeedback(-1)}
              disabled={feedbackStatus !== null}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                feedbackStatus === -1 ? "bg-red-100 text-red-700" : "bg-citra-surface-soft text-citra-ink hover:bg-red-50 hover:text-red-600 border border-citra-border"
              } ${feedbackStatus === 1 ? "opacity-40" : ""}`}
            >
              <ThumbsDown className="h-4 w-4" /> Kurang Membantu
            </button>
          </div>
          {feedbackStatus !== null && <p className="text-xs text-green-600 mt-3 font-medium">Terima kasih atas tanggapan Anda!</p>}
        </div>
      </section>
    </div>
  )
}
