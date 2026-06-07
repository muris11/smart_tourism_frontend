'use client'

import useSWR from 'swr'
import { wisataApi } from '@/lib/api/wisata'
import type { WisataItem, WisataDetail, WisataFilter } from '@/types'

const PUBLIC_DATA_DEDUPE_INTERVAL = 5 * 60 * 1000

/** Hook untuk mendapatkan daftar wisata dengan filter */
export function useWisata(params?: WisataFilter) {
  const key = params ? ['wisata', JSON.stringify(params)] : ['wisata']

  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => wisataApi.list(params || {}),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: PUBLIC_DATA_DEDUPE_INTERVAL,
      keepPreviousData: true,
    }
  )

  return {
    data: (data?.items as WisataItem[]) ?? [],
    meta: {
      current_page: data?.page || 1,
      per_page: data?.limit || 10,
      total: data?.total || 0,
      last_page: data?.total_pages || 1,
    },
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}

/**
 * Hook untuk mendapatkan detail wisata berdasarkan kode
 * @param kode - Kode unik wisata (contoh: WIS-CRB-012)
 */
export function useWisataDetail(kode: string) {
  const { data, error, isLoading } = useSWR(
    kode ? `wisata-detail-${kode}` : null,
    () => wisataApi.detail(kode),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  )

  return {
    wisata: data as WisataDetail | null,
    isLoading,
    isError: !!error,
    error,
  }
}

/**
 * Hook untuk mendapatkan wisata unggulan (rating tertinggi)
 * @param limit - Jumlah data yang diambil (default: 4)
 */
export function useFeaturedWisata(per_page: number = 4) {
  return useWisata({
    per_page,
    sort: 'rating',
  })
}
