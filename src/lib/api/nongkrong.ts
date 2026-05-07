import { ApiResponse, ListFilter, PaginatedResponse } from '@/types/api'
import { NongkrongDetail, NongkrongItem } from '@/types/nongkrong'
import { apiClient } from './client'

export const nongkrongApi = {
  list: async (filters: ListFilter & { tipe?: string; ada_wifi?: boolean } = {}) => {
    const { data } = await apiClient.get<PaginatedResponse<NongkrongItem>>('/nongkrong', { params: filters })
    return data
  },
  detail: async (kode: string) => {
    const { data } = await apiClient.get<ApiResponse<NongkrongDetail>>(`/nongkrong/${kode}`)
    return data.data
  },
}
