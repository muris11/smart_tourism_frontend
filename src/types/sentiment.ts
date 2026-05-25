import { Wilayah } from '@/lib/constants/wilayah'

/** Ringkasan sentimen per wilayah */
export interface SentimentSummary {
  wilayah: Wilayah
  total_ulasan: number
  positif_count: number
  negatif_count: number
  netral_count?: number
  positif_pct: number
  negatif_pct: number
  netral_pct?: number
  per_tipe: {
    wisata: { positif: number; negatif: number; netral?: number }
    kuliner: { positif: number; negatif: number; netral?: number }
    nongkrong: { positif: number; negatif: number; netral?: number }
  }
}

/** Response dari backend FastAPI untuk summary sentimen */
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