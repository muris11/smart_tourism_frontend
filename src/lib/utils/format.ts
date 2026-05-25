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