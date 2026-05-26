/**
 * RatingStars - Komponen bintang rating untuk memberikan penilaian
 * 
 * Fitur:
 * - Menampilkan rating dalam bentuk bintang (1-5)
 * - Mendukung mode readonly (hanya tampil) dan interaktif (bisa klik)
 * - Hover effect untuk preview rating sebelum klik
 * - 3 ukuran: sm, md, lg
 * - Animasi hover scale pada mode interaktif
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.rating - Nilai rating saat ini (1-5)
 * @param {function} [props.onRate] - Callback saat user memberikan rating
 * @param {boolean} [props.readonly=true] - Mode readonly (tidak bisa diubah)
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Ukuran bintang
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Komponen bintang rating
 * 
 * @example
 * // Readonly mode (menampilkan rating)
 * <RatingStars rating={4.5} readonly={true} />
 * 
 * @example
 * // Interactive mode (bisa memberi rating)
 * <RatingStars rating={0} readonly={false} onRate={(value) => value} />
 * 
 * @example
 * // Large size untuk tampilan desktop
 * <RatingStars rating={4} size="lg" />
 */
'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/** Interface untuk props RatingStars component */
interface RatingStarsProps {
    /** Nilai rating saat ini (1-5) */
    rating: number
    /** Callback saat user memberikan rating (hanya jika readonly=false) */
    onRate?: (rating: number) => void
    /** Mode readonly - true: hanya tampil, false: bisa diinteraksi (default: true) */
    readonly?: boolean
    /** Ukuran bintang (default: 'md') */
    size?: 'sm' | 'md' | 'lg'
    /** Additional CSS classes */
    className?: string
}

/** Mapping class CSS untuk setiap ukuran bintang */
const sizeClasses = {
    /** Ukuran kecil - untuk mobile atau space terbatas */
    sm: 'h-4 w-4',
    /** Ukuran sedang - default, untuk kebanyakan kasus */
    md: 'h-5 w-5',
    /** Ukuran besar - untuk tampilan desktop atau hero section */
    lg: 'h-6 w-6',
}

/**
 * Komponen RatingStars untuk menampilkan dan memberikan rating bintang
 * 
 * @param {RatingStarsProps} props - Component props
 * @returns {JSX.Element} Rating stars component
 */
export default function RatingStars({
    rating,
    onRate,
    readonly = true,
    size = 'md',
    className,
}: RatingStarsProps) {
    /** State untuk rating saat hover (preview sebelum klik) */
    const [hoverRating, setHoverRating] = useState(0)

    /** State untuk rating yang dipilih user (mode interaktif) */
    const [currentRating, setCurrentRating] = useState(rating)

    /**
     * Handler untuk klik pada bintang
     * @param value - Nilai rating yang dipilih (1-5)
     */
    const handleClick = (value: number) => {
        if (readonly) return  // Skip jika readonly
        setCurrentRating(value)
        onRate?.(value)       // Panggil callback dengan nilai rating
    }

    /**
     * Menentukan rating yang ditampilkan:
     * - Mode readonly: menggunakan props rating
     * - Mode interaktif: menggunakan hoverRating (jika ada) atau currentRating
     */
    const displayRating = readonly ? rating : hoverRating || currentRating

    return (
        <div
            className={cn('flex items-center gap-1', className)}
            onMouseLeave={() => !readonly && setHoverRating(0)} // Reset hover saat kursor meninggalkan area
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => !readonly && setHoverRating(star)} // Preview rating saat hover
                    disabled={readonly}
                    className={cn(
                        !readonly && 'cursor-pointer transition-transform hover:scale-110'
                    )}
                    aria-label={`Berikan rating ${star} bintang`}
                >
                    <Star
                        className={cn(
                            sizeClasses[size],
                            // Bintang terisi jika star <= rating yang ditampilkan
                            star <= displayRating
                                ? 'fill-amber-500 text-amber-500'  // Bintang terisi (warna kuning)
                                : 'text-slate-300',                 // Bintang kosong (warna abu-abu)
                            !readonly && 'transition-colors'      // Animasi warna jika interaktif
                        )}
                    />
                </button>
            ))}
        </div>
    )
}