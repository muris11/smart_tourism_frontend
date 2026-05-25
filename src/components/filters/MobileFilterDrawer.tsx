/**
 * MobileFilterDrawer - Komponen filter drawer untuk mobile
 * 
 * Fitur:
 * - Tombol floating di pojok kanan bawah untuk membuka drawer
 * - Drawer yang muncul dari bawah layar (slide-up animation)
 * - Backdrop gelap dengan klik untuk menutup
 * - Filter lokal (local state) sebelum diterapkan
 * - Tombol Reset untuk mengosongkan semua filter
 * - Tombol Terapkan untuk menyimpan filter ke parent
 * - Responsif (hanya muncul di layar mobile, hidden di desktop)
 * - Fully customizable dengan props
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.filters - Nilai filter yang dipilih
 * @param {string} props.filters.wilayah - Filter wilayah yang dipilih
 * @param {string} props.filters.searchQuery - Query pencarian
 * @param {string} [props.filters.kategori] - Filter kategori (opsional)
 * @param {string} [props.filters.sentimen] - Filter sentimen (opsional)
 * @param {Function} props.onChange - Callback saat filter diterapkan
 * @param {Function} props.onReset - Callback untuk reset filter
 * @param {Object} [props.options] - Opsi filter tambahan
 * @param {string[]} [props.options.kategori] - Daftar opsi kategori
 * @param {string[]} [props.options.sentimen] - Daftar opsi sentimen
 * @param {string} [props.searchPlaceholder] - Placeholder input pencarian
 * @param {boolean} [props.showKategori=false] - Tampilkan filter kategori
 * @param {boolean} [props.showSentimen=false] - Tampilkan filter sentimen
 * @param {string} [props.buttonLabel='Filter'] - Label tombol filter
 * 
 * @returns {JSX.Element} Komponen mobile filter drawer
 * 
 * @example
 * // Penggunaan di halaman wisata
 * <MobileFilterDrawer
 *   filters={filters}
 *   onChange={handleFilterChange}
 *   onReset={handleReset}
 *   options={{ kategori: kategoriOptions }}
 *   showKategori={true}
 *   searchPlaceholder="Cari wisata..."
 *   buttonLabel="Filter Wisata"
 * />
 * 
 * @example
 * // Penggunaan di halaman kuliner
 * <MobileFilterDrawer
 *   filters={filters}
 *   onChange={handleFilterChange}
 *   onReset={handleReset}
 *   options={{ sentimen: ['positif', 'negatif', 'netral'] }}
 *   showSentimen={true}
 *   searchPlaceholder="Cari kuliner..."
 * />
 */
'use client'

import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { FilterContent } from './FilterContent'

/** Interface untuk props MobileFilterDrawer component */
interface MobileFilterDrawerProps {
    /** Nilai filter yang dipilih */
    filters: {
        wilayah: string
        searchQuery: string
        kategori?: string
        sentimen?: string
    }
    /** Callback untuk mengubah filter (dipanggil saat Terapkan diklik) */
    onChange: (key: string, value: string | number) => void
    /** Callback untuk reset semua filter */
    onReset: () => void
    /** Opsi filter yang tersedia */
    options?: {
        /** Daftar opsi kategori (untuk wisata/kuliner) */
        kategori?: string[]
        /** Daftar opsi sentimen (positif, negatif, netral) */
        sentimen?: string[]
    }
    /** Placeholder untuk input pencarian */
    searchPlaceholder?: string
    /** Tampilkan filter kategori (default: false) */
    showKategori?: boolean
    /** Tampilkan filter sentimen (default: false) */
    showSentimen?: boolean
    /** Label tombol filter (default: 'Filter') */
    buttonLabel?: string
}

/**
 * Komponen MobileFilterDrawer untuk filter di perangkat mobile
 * 
 * @param {MobileFilterDrawerProps} props - Component props
 * @returns {JSX.Element} Mobile filter drawer component
 */
export function MobileFilterDrawer({
    filters,
    onChange,
    onReset,
    options,
    searchPlaceholder,
    showKategori = false,
    showSentimen = false,
    buttonLabel = 'Filter',
}: MobileFilterDrawerProps) {
    /** State untuk membuka/tutup drawer */
    const [isOpen, setIsOpen] = useState(false)

    /** State lokal untuk filter sementara (sebelum diterapkan) */
    const [localFilters, setLocalFilters] = useState(filters)

    /**
     * Handler untuk menerapkan filter
     * - Iterasi semua localFilters yang memiliki nilai
     * - Panggil onChange untuk setiap filter
     * - Tutup drawer
     */
    const handleApply = () => {
        Object.entries(localFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                onChange(key, value)
            }
        })
        setIsOpen(false)
    }

    /**
     * Handler untuk perubahan filter lokal
     * @param key - Nama filter yang berubah
     * @param value - Nilai filter baru
     */
    const handleLocalChange = (key: string, value: string | number) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }))
    }

    /**
     * Handler untuk reset semua filter
     * - Reset localFilters ke nilai default kosong
     * - Panggil onReset dari parent
     * - Tutup drawer
     */
    const handleReset = () => {
        setLocalFilters({
            wilayah: '',
            searchQuery: '',
            kategori: '',
            sentimen: '',
        })
        onReset()
        setIsOpen(false)
    }

    return (
        <>
            {/* ========== TRIGGER BUTTON ========== */}
            {/* Tombol floating yang hanya muncul di mobile */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-brand-navy px-4 py-3 text-white shadow-lg transition-all hover:bg-brand-navy/90 active:scale-95 lg:hidden"
                aria-label="Buka filter"
            >
                <SlidersHorizontal className="h-5 w-5" />
                <span className="text-sm font-medium">{buttonLabel}</span>
            </button>

            {/* ========== FILTER DRAWER ========== */}
            <div
                className={cn(
                    'fixed inset-0 z-50 transition-all duration-300 lg:hidden',
                    isOpen ? 'visible' : 'invisible'
                )}
            >
                {/* Backdrop - Background gelap di belakang drawer */}
                <div
                    className={cn(
                        'absolute inset-0 bg-black/50 transition-opacity duration-300',
                        isOpen ? 'opacity-100' : 'opacity-0'
                    )}
                    onClick={() => setIsOpen(false)}
                    aria-label="Tutup filter"
                />

                {/* Drawer Content - Panel yang muncul dari bawah */}
                <div
                    className={cn(
                        'absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl bg-white shadow-xl transition-transform duration-300',
                        isOpen ? 'translate-y-0' : 'translate-y-full'
                    )}
                >
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                        <h3 className="text-lg font-semibold text-brand-navy">Filter</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-1.5 transition-colors hover:bg-slate-100"
                            aria-label="Tutup"
                        >
                            <X className="h-5 w-5 text-slate-500" />
                        </button>
                    </div>

                    {/* Drawer Body - Filter Content */}
                    <div
                        className="overflow-y-auto px-5 py-4"
                        style={{ maxHeight: 'calc(85vh - 130px)' }}
                    >
                        <FilterContent
                            filters={localFilters}
                            onChange={handleLocalChange}
                            options={options}
                            searchPlaceholder={searchPlaceholder}
                            showKategori={showKategori}
                            showSentimen={showSentimen}
                        />
                    </div>

                    {/* Drawer Footer - Action Buttons */}
                    <div className="flex gap-3 border-t border-slate-200 px-5 py-4">
                        {/* Reset Button */}
                        <button
                            onClick={handleReset}
                            className="flex-1 rounded-full border border-slate-300 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
                        >
                            Reset
                        </button>

                        {/* Apply Button */}
                        <button
                            onClick={handleApply}
                            className="flex-1 rounded-full bg-brand-navy py-3 text-sm font-semibold text-white transition-all hover:bg-brand-navy/90 active:scale-95"
                        >
                            Terapkan
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}