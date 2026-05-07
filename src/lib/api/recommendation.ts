import { ApiResponse } from '@/types/api'
import { PlanningPayload, PlanningResult, RecommendationPayload, RekoItem } from '@/types/recommendation'
import { apiClient } from './client'

export const recommendationApi = {
  get: async (payload: RecommendationPayload): Promise<RekoItem[]> => {
    const { data } = await apiClient.post<ApiResponse<RekoItem[]>>('/recommendation', payload)
    return data.data ?? []
  },
  planning: async (payload: PlanningPayload): Promise<PlanningResult> => {
    const { data } = await apiClient.post<ApiResponse<PlanningResult>>('/recommendation/planning', payload)
    return data.data as PlanningResult
  },
  trackHistory: async (payload: {
    tipe_tempat: string
    tempat_kode: string
    aksi: string
    rating_user?: number
  }) => {
    await apiClient.post('/recommendation/history', payload)
  },
}
