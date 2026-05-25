/**
 * HeroSection - Komponen hero untuk halaman beranda dengan slideshow
 * 
 * Fitur:
 * - Slideshow background image dengan transisi fade
 * - Auto-slide setiap 5 detik
 * - Tombol navigasi manual (Previous/Next) untuk desktop
 * - Swipe area untuk mobile (tap kiri/kanan)
 * - Indicator dots untuk navigasi langsung
 * - Overlay gelap untuk readability teks
 * - CTA buttons (Buat Rencana & Jelajahi Destinasi)
 * - Responsive typography dari mobile ke desktop
 * 
 * @component
 * @returns {JSX.Element} Komponen hero section dengan slideshow
 * 
 * @example
 * // Penggunaan di halaman beranda
 * <HeroSection />
 */
"use client"

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

/** Daftar gambar untuk slideshow hero */
const heroImages = [
  '/images/hero/hero-1.jpeg',
  '/images/hero/hero-2.jpeg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
]

/**
 * Komponen HeroSection untuk halaman beranda
 * 
 * @returns {JSX.Element} Hero section dengan slideshow background
 */
export default function HeroSection() {
  /** State untuk index gambar yang sedang aktif */
  const [currentImage, setCurrentImage] = useState(0)

  /**
   * Effect: Auto-slide setiap 5 detik
   * - Mengganti gambar secara otomatis
   * - Kembali ke awal setelah mencapai gambar terakhir
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      )
    }, 5000) // Ganti gambar setiap 5 detik

    return () => clearInterval(interval) // Cleanup interval
  }, [])

  /**
   * Handler untuk tombol next slide
   * - Pindah ke gambar berikutnya
   * - Kembali ke awal jika di akhir
   */
  const nextSlide = () => {
    setCurrentImage((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    )
  }

  /**
   * Handler untuk tombol previous slide
   * - Pindah ke gambar sebelumnya
   * - Kembali ke akhir jika di awal
   */
  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    )
  }

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black pt-20">

      {/* ========== BACKGROUND SLIDESHOW IMAGES ========== */}
      {heroImages.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`Hero background - Pemandangan Ciayumajakuning ${index + 1}`}
          fill
          priority={index === 0} // Hanya gambar pertama yang priority
          className={`
            object-cover transition-opacity duration-1000 ease-in-out
            ${index === currentImage ? 'opacity-100' : 'opacity-0'}
          `}
          sizes="100vw"
          quality={90}
        />
      ))}

      {/* ========== OVERLAY ========== */}
      {/* Gradient overlay untuk meningkatkan readability teks */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/70" />

      {/* ========== MAIN CONTENT ========== */}
      <div className="relative z-20 flex min-h-[90vh] items-center justify-center">
        <div className="container mx-auto px-4 text-center sm:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">

            {/* Badge Label - Glassmorphism Effect */}
            <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-md sm:mb-5 sm:px-5 sm:py-2 sm:text-sm">
              Explore Ciayumajakuning
            </span>

            {/* Main Heading */}
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-white sm:mb-5 sm:text-3xl md:text-4xl lg:text-5xl">
              Temukan Keindahan
              <br />
              Alam & Budaya
              <br />
              Ciayumajakuning
            </h1>

            {/* Description */}
            <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed font-light text-white/80 sm:mb-7 sm:text-base md:text-lg">
              Jelajahi destinasi wisata terbaik, kuliner khas daerah,
              hidden gems, dan pengalaman autentik dari Cirebon,
              Indramayu, Majalengka, hingga Kuningan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/planning"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold tracking-wide text-brand-navy shadow-lg transition-all hover:scale-105 hover:bg-slate-100 sm:px-7 sm:py-3"
              >
                Buat Rencana
              </Link>

              <Link
                href="/wisata"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:bg-white/20 sm:px-7 sm:py-3"
              >
                Jelajahi Destinasi
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========== NAVIGATION BUTTONS (DESKTOP ONLY) ========== */}
      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:flex lg:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:flex lg:right-6"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>

      {/* ========== SWIPE AREA FOR MOBILE ========== */}
      {/* Tap area kiri untuk previous slide */}
      <div
        className="absolute inset-y-0 left-0 z-20 w-1/2 cursor-pointer md:hidden"
        onClick={prevSlide}
        aria-label="Previous slide (tap left side)"
      />

      {/* Tap area kanan untuk next slide */}
      <div
        className="absolute inset-y-0 right-0 z-20 w-1/2 cursor-pointer md:hidden"
        onClick={nextSlide}
        aria-label="Next slide (tap right side)"
      />

      {/* ========== SLIDE INDICATORS ========== */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-5 sm:gap-2.5">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`
              h-1 rounded-full transition-all duration-300
              ${index === currentImage
                ? 'w-5 bg-white sm:w-6'
                : 'w-1.5 bg-white/40'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}