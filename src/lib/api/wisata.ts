import { ApiResponse, ListFilter, PaginatedResponse } from '@/types/api'
import { WisataDetail, WisataItem } from '@/types/wisata'
import { apiClient } from './client'

export const wisataApi = {
  list: async (filters: ListFilter = {}) => {
    const { data } = await apiClient.get<PaginatedResponse<WisataItem>>('/wisata', { params: filters })
    return data
  },
  detail: async (kode: string) => {
    const { data } = await apiClient.get<ApiResponse<WisataDetail>>(`/wisata/${kode}`)
    return data.data
  },
}
