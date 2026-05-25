/**
 * FAQSection - Komponen bagian Pertanyaan yang Sering Diajukan
 * 
 * Fitur:
 * - Menampilkan daftar pertanyaan dan jawaban dalam format accordion
 * - Animasi dropdown saat membuka/menutup jawaban
 * - Icon chevron berputar saat accordion terbuka
 * - Hanya satu item yang terbuka dalam satu waktu
 * - Desain responsif dengan border dan shadow
 * 
 * @component
 * @returns {JSX.Element} Komponen FAQ section
 * 
 * @example
 * // Penggunaan di halaman beranda
 * <FAQSection />
 * 
 * @example
 * // Penggunaan di halaman bantuan
 * <div className="mt-16">
 *   <FAQSection />
 * </div>
 */
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/** Data FAQ statis yang ditampilkan */
const faqs = [
    {
        question: 'Apa itu CITRA?',
        answer:
            'CITRA (Ciayumajakuning Intelligent Tourism & Recommendation Assistant) adalah platform smart tourism berbasis AI yang membantu wisatawan merencanakan perjalanan di wilayah Ciayumajakuning (Cirebon, Indramayu, Majalengka, Kuningan).',
    },
    {
        question: 'Apakah layanan ini gratis?',
        answer:
            'Ya, layanan dasar CITRA sepenuhnya gratis. Anda dapat menjelajahi destinasi wisata, kuliner, dan tempat nongkrong tanpa biaya. Beberapa fitur premium mungkin akan ditambahkan di masa depan.',
    },
    {
        question: 'Bagaimana cara kerja rekomendasi AI?',
        answer:
            'Rekomendasi AI kami menggunakan algoritma content-based filtering yang mempertimbangkan preferensi Anda seperti wilayah, kategori tempat, budget, dan sentimen publik dari ulasan pengunjung.',
    },
    {
        question: 'Apakah data saya aman?',
        answer:
            'Kami sangat memperhatikan privasi dan keamanan data pengguna. Data Anda dienkripsi dan tidak akan pernah dibagikan kepada pihak ketiga tanpa izin Anda.',
    },
    {
        question: 'Bagaimana cara login atau membuat akun?',
        answer:
            'Anda dapat mendaftar dengan mengklik tombol "Daftar" di pojok kanan atas halaman. Cukup masukkan nama, email, dan password. Setelah registrasi, Anda bisa langsung login.',
    },
    {
        question: 'Apakah CITRA tersedia di mobile?',
        answer:
            'Ya, website CITRA sepenuhnya responsif dan dapat diakses dengan nyaman dari smartphone, tablet, maupun desktop.',
    },
    {
        question: 'Bagaimana jika ada data destinasi yang salah?',
        answer:
            'Anda dapat melaporkan data yang tidak akurat melalui halaman Kontak atau mengirim email ke support@citra.id. Tim kami akan segera melakukan verifikasi dan perbaikan.',
    },
]

/** Interface untuk props FAQItem component */
interface FAQItemProps {
    /** Pertanyaan yang akan ditampilkan */
    question: string
    /** Jawaban yang akan ditampilkan saat accordion terbuka */
    answer: string
    /** Status apakah accordion sedang terbuka */
    isOpen: boolean
    /** Fungsi untuk toggle accordion */
    onToggle: () => void
}

/**
 * Komponen FAQItem - Menampilkan satu item FAQ dalam bentuk accordion
 * 
 * @param {FAQItemProps} props - Component props
 * @returns {JSX.Element} FAQ item dengan accordion
 */
function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
    return (
        <div className="border-b border-slate-200 last:border-0">
            {/* Accordion Header / Question Button */}
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between py-5 text-left transition-all hover:text-brand-navy"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Tutup' : 'Buka'} jawaban untuk ${question}`}
            >
                <span className="text-base font-medium text-brand-navy md:text-lg">
                    {question}
                </span>

                {/* Chevron Icon - Rotate when open */}
                <ChevronDown
                    className={cn(
                        'h-5 w-5 text-slate-400 transition-transform duration-300',
                        isOpen && 'rotate-180'
                    )}
                    aria-hidden="true"
                />
            </button>

            {/* Accordion Content / Answer */}
            <div
                className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                )}
                aria-hidden={!isOpen}
            >
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                    {answer}
                </p>
            </div>
        </div>
    )
}

/**
 * FAQSection - Komponen utama untuk menampilkan semua FAQ
 * 
 * @returns {JSX.Element} FAQ section dengan semua pertanyaan
 */
export default function FAQSection() {
    /** State untuk menyimpan index FAQ yang sedang terbuka (default: index 0 / item pertama) */
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    /**
     * Toggle accordion berdasarkan index
     * - Jika index yang sama diklik, tutup accordion (set null)
     * - Jika index berbeda diklik, buka accordion baru
     * 
     * @param index - Index FAQ yang diklik
     */
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">

                    {/* Header Section */}
                    <div className="mb-10 text-center md:mb-12">
                        {/* Badge Label */}
                        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-green md:mb-4">
                            FAQ
                        </span>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-brand-navy md:text-3xl lg:text-4xl">
                            Pertanyaan yang Sering Diajukan
                        </h2>

                        {/* Description */}
                        <p className="mt-3 text-base font-light text-slate-500 md:mt-4 md:text-lg">
                            Temukan jawaban atas pertanyaan umum tentang CITRA
                        </p>
                    </div>

                    {/* FAQ Accordion Container */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6 lg:p-8">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onToggle={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}