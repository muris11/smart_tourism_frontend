import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDate = (date: string | Date) =>
  format(new Date(date), 'dd MMMM yyyy', { locale: id })

export const formatRating = (rating: number) => rating.toFixed(1)

export const formatSentimen = (pct: number) => `${Math.round(pct)}% positif`

export const formatJarak = (km: number) => (km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`)
