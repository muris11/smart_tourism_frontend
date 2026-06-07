import apiClient from './client'
import { makeBrowserCacheKey, withBrowserCache } from '@/lib/cache/browserStorage'
import { ApiResponse } from '@/types'

export interface RegionData {
  id: number
  name: string
  code: string
  latitude: number
  longitude: number
  color_hex: string
  description: string
  is_active: boolean
}

export const regionsApi = {
  /** Mendapatkan daftar semua wilayah aktif */
  list: async (): Promise<RegionData[]> => {
    return withBrowserCache(
      makeBrowserCacheKey('regions:list'),
      24 * 60 * 60 * 1000,
      async () => {
        const response = await apiClient.get<ApiResponse<RegionData[]>>('/regions')
        return response.data.data || []
      }
    )
  },
}
