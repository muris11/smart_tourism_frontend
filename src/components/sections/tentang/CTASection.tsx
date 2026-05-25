/**
 * CTASection - Komponen Call to Action untuk mengajak user bergabung
 * 
 * Fitur:
 * - Menampilkan pesan ajakan yang inspiratif
 * - Tombol CTA yang mencolok untuk registrasi
 * - Desain minimalis dengan fokus pada konversi
 * - Responsif dengan padding yang proporsional
 * - Shadow dan hover effect pada tombol
 * 
 * @component
 * @returns {JSX.Element} Komponen CTA section
 * 
 * @example
 * // Penggunaan di halaman beranda
 * <CTASection />
 * 
 * @example
 * // Penggunaan setelah testimonial
 * <div className="mt-16">
 *   <CTASection />
 * </div>
 */
'use client'

import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

/**
 * Komponen CTASection untuk mengajak pengguna mendaftar
 * 
 * @returns {JSX.Element} CTA section component
 */
export default function CTASection() {
    return (
        <section className="px-6 py-24 text-center">

            {/* Main Heading */}
            <h2 className="mb-6 text-3xl font-bold text-brand-navy md:text-4xl">
                Mari menjadi bagian dari cerita
            </h2>

            {/* Description Subtext */}
            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
                Kami mengundang Anda untuk turut merawat ingatan dan
                membagikan pengalaman perjalanan otentik Anda.
            </p>

            {/* CTA Button */}
            <Link
                href={ROUTES.REGISTER}
                className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-brand-navy/90 hover:scale-105 md:px-8 md:py-4"
                aria-label="Daftar sekarang dan bergabung dengan komunitas"
            >
                Bergabung dengan Komunitas
            </Link>
        </section>
    )
}