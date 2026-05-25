/**
 * FilterPanel - Komponen panel filter untuk desktop
 * 
 * Fitur:
 * - Menampilkan berbagai opsi filter (wilayah, search, kategori, sentimen)
 * - Mendukung reset semua filter dengan satu tombol
 * - Terintegrasi dengan FilterContent untuk konten filter
 * - Props fleksibel untuk menampilkan/menyembunyikan filter tertentu
 * - Desain card dengan border dan background putih
 * - Responsif dengan padding konsisten
 * - Menggunakan cn() utility untuk merge className
 * - TypeScript support dengan interface Props yang lengkap
 * 
 * @component
 * @param {FilterPanelProps} props - Component props
 * @param {Object} props.filters - Nilai filter yang dipilih (wilayah, searchQuery, kategori, sentimen)
 * @param {Function} props.onChange - Callback untuk mengubah filter (key, value)
 * @param {Function} props.onReset - Callback untuk reset semua filter
 * @param {Object} [props.options] - Opsi filter yang tersedia (kategori, sentimen)
 * @param {string} [props.searchPlaceholder] - Placeholder untuk input search
 * @param {boolean} [props.showKategori=false] - Tampilkan filter kategori
 * @param {boolean} [props.showSentimen=false] - Tampilkan filter sentimen
 * @param {string} [props.className] - Class name tambahan
 * @returns {JSX.Element} Komponen filter panel desktop
 * 
 * @example
 * // Penggunaan dengan semua filter
 * <FilterPanel
 *   filters={{ wilayah: 'Cirebon', searchQuery: '' }}
 *   onChange={(key, value) => handleChange(key, value)}
 *   onReset={() => handleReset()}
 *   options={{ kategori: ['Wisata', 'Kuliner'], sentimen: ['Positif', 'Netral'] }}
 *   showKategori={true}
 *   showSentimen={true}
 * />
 * 
 * @example
 * // Penggunaan minimal hanya wilayah dan search
 * <FilterPanel
 *   filters={{ wilayah: '', searchQuery: '' }}
 *   onChange={(key, value) => setFilters({ ...filters, [key]: value })}
 *   onReset={() => setFilters({ wilayah: '', searchQuery: '' })}
 *   searchPlaceholder="Cari destinasi..."
 * />
 */
'use client'

import { cn } from '@/lib/utils/cn'
import { FilterContent } from './FilterContent'

interface FilterPanelProps {
    /** Nilai filter yang dipilih */
    filters: {
        wilayah: string
        searchQuery: string
        kategori?: string
        sentimen?: string
    }
    /** Callback untuk mengubah filter */
    onChange: (key: string, value: string | number) => void
    /** Callback untuk reset semua filter */
    onReset: () => void
    /** Opsi filter yang tersedia */
    options?: {
        kategori?: string[]
        sentimen?: string[]
    }
    /** Placeholder untuk search */
    searchPlaceholder?: string
    /** Tampilkan filter kategori */
    showKategori?: boolean
    /** Tampilkan filter sentimen */
    showSentimen?: boolean
    /** Class name tambahan */
    className?: string
}

/**
 * Komponen filter panel untuk desktop
 * Menampilkan panel filter dengan berbagai opsi penyaringan data
 * 
 * @param {FilterPanelProps} props - Component props
 * @returns {JSX.Element} Panel filter dengan judul, reset button, dan konten filter
 */
export function FilterPanel({
    filters,
    onChange,
    onReset,
    options,
    searchPlaceholder,
    showKategori = false,
    showSentimen = false,
    className,
}: FilterPanelProps) {
    return (
        <div className={cn('rounded-2xl border border-slate-200 bg-white p-6', className)}>
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-brand-navy">Filter</h3>
                <button onClick={onReset} className="text-sm text-brand-navy hover:underline">
                    Reset
                </button>
            </div>

            <FilterContent
                filters={filters}
                onChange={onChange}
                options={options}
                searchPlaceholder={searchPlaceholder}
                showKategori={showKategori}
                showSentimen={showSentimen}
            />
        </div>
    )
}