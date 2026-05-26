import { apiClient } from './client'
import type {
  RecommendationPayload,
  RecommendationResponse,
  PlanningPayload,
  PlanningResponse,
  PlanningDay,
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
    const res = await apiClient.post('/recommendation/planning', payload)

    const raw = res.data?.data?.data as {
      hari?: Array<{
        hari: number
        tanggal: string | null
        items: Array<{
          kode: string
          nama: string
          tipe: string
          wilayah: string
          alamat?: string | null
          rating_google?: number | null
          link_google_maps?: string | null
          harga_min?: number | null
          harga_max?: number | null
          estimasi_durasi_jam?: number | null
        }>
      }>
      estimasi_budget?: number | null
    } | undefined

    if (!raw?.hari || !Array.isArray(raw.hari)) {
      return { itinerary: [], total_budget: 0, total_durasi_jam: 0 }
    }

    let totalBudget = raw.estimasi_budget ?? 0
    let totalDurasi = 0

    const itinerary: PlanningDay[] = raw.hari.map((h) => ({
      hari: h.hari,
      tanggal: h.tanggal ?? '',
      tempat: h.items.map((item) => {
        const durasi = item.estimasi_durasi_jam ?? 1.5
        totalDurasi += durasi
        if (!raw.estimasi_budget && (item.harga_min ?? 0) > 0) {
          totalBudget += item.harga_max ?? item.harga_min ?? 0
        }
        return {
          kode: item.kode,
          nama: item.nama,
          tipe: (['wisata', 'kuliner', 'nongkrong'].includes(item.tipe)
            ? item.tipe
            : 'wisata') as 'wisata' | 'kuliner' | 'nongkrong',
          wilayah: item.wilayah,
          estimasi_durasi_jam: durasi,
          harga_estimasi: item.harga_max ?? item.harga_min ?? 0,
          alamat: item.alamat ?? null,
          rating: item.rating_google ?? null,
          link_maps: item.link_google_maps ?? null,
        }
      }),
    }))

    return { itinerary, total_hari: raw.hari.length, total_budget: totalBudget, total_durasi_jam: totalDurasi }
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