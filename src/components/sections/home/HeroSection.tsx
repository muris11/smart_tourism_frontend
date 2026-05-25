"use client"

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const heroImages = [
  '/images/hero/hero-1.jpeg',
  '/images/hero/hero-2.jpeg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
]

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentImage((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    )
  }

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black pt-20">

      {heroImages.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`Hero background - Pemandangan Ciayumajakuning ${index + 1}`}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="100vw"
          quality={90}
        />
      ))}

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70" />

      <div className="absolute inset-0 z-[15] pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-20 flex min-h-[90vh] items-center justify-center">
        <div className="container mx-auto px-4 text-center sm:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">

            <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-1.5 text-xs font-medium tracking-[0.15em] text-white/90 uppercase backdrop-blur-md sm:mb-6 sm:px-6 sm:py-2 sm:text-sm">
              Explore Ciayumajakuning
            </span>

            <h1 className="mb-5 text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl drop-shadow-lg">
              Temukan Keindahan
              <br />
              <span className="bg-linear-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Alam & Budaya
              </span>
              <br />
              Ciayumajakuning
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed font-light text-white/75 sm:text-base md:text-lg lg:text-xl">
              Jelajahi destinasi wisata terbaik, kuliner khas daerah,
              hidden gems, dan pengalaman autentik dari Cirebon,
              Indramayu, Majalengka, hingga Kuningan.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/planning"
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold tracking-wide text-brand-deep shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-100 sm:px-8 sm:py-3.5"
              >
                Buat Rencana
              </Link>

              <Link
                href="/wisata"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:px-8 sm:py-3.5"
              >
                Jelajahi Destinasi
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 p-2.5 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 md:flex lg:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-30 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 p-2.5 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 md:flex lg:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>

      <div
        className="absolute inset-y-0 left-0 z-20 w-1/2 cursor-pointer md:hidden"
        onClick={prevSlide}
        aria-label="Previous slide (tap left side)"
      />

      <div
        className="absolute inset-y-0 right-0 z-20 w-1/2 cursor-pointer md:hidden"
        onClick={nextSlide}
        aria-label="Next slide (tap right side)"
      />

      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:gap-2.5">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentImage
                ? 'w-6 bg-white sm:w-8'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
