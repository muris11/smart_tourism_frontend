'use client'

import { useMemo } from 'react'
import { useWisata } from './useWisata'

/** Hook untuk mendapatkan daftar kategori wisata unik dari API */
export function useKategoriWisata() {
    const { data, isLoading } = useWisata({ per_page: 50, page: 1 })

    const kategori = useMemo(() => {
        if (!data || data.length === 0) return []
        const unique = [...new Set(data.map((item) => item.kategori_utama).filter((k): k is string => k !== null))]
        return unique.sort()
    }, [data])

    return { kategori, isLoading }
}