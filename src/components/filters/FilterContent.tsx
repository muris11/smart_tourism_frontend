/**
 * FilterContent - Komponen filter reusable untuk halaman wisata, kuliner, nongkrong
 * 
 * Fitur:
 * - Filter wilayah (Cirebon, Indramayu, Majalengka, Kuningan)
 * - Filter kategori (opsional, untuk wisata/kuliner)
 * - Filter sentimen (opsional, untuk rating ulasan)
 * - Pencarian teks dengan icon search
 * - Desain chip button dengan styling aktif/inaktif
 * - Responsive layout dengan flex wrap
 * - Fully customizable dengan props
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.filters - Nilai filter yang sedang dipilih
 * @param {string} props.filters.wilayah - Filter wilayah yang dipilih
 * @param {string} props.filters.searchQuery - Query pencarian
 * @param {string} [props.filters.kategori] - Filter kategori (opsional)
 * @param {string} [props.filters.sentimen] - Filter sentimen (opsional)
 * @param {Function} props.onChange - Callback saat filter berubah
 * @param {Object} [props.options] - Opsi filter tambahan
 * @param {string[]} [props.options.kategori] - Daftar opsi kategori
 * @param {string[]} [props.options.sentimen] - Daftar opsi sentimen
 * @param {string} [props.searchPlaceholder='Cari...'] - Placeholder input pencarian
 * @param {boolean} [props.showKategori=false] - Tampilkan filter kategori
 * @param {boolean} [props.showSentimen=false] - Tampilkan filter sentimen
 * 
 * @returns {JSX.Element} Komponen filter content
 * 
 * @example
 * // Untuk halaman wisata
 * <FilterContent
 *   filters={filters}
 *   onChange={handleFilterChange}
 *   options={{ kategori: ['Alam', 'Bahari', 'Budaya'] }}
 *   showKategori={true}
 *   searchPlaceholder="Cari wisata..."
 * />
 * 
 * @example
 * // Untuk halaman kuliner
 * <FilterContent
 *   filters={filters}
 *   onChange={handleFilterChange}
 *   options={{ sentimen: ['positif', 'negatif', 'netral'] }}
 *   showSentimen={true}
 *   searchPlaceholder="Cari kuliner..."
 * />
 */
'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useState, useEffect } from 'react'
import { regionsApi } from '@/lib/api/regions'

/** Interface untuk props FilterContent component */
interface FilterContentProps {
    /** Nilai filter yang dipilih */
    filters: {
        wilayah: string
        searchQuery: string
        kategori?: string
        sentimen?: string
    }
    /** Callback untuk mengubah filter */
    onChange: (key: string, value: string | number) => void
    /** Opsi filter yang tersedia (opsional) */
    options?: {
        /** Daftar opsi kategori (untuk wisata/kuliner) */
        kategori?: string[]
        /** Daftar opsi sentimen (positif, negatif, netral) */
        sentimen?: string[]
    }
    /** Placeholder untuk input pencarian (default: 'Cari...') */
    searchPlaceholder?: string
    /** Tampilkan filter kategori (default: false) */
    showKategori?: boolean
    /** Tampilkan filter sentimen (default: false) */
    showSentimen?: boolean
}

/**
 * Komponen FilterContent reusable untuk berbagai halaman
 * 
 * @param {FilterContentProps} props - Component props
 * @returns {JSX.Element} Filter content component
 */
export function FilterContent({
    filters,
    onChange,
    options,
    searchPlaceholder = 'Cari...',
    showKategori = false,
    showSentimen = false,
}: FilterContentProps) {
    const [wilayahOptions, setWilayahOptions] = useState<string[]>([])

    useEffect(() => {
        regionsApi.list().then(data => {
            setWilayahOptions(data.map(r => r.name))
        }).catch(console.error)
    }, [])

    /** Opsi sentimen default jika tidak disediakan */
    const sentimenOptions = options?.sentimen || ['positif', 'negatif', 'netral']

    return (
        <div className="space-y-6">

            {/* ========== WILAYAH FILTER ========== */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Wilayah
                </label>
                <div className="flex flex-wrap gap-2">
                    {/* Tombol "Semua" Wilayah */}
                    <button
                        onClick={() => onChange('wilayah', '')}
                        className={cn(
                            'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                            !filters.wilayah
                                ? 'bg-brand-navy text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        )}
                    >
                        Semua
                    </button>

                    {/* Daftar Wilayah */}
                    {wilayahOptions.length === 0 ? (
                        <span className="text-sm text-slate-400 py-2">Memuat wilayah...</span>
                    ) : (
                        wilayahOptions.map((w) => (
                            <button
                                key={w}
                                onClick={() => onChange('wilayah', w)}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                                    filters.wilayah === w
                                        ? 'bg-brand-navy text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                )}
                            >
                                {w}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* ========== KATEGORI FILTER (OPTIONAL) ========== */}
            {showKategori && options?.kategori && options.kategori.length > 0 && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Kategori
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {/* Tombol "Semua" Kategori */}
                        <button
                            onClick={() => onChange('kategori', '')}
                            className={cn(
                                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                                !filters.kategori
                                    ? 'bg-brand-navy text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            )}
                        >
                            Semua
                        </button>

                        {/* Daftar Kategori */}
                        {options.kategori.map((k) => (
                            <button
                                key={k}
                                onClick={() => onChange('kategori', k)}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                                    filters.kategori === k
                                        ? 'bg-brand-navy text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                )}
                            >
                                {k}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ========== SENTIMEN FILTER (OPTIONAL) ========== */}
            {showSentimen && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Sentimen
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {/* Tombol "Semua" Sentimen */}
                        <button
                            onClick={() => onChange('sentimen', '')}
                            className={cn(
                                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                                !filters.sentimen
                                    ? 'bg-brand-navy text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            )}
                        >
                            Semua
                        </button>

                        {/* Daftar Sentimen (Positif, Negatif, Netral) */}
                        {sentimenOptions.map((s) => (
                            <button
                                key={s}
                                onClick={() => onChange('sentimen', s)}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                                    filters.sentimen === s
                                        ? 'bg-brand-navy text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                )}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ========== SEARCH INPUT ========== */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Cari
                </label>
                <div className="relative">
                    {/* Search Icon */}
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    {/* Search Input */}
                    <input
                        type="text"
                        value={filters.searchQuery}
                        onChange={(e) => onChange('searchQuery', e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
                        aria-label="Pencarian"
                    />
                </div>
            </div>
        </div>
    )
}