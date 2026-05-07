import { ApiResponse, ListFilter, PaginatedResponse } from '@/types/api'
import { KulinerDetail, KulinerItem } from '@/types/kuliner'
import { apiClient } from './client'

export const kulinerApi = {
  list: async (filters: ListFilter & { jenis?: string } = {}) => {
    const { data } = await apiClient.get<PaginatedResponse<KulinerItem>>('/kuliner', { params: filters })
    return data
  },
  detail: async (kode: string) => {
    const { data } = await apiClient.get<ApiResponse<KulinerDetail>>(`/kuliner/${kode}`)
    return data.data
  },
}
