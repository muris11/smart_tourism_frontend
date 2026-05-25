/**
 * HomeTestimonials - Komponen testimonial pengguna untuk halaman beranda
 * 
 * Fitur:
 * - Menampilkan ulasan pengguna dalam format carousel/grid
 * - Sistem pagination dengan 3 item per halaman
 * - Desain modern dengan quote icon dan verified badge
 * - Rating bintang (1-5) dengan visualisasi icon Star
 * - Responsive layout (mobile carousel, desktop grid)
 * - Tombol navigasi prev/next dengan animasi hover
 * - Pagination dots untuk indikator halaman
 * - Avatar pengguna dengan ring effect hover
 * - Menggunakan Next.js Image untuk optimasi gambar
 * - Badge animated dengan efek ping untuk section label
 * 
 * @component
 * @returns {JSX.Element} Komponen testimonial section
 * 
 * @example
 * // Penggunaan di halaman beranda
 * <HomeTestimonials />
 * 
 * @example
 * // Penggunaan dengan custom margin
 * <div className="mt-16">
 *   <HomeTestimonials />
 * </div>
 */
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

// Data testimonial
const testimonials = [
  {
    id: 1,
    name: 'Ayu Sari Dewi',
    role: 'Travel Blogger',
    location: 'Jakarta',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'CITRA benar-benar mengubah cara saya berwisata! Rekomendasi destinasi yang diberikan sangat personal dan sesuai dengan preferensi saya. Fitur itinerary planner-nya juga sangat membantu.',
    date: '2 minggu lalu',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    role: 'Photographer',
    location: 'Bandung',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Sebagai fotografer, saya sering mencari spot-spot tersembunyi. CITRA membantu saya menemukan lokasi-lokasi instagramable yang belum banyak diketahui orang. Keren banget!',
    date: '1 bulan lalu',
  },
  {
    id: 3,
    name: 'Citra Lestari',
    role: 'Mahasiswa',
    location: 'Yogyakarta',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    rating: 4,
    text: 'Aplikasi ini sangat membantu saya merencanakan liburan dengan budget terbatas. Rekomendasi kuliner dan penginapan yang diberikan sangat akurat dan sesuai budget.',
    date: '3 minggu lalu',
  },
  {
    id: 4,
    name: 'Rizki Aditya',
    role: 'Travel Agent',
    location: 'Surabaya',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Saya menggunakan CITRA untuk membantu klien saya mencari destinasi wisata di Ciayumajakuning. Informasinya lengkap dan selalu update. Highly recommended!',
    date: '1 minggu lalu',
  },
  {
    id: 5,
    name: 'Maya Sari',
    role: 'Content Creator',
    location: 'Semarang',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Fitur chatbot-nya sangat membantu! Saya bisa bertanya tentang destinasi wisata kapan saja dan mendapatkan jawaban instan. Sangat cocok untuk traveler modern.',
    date: '4 hari lalu',
  },
  {
    id: 6,
    name: 'Andi Wijaya',
    role: 'Businessman',
    location: 'Cirebon',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    rating: 4,
    text: 'CITRA membantu saya menemukan tempat wisata yang cocok untuk keluarga. Anak-anak sangat senang dengan rekomendasi destinasi yang diberikan.',
    date: '2 bulan lalu',
  },
]

/**
 * Komponen StarRating untuk menampilkan rating dalam bentuk bintang
 * 
 * @param {Object} props - Component props
 * @param {number} props.rating - Nilai rating dari 1-5
 * @returns {JSX.Element} Deretan icon bintang sesuai rating
 */
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating
            ? 'fill-brand-green text-brand-green'
            : 'fill-gray-200 text-gray-200'
            }`}
        />
      ))}
    </div>
  )
}

/**
 * Komponen TestimonialCard untuk menampilkan satu item testimonial
 * 
 * @param {Object} props - Component props
 * @param {typeof testimonials[0]} props.testimonial - Data testimonial
 * @returns {JSX.Element} Card testimonial dengan desain modern
 */
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand-green/20">
      {/* Quote Icon */}
      <div className="absolute -top-3 -right-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-12 h-12 text-brand-navy" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-brand-green/20 group-hover:ring-brand-green/40 transition-all"
          />
          <div className="absolute -bottom-1 -right-1 bg-brand-green rounded-full p-1">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-navy transition-colors">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
          <p className="text-xs text-gray-400">{testimonial.location}</p>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote Text */}
      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-4">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">{testimonial.date}</span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-brand-green/30" />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Komponen HomeTestimonials untuk halaman beranda
 * Menampilkan testimonial pengguna dengan sistem carousel/pagination
 * 
 * @returns {JSX.Element} Testimonial section dengan desain modern
 */
export default function HomeTestimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  /**
   * Navigasi ke halaman tertentu
   * @param {number} page - Index halaman yang dituju
   */
  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  /**
   * Navigasi ke halaman berikutnya (loop ke awal jika sudah di akhir)
   */
  const nextPage = () => {
    setCurrentPage((currentPage + 1) % totalPages)
  }

  /**
   * Navigasi ke halaman sebelumnya (loop ke akhir jika sudah di awal)
   */
  const prevPage = () => {
    setCurrentPage((currentPage - 1 + totalPages) % totalPages)
  }

  return (
    <section className="py-20 bg-linear-to-b from-white to-brand-pale/30 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-green/10 rounded-full px-4 py-1.5 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span className="text-xs font-semibold text-brand-green uppercase tracking-wide">
              Testimonial
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Apa Kata Pengguna Kami

          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg">
            Bergabunglah dengan ribuan traveler yang sudah merasakan kemudahan berwisata bersama CITRA
          </p>
        </div>

        {/* Testimonials Grid / Carousel */}
        <div className="relative">
          {/* Desktop Grid (3 columns) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {currentTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Mobile Carousel (1 column) */}
          <div className="lg:hidden">
            <div className="relative">
              {currentTestimonials.slice(0, 1).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 gap-2">
            <button
              onClick={prevPage}
              className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand-green hover:border-brand-green/30 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 gap-2">
            <button
              onClick={nextPage}
              className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand-green hover:border-brand-green/30 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              className={`transition-all duration-300 rounded-full ${currentPage === i
                ? 'w-8 h-2 bg-brand-green'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to testimonial page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}