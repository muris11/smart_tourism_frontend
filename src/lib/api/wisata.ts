import { apiClient } from './client'
import { makeBrowserCacheKey, withBrowserCache } from '@/lib/cache/browserStorage'
import type {
  WisataFilter,
  WisataListResponse,
  WisataDetailResponse
} from '@/types'

const PUBLIC_LIST_TTL = 30 * 60 * 1000

function shouldCacheList(filters?: WisataFilter) {
  return !filters?.q && (filters?.per_page ?? 10) <= 100
}

export const wisataApi = {
  /**
   * Daftar semua wisata (publik)
   * GET /api/v1/wisata/
   * 
   * @param filters - Filter untuk list wisata (wilayah, kategori_utama, sentimen, q, sort, page, per_page)
   * @returns Object berisi items (array wisata) dan metadata pagination
   */
  list: async (filters?: WisataFilter) => {
    const fetchList = async () => {
      const { data } = await apiClient.get<WisataListResponse>('/wisata', { params: filters })
      return {
        items: data.data,
        total: data.meta.total,
        total_pages: data.meta.last_page,
        page: data.meta.current_page,
        limit: data.meta.per_page,
      }
    }

    if (!shouldCacheList(filters)) {
      return fetchList()
    }

    return withBrowserCache(
      makeBrowserCacheKey('wisata:list', filters),
      PUBLIC_LIST_TTL,
      fetchList
    )
  },

  /**
   * Detail wisata berdasarkan kode
   * GET /api/v1/wisata/{kode}
   * 
   * @param kode - Kode unik wisata (contoh: WIS-CRB-012)
   * @returns Data detail wisata lengkap
   */
  detail: async (kode: string): Promise<WisataDetailResponse['data']> => {
    const { data } = await apiClient.get<WisataDetailResponse>(`/wisata/${kode}`)
    return data.data
  },
}
