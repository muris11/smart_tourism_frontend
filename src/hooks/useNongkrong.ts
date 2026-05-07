'use client'

import useSWR from 'swr'
import { nongkrongApi } from '@/lib/api/nongkrong'
import { ListFilter } from '@/types/api'

export function useNongkrongList(filters: ListFilter & { tipe?: string; ada_wifi?: boolean }) {
  const key = ['nongkrong', JSON.stringify(filters)]
  const { data, error, isLoading } = useSWR(key, () => nongkrongApi.list(filters), {
    revalidateOnFocus: false,
  })

  return { data: data?.data ?? [], meta: data?.meta, isLoading, isError: !!error }
}

export function useNongkrongDetail(kode: string) {
  const { data, error, isLoading } = useSWR(
    kode ? `nongkrong-detail-${kode}` : null,
    () => nongkrongApi.detail(kode)
  )
  return { nongkrong: data, isLoading, isError: !!error }
}
