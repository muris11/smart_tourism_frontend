'use client'

import { Clock, Ticket, CalendarPlus, Share2 } from 'lucide-react'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'
import SentimentSection from './SentimentSection'
import type { DetailItem } from '@/types/detail'
import { Wilayah } from '@/lib/constants/wilayah'

interface DetailSidebarProps {
  item: DetailItem
}

export default function DetailSidebar({ item }: DetailSidebarProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Coba lihat ${item.name} di CITRA!`

  // Tentukan tipe tempat berdasarkan kategori yang tersedia di DetailItem
  const tipeTempat = (() => {
    // Berdasarkan category yang ada di DetailItem
    if (item.category === 'wisata' || item.category === 'Wisata') return 'wisata'
    if (item.category === 'kuliner' || item.category === 'Kuliner') return 'kuliner'
    if (item.category === 'nongkrong' || item.category === 'Nongkrong') return 'nongkrong'
    // Fallback: cek dari slug atau asumsi
    return 'wisata'
  })()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: item.name, text: shareText, url: shareUrl })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      alert('Tautan berhasil disalin!')
    }
  }

  const handleShareTo = (platform: 'instagram' | 'tiktok' | 'whatsapp') => {
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      instagram: `https://instagram.com`,
      tiktok: `https://tiktok.com`,
    }
    window.open(urls[platform], '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-4">
          <div className="rounded-lg border border-citra-border bg-citra-surface p-6 shadow-card">
            <h3 className="mb-5 font-display text-lg font-bold text-citra-ink">
              Rencanakan Kunjungan
            </h3>

            <div className="space-y-4">
              {item.hours && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-citra-primary-soft">
                    <Clock className="h-4 w-4 text-citra-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-citra-muted">Jam Buka</p>
                    <p className="font-medium text-citra-ink">{item.hours}</p>
                  </div>
                </div>
              )}

              {item.priceRange && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-citra-primary-soft">
                    <Ticket className="h-4 w-4 text-citra-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-citra-muted">Harga Tiket</p>
                    <p className="font-medium text-citra-ink">{item.priceRange}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <Button variant="primary" size="lg" className="w-full" onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/planning'
                }
              }}>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Tambahkan ke Rencana
              </Button>
              <Button variant="secondary" size="lg" className="w-full" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Bagikan
              </Button>
            </div>

            <div className="mt-6 border-t border-citra-border pt-5">
              <p className="mb-3 text-center text-xs font-medium text-citra-muted">Bagikan ke</p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleShareTo('instagram')}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-citra-surface-soft text-citra-body transition-all hover:bg-citra-primary-soft hover:text-citra-primary"
                  aria-label="Bagikan ke Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShareTo('tiktok')}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-citra-surface-soft text-citra-body transition-all hover:bg-citra-primary-soft hover:text-citra-primary"
                  aria-label="Bagikan ke TikTok"
                >
                  <FaTiktok className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleShareTo('whatsapp')}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-citra-surface-soft text-citra-body transition-all hover:bg-citra-primary-soft hover:text-citra-primary"
                  aria-label="Bagikan ke WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sentiment Section - Menampilkan data sentimen per wilayah */}
          {item.region && (
            <SentimentSection
              wilayah={item.region as Wilayah}
              tipeTempat={tipeTempat}
            />
          )}

          {/* Spacer - memberikan ruang kosong di bawah */}
          <div className="h-8" />
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-citra-border bg-citra-surface p-4 shadow-floating lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            {item.priceRange && (
              <p className="text-xs text-citra-muted">Mulai dari</p>
            )}
            <p className="font-semibold text-citra-ink">{item.priceRange || item.hours}</p>
          </div>
          <Button variant="primary" size="default" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Bagikan
          </Button>
          <Button variant="secondary" size="default" onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/planning'
            }
          }}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Rencana
          </Button>
        </div>
      </div>
    </>
  )
}