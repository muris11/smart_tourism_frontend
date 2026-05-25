/**
 * ValuesSection - Komponen untuk menampilkan nilai-nilai yang dipegang perusahaan
 * 
 * Fitur:
 * - Menampilkan 3 nilai utama (Berkelanjutan, Otentisitas, Inklusif)
 * - Setiap nilai memiliki icon, judul, dan deskripsi
 * - Layout grid responsif (1 kolom di mobile, 3 kolom di desktop)
 * - Icon dalam lingkaran dengan background putih dan shadow
 * - Warna konsisten dengan tema brand (brand-green, brand-navy, brand-pale)
 * 
 * @component
 * @returns {JSX.Element} Komponen values section
 * 
 * @example
 * // Penggunaan di halaman tentang kami
 * <ValuesSection />
 * 
 * @example
 * // Penggunaan setelah hero section
 * <>
 *   <HeroSection />
 *   <ValuesSection />
 * </>
 */
'use client'

import { Leaf, Star, Users } from 'lucide-react'

/** Interface untuk item value */
interface ValueItem {
    /** Judul nilai yang ditampilkan */
    title: string
    /** Deskripsi penjelasan nilai */
    description: string
    /** Icon dari lucide-react untuk nilai tersebut */
    icon: typeof Leaf
}

/** Data nilai-nilai yang ditampilkan */
const values: ValueItem[] = [
    {
        title: 'Berkelanjutan',
        description:
            'Kami merekomendasikan tempat-tempat yang bertanggung jawab secara ekologis dan memberdayakan ekonomi masyarakat lokal.',
        icon: Leaf,
    },
    {
        title: 'Otentisitas',
        description:
            'Tidak ada ulasan titipan. Semua diarahkan ke pengalaman yang lebih jujur dan lebih terasa lokal.',
        icon: Star,
    },
    {
        title: 'Inklusif',
        description:
            'Panduan untuk berbagai gaya perjalanan: santai, spontan, keluarga, maupun eksplorasi mandiri.',
        icon: Users,
    },
]

/**
 * Komponen ValuesSection untuk menampilkan nilai-nilai perusahaan
 * 
 * @returns {JSX.Element} Values section dengan grid 3 kolom
 */
export default function ValuesSection() {
    return (
        <section className="bg-brand-pale py-16 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">

                {/* Header Section */}
                <div className="mb-10 text-center md:mb-12 lg:mb-16">
                    <h2 className="text-2xl font-bold text-brand-navy md:text-3xl lg:text-4xl">
                        Nilai yang Kami Pegang
                    </h2>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
                    {values.map(({ title, description, icon: Icon }) => (
                        <div key={title} className="group text-center">

                            {/* Icon Circle */}
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300 group-hover:shadow-md md:mb-5 lg:mb-6 lg:h-16 lg:w-16">
                                <Icon className="h-6 w-6 text-brand-green transition-all duration-300 group-hover:scale-110 lg:h-7 lg:w-7" />
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 text-xl font-semibold text-brand-navy md:text-2xl lg:mb-3">
                                {title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm leading-relaxed font-light text-slate-500 md:text-base">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}