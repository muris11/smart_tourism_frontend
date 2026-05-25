import { apiClient } from './client'
import type {
  RecommendationPayload,
  RecommendationResponse,
  PlanningPayload,
  PlanningResponse,
  TrackHistoryPayload,
} from '@/types'

export const recommendationApi = {
  /**
   * Dapatkan rekomendasi wisata personal
   * POST /api/v1/recommendation/
   * 
   * @param payload - Parameter rekomendasi (mode, wilayah, kategori, budget, dll)
   * @returns Daftar rekomendasi tempat
   */
  get: async (payload: RecommendationPayload): Promise<RecommendationResponse['data']> => {
    const { data } = await apiClient.post<RecommendationResponse>('/recommendation', payload)
    return data.data
  },

  /**
   * Buat itinerary wisata otomatis
   * POST /api/v1/recommendation/planning
   * 
   * @param payload - Parameter planning (wilayah, jumlah_hari, budget, preferensi)
   * @returns Itinerary per hari dengan rekomendasi tempat
   */
  planning: async (payload: PlanningPayload): Promise<PlanningResponse['data']> => {
    const { data } = await apiClient.post<PlanningResponse>('/recommendation/planning', payload)
    return data.data
  },

  /**
   * Catat interaksi user untuk model rekomendasi
   * POST /api/v1/recommendation/history
   * 
   * @param payload - Data interaksi user (tipe_tempat, tempat_kode, aksi, rating, durasi)
   */
  trackHistory: async (payload: TrackHistoryPayload): Promise<void> => {
    await apiClient.post('/recommendation/history', payload)
  },
}