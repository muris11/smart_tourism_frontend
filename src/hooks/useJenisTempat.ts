'use client'

import { useMemo } from 'react'
import { useKuliner } from './useKuliner'

/** Interface untuk return value hook */
interface UseJenisTempatReturn {
    jenis: string[]
    isLoading: boolean
    error: Error | null
}

/** Hook untuk mendapatkan daftar jenis tempat kuliner unik dari API */
export function useJenisTempat(per_page: number = 50): UseJenisTempatReturn {
    const { data, isLoading, error } = useKuliner({ per_page })

    const jenis = useMemo(() => {
        if (!data || data.length === 0) return []

        const uniqueJenis = [...new Set(
            data
                .map((item) => item.jenis_tempat)
                .filter((jenis): jenis is string =>
                    jenis !== null && jenis !== undefined && jenis.trim() !== ''
                )
        )]

        return uniqueJenis.sort((a, b) => a.localeCompare(b, 'id'))
    }, [data])

    return { jenis, isLoading, error }
}