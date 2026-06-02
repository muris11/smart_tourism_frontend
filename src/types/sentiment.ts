import { Wilayah } from '@/lib/constants/wilayah'

/** Sentimen (match OpenAPI FastAPI) */
export type Sentimen = 'positif' | 'negatif' | 'netral'

/** Ringkasan sentimen per wilayah (match Laravel API) */
export interface SentimentSummary {
  wilayah: Wilayah
  tipe: string
  total_ulasan: number
  positif: number
  negatif: number
  netral: number
  persentase_positif: number
  avg_confidence: number
}

/** Response dari backend Laravel untuk summary sentimen */
export interface SentimentSummaryResponse {
  success: boolean
  message: string
  data: SentimentSummary
}

/** Parameter untuk request summary sentimen */
export interface SentimentSummaryParams {
  wilayah: Wilayah
  tipe_tempat?: 'wisata' | 'kuliner' | 'nongkrong' | 'all'
}