/**
 * Auth Layout - Layout untuk halaman autentikasi (login, register, forgot-password, dll)
 * 
 * Layout ini memiliki dua kolom:
 * - Kolom kiri (hidden di mobile): Hero section dengan SLIDESHOW GAMBAR yang berpindah otomatis
 * - Kolom kanan: Form autentikasi (children)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form login/register yang akan dirender
 * 
 * @returns {JSX.Element} Layout auth dua kolom dengan slideshow gambar modern
 */
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

// Daftar gambar untuk slideshow
const slides = [
  {
    src: '/images/auth/auth-1.jpeg',
    alt: 'Keindahan alam Indonesia - pantai tropis',
  },
  {
    src: '/images/auth/auth-2.png',
    alt: 'Wisata budaya - tarian tradisional',
  },
  {
    src: '/images/auth/auth-3.webp',
    alt: 'Pesona gunung - petualangan alam',
  },
  {
    src: '/images/auth/auth-4.webp',
    alt: 'Kuliner Nusantara - cita rasa lokal',
  },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Manual slide untuk interaksi user
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-brand-pale selection:bg-brand-navy selection:text-white">
      <div className="flex min-h-screen">

        {/* KOLOM KIRI - HERO SECTION dengan SLIDESHOW (Desktop only) */}
        <div className="relative hidden w-[45%] overflow-hidden bg-brand-navy lg:block">

          {/* SLIDESHOW IMAGES */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="45vw"
                />
              </div>
            ))}
          </div>

          {/* Gradient Overlay yang konsisten di atas semua gambar */}
          <div className="absolute inset-0 z-20 bg-linear-to-br from-brand-navy/85 via-brand-navy/60 to-brand-navy/40" />

          {/* Animated Overlay Gradient (efek modern) */}
          <div className="absolute inset-0 z-20 bg-linear-to-t from-black/30 via-transparent to-transparent" />

          {/* Konten Hero Section (di atas overlay) */}
          <div className="relative z-30 flex h-full w-full flex-col justify-between p-16 animate-in fade-in duration-1000">

            {/* Tombol Kembali ke Beranda */}
            <Link
              href="/"
              className="group flex w-fit items-center gap-4 text-white transition-colors hover:text-brand-green"
              aria-label="Kembali ke halaman beranda"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-md transition-transform group-hover:scale-105">
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg italic leading-none">Kembali ke Beranda</span>
              </div>
            </Link>

            {/* Teks Motivasi dengan animasi fade */}
            <div className="mb-12 max-w-120 animate-in slide-in-from-bottom-8 duration-700 delay-300">
              <span className="mb-6 inline-block rounded-full bg-brand-green px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                Portal Anggota
              </span>
              <h1 className="mb-6 text-5xl leading-[1.08] text-white drop-shadow-lg">
                Melangkah Lebih Jauh Bersama Kami
              </h1>
              <p className="max-w-md text-lg leading-relaxed font-light text-white/90 drop-shadow-md">
                Simpan destinasi favorit Anda, susun itinerary yang terarah,
                dan jadilah bagian dari komunitas pelestari cerita lokal Nusantara.
              </p>
            </div>

            {/* Social Proof - Testimoni pengguna dengan foto Unsplash asli */}
            <div className="flex items-center gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-500">
              <div className="flex -space-x-3" aria-label="Foto profil pengguna aktif">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                  alt="Foto profil pengguna 1"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-brand-navy object-cover shadow-lg"
                />
                <Image
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
                  alt="Foto profil pengguna 2"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-brand-navy object-cover shadow-lg"
                />
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Foto profil pengguna 3"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-brand-navy object-cover shadow-lg"
                />
              </div>
              <span className="text-sm font-medium text-white/80 backdrop-blur-sm px-3 py-1 rounded-full bg-black/20">
                Bergabung dengan 10.000+ pejalan kaki lainnya.
              </span>
            </div>
          </div>

          {/* SLIDESHOW INDICATOR DOTS */}
          <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'w-8 h-2 bg-brand-green'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
                aria-label={`Lihat slide ${index + 1}`}
              />
            ))}
          </div>

          {/* SLIDE COUNTER */}
          <div className="absolute top-8 right-8 z-30 bg-black/30 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white/80">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* KOLOM KANAN - FORM AUTHENTIKASI */}
        <div className="relative flex w-full items-center justify-center overflow-y-auto rounded-l-none bg-white p-6 shadow-[-20px_0_40px_rgba(0,0,0,0.02)] sm:p-12 md:p-20 lg:w-[55%] lg:rounded-l-[3rem] xl:p-24">

          {/* Logo Mobile (hanya terlihat di layar kecil) */}
          <div className="absolute top-8 left-8 flex items-center gap-3 lg:hidden">
            <Link href="/" aria-label="Beranda">
              <span className="text-2xl tracking-[0.14em] text-brand-navy font-bold">
                CITRA
              </span>
            </Link>
          </div>

          {/* Container Form dengan animasi fade-in */}
          <div className="relative z-10 w-full max-w-110 animate-fade-in pt-16 lg:pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}