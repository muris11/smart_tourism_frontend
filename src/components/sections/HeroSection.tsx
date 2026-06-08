"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { Coffee, MapPin, Search, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type HeroSlide = {
  id: string;
  region: string;
  src: string;
  alt: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    region: "Ciayumajakuning",
    src: "/images/hero/hero1.webp",
    alt: "Pemandangan hero Ciayumajakuning",
  },
  {
    id: "hero-2",
    region: "Wisata Alam",
    src: "/images/hero/hero2.webp",
    alt: "Pemandangan wisata alam Ciayumajakuning",
  },
  {
    id: "hero-3",
    region: "Panorama",
    src: "/images/hero/hero3.webp",
    alt: "Panorama Ciayumajakuning",
  },
  {
    id: "hero-4",
    region: "Kuliner Khas",
    src: "/images/hero/hero4.webp",
    alt: "Kuliner khas Ciayumajakuning",
  },
  {
    id: "hero-5",
    region: "Tempat Nongkrong",
    src: "/images/hero/hero5.webp",
    alt: "Suasana tempat nongkrong Ciayumajakuning",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [slides, setSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    // Gunakan data dari constant lokal jika fetch API lambat/opsional
    setSlides(HERO_SLIDES);
  }, []);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (slides.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, [slides.length]);

  useEffect(() => {
    if (!isPaused && slides.length > 0) startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startInterval, slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setParallaxOffset(rect.top * 0.15);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  if (slides.length === 0) {
    return (
      <section className="relative overflow-hidden bg-citra-forest min-h-150 md:h-screen" />
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-citra-forest"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[80vh] min-h-150 md:h-screen">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === current ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover md:object-center"
              style={{ transform: `translateY(${parallaxOffset}px)` }}
              sizes="100vw"
              quality={90}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-32 md:justify-center md:pb-0">
          <div className="container-page w-full">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="block h-px w-12 bg-white/30" />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                  C I T R A
                </span>
                <span className="block h-px w-12 bg-white/30" />
              </div>

              <h1 className="mb-5 font-display text-4xl leading-tight font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                Jelajahi Pesona
                <br />
                Ciayumajakuning
              </h1>

              <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/75 md:text-base lg:text-lg">
                Temukan tempat wisata, kuliner khas, dan sudut favorit dari
                Cirebon, Indramayu, Majalengka, dan Kuningan — satu pintu.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const val = (
                    e.currentTarget.elements.namedItem(
                      "search",
                    ) as HTMLInputElement
                  ).value;
                  if (val) {
                    router.push(`/cari?q=${encodeURIComponent(val)}`);
                  }
                }}
                className="mx-auto mb-6 flex max-w-xl items-center gap-2 rounded-full border border-white/20 bg-white/12 p-1.5 pl-5 backdrop-blur-md"
              >
                <Search className="h-4 w-4 shrink-0 text-white/60" />
                <input
                  type="text"
                  name="search"
                  placeholder="Cari destinasi, kuliner, atau tempat nongkrong..."
                  className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="shrink-0 rounded-full px-5 cursor-pointer"
                >
                  Jelajahi
                </Button>
              </form>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="/wisata"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Wisata Alam
                </Link>
                <Link
                  href="/kuliner"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                >
                  <UtensilsCrossed className="h-3.5 w-3.5" />
                  Kuliner Khas
                </Link>
                <Link
                  href="/nongkrong"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                >
                  <Coffee className="h-3.5 w-3.5" />
                  Tempat Nongkrong
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "rounded-full transition-all duration-500",
                index === current
                  ? "h-2 w-6 bg-white"
                  : "h-2 w-2 bg-white/40 hover:bg-white/70",
              )}
              aria-label={`Slide ${index + 1}: ${slides[index].region}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
