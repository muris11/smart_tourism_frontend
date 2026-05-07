'use client'

import useSWR from 'swr'
import { wisataApi } from '@/lib/api/wisata'
import { ListFilter } from '@/types/api'

export function useWisataList(filters: ListFilter) {
  const key = ['wisata', JSON.stringify(filters)]
  const { data, error, isLoading, mutate } = useSWR(key, () => wisataApi.list(filters), {
    revalidateOnFocus: false,
  })

  return {
    data: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    isError: !!error,
    mutate,
  }
}

export function useWisataDetail(kode: string) {
  const { data, error, isLoading } = useSWR(
    kode ? `wisata-detail-${kode}` : null,
    () => wisataApi.detail(kode),
    { revalidateOnFocus: false }
  )

  return { wisata: data, isLoading, isError: !!error }
}
