// src/lib/utils/format.ts

import { format } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * Format tanggal ke format Indonesia
 * @example formatDate('2024-12-31') // "31 Desember 2024"
 */
export const formatDate = (date: string | Date) =>
  format(new Date(date), 'dd MMMM yyyy', { locale: id })

/**
 * Format rating (desimal 1 angka)
 * @example formatRating(4.5) // "4.5"
 */
export const formatRating = (rating: number) => rating.toFixed(1)

/**
 * Format persentase sentimen positif
 * @example formatSentimen(87.5) // "88% positif"
 */
export const formatSentimen = (pct: number) => `${Math.round(pct)}% positif`

/**
 * Format jarak (km ke meter jika < 1km)
 * @example formatJarak(0.5) // "500 m"
 * @example formatJarak(2.3) // "2.3 km"
 */
export const formatJarak = (km: number) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`)

const LOCALHOST_PATTERN = /^http:\/\/localhost(:\d+)?\//i

/**
 * Transform image URL from backend — ganti localhost ke hosted backend
 */
export const getImageUrl = (url: string) => {
  if (!url) return url
  if (LOCALHOST_PATTERN.test(url)) {
    return url.replace(LOCALHOST_PATTERN, 'https://backend.smart-tourism-citra.web.id/')
  }
  return url
}

/**
 * Helper untuk ambil gambar pertama dari array gambar
 */
export const getFirstImage = (gambar: string[] | undefined | null, fallback: string) => {
  if (gambar && gambar.length > 0) {
    return getImageUrl(gambar[0])
  }
  return fallback
}