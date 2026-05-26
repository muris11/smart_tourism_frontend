import { apiClient } from './client'

export interface SavedPlanning {
  id: number
  user_id: number
  judul: string
  wilayah: string[]
  tanggal_mulai: string | null
  tanggal_selesai: string | null
  jumlah_orang: number
  budget_total: number | null
  catatan: string | null
  items: unknown[]
  status: string
  created_at: string
  updated_at: string
}

export const planningApi = {
  list: async (): Promise<SavedPlanning[]> => {
    const { data } = await apiClient.get<{
      success: boolean
      data: SavedPlanning[]
    }>('/planning')
    return data.data ?? []
  },

  destroy: async (id: number): Promise<void> => {
    await apiClient.delete(`/planning/${id}`)
  },
}

export default planningApi
