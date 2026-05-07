import { ApiResponse } from '@/types/api'
import { SentimentSummary } from '@/types/sentiment'
import { apiClient } from './client'

export const sentimentApi = {
  summary: async (wilayah: string): Promise<SentimentSummary> => {
    const { data } = await apiClient.get<ApiResponse<SentimentSummary>>(`/sentiment/summary/${wilayah}`)
    return data.data as SentimentSummary
  },
}
