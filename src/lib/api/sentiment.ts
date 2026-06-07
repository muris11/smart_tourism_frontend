import { apiClient } from './client'
import { makeBrowserCacheKey, withBrowserCache } from '@/lib/cache/browserStorage'
import type { Wilayah, SentimentSummary, SentimentSummaryResponse } from '@/types'

export const sentimentApi = {
  /**
   * Ringkasan sentimen per wilayah
   * GET /api/v1/sentiment/summary/{wilayah}
   * 
   * @param wilayah - Wilayah yang ingin dilihat ringkasannya (Indramayu, Cirebon, Majalengka, Kuningan)
   * @param tipeTempat - Filter berdasarkan tipe tempat (wisata, kuliner, nongkrong, all) - optional
   * @returns Ringkasan sentimen (total ulasan, positif/negatif count, persentase, per tipe)
   */
  summary: async (wilayah: Wilayah, tipeTempat?: 'wisata' | 'kuliner' | 'nongkrong' | 'all'): Promise<SentimentSummary> => {
    const { data } = await apiClient.get<SentimentSummaryResponse>(`/sentiment/summary/${wilayah}`, {
      params: { tipe_tempat: tipeTempat },
    })
    return data.data
  },

  /**
   * Ringkasan sentimen semua wilayah
   * GET /api/v1/sentiment/summary-all
   * 
   * @returns List ringkasan sentimen untuk 4 wilayah (cocok untuk chart perbandingan)
   */
  summaryAll: async (): Promise<SentimentSummary[]> => {
    return withBrowserCache(
      makeBrowserCacheKey('sentiment:summary-all'),
      30 * 60 * 1000,
      async () => {
        const { data } = await apiClient.get<{ success: boolean; message: string; data: SentimentSummary[] }>('/sentiment/summary-all')
        return data.data
      }
    )
  },
}
