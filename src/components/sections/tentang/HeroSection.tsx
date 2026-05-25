/**
 * HeroSection - Komponen hero untuk halaman tentang kami
 * 
 * Fitur:
 * - Background image full-width dengan overlay gelap
 * - Teks putih dengan transparansi untuk readability
 * - Responsive typography (mobile ke desktop)
 * - Menggunakan Next.js Image untuk optimasi
 * - Priority loading untuk LCP (Largest Contentful Paint)
 * - Border radius di semua sisi dengan shadow untuk efek card
 * 
 * @component
 * @returns {JSX.Element} Komponen hero section
 */
'use client'

import Image from 'next/image'

export default function HeroSection() {
    return (
        <section className="mb-16 px-4 md:mb-24 md:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-4xl shadow-xl">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop"
                        alt="Pemandangan pegunungan yang indah dengan kabut pagi"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                        unoptimized
                    />
                    {/* Dark Overlay untuk meningkatkan readability teks */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 container mx-auto px-4 py-24 md:px-6 md:py-32 lg:py-40">
                    <div className="max-w-3xl lg:max-w-4xl md:ml-6 lg:ml-12">
                        {/* Badge Label */}
                        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/80 md:mb-4">
                            Tentang Kami
                        </span>

                        {/* Main Heading */}
                        <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
                            Menjaga keaslian,
                            <br />
                            merayakan keragaman.
                        </h1>

                        {/* Description Subtext */}
                        <p className="max-w-2xl text-base font-light leading-relaxed text-white/80 md:text-lg">
                            Sebuah inisiatif independen yang didedikasikan untuk
                            merekam dan memandu perjalanan otentik di seluruh
                            pelosok Indonesia.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}