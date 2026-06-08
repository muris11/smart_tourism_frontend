"use client";

import { getHomepage, type Stat } from "@/lib/api";
import { cn } from "@/lib/utils/cn";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORY_IMAGES = [
  "/images/hero/hero1.webp",
  "/images/hero/hero2.webp",
  "/images/hero/hero3.webp",
  "/images/hero/hero4.webp",
  "/images/hero/hero5.webp",
];

export default function StoryBandSection() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomepage()
      .then((data) => {
        setStats(data.stats);
      })
      .finally(() => setLoading(false));
  }, []);

  // Auto-slide effect untuk gambar background
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % STORY_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-citra-forest py-16 lg:py-24">
      <div className="container-page">
        <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
          {/* Kontainer Gambar Slide */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl shadow-black/40 lg:aspect-4/3">
              {STORY_IMAGES.map((src, index) => (
                <div
                  key={src}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                    index === current ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={src}
                    alt={`Pemandangan Ciayumajakuning ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
            {/* Dekorasi blur di belakang */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-white/5 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90%] w-[90%]" />
          </div>

          {/* Kontainer Deskripsi */}
          <div className="flex items-center w-full lg:w-1/2">
            <div className="max-w-xl">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                Tentang CITRA
              </span>

              <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Cerita dari Setiap Sudut
              </h2>

              <p className="mt-6 leading-relaxed text-white/70 text-lg">
                Dari pesisir Indramayu hingga dinginnya kaki Gunung Ciremai,
                setiap tempat di Ciayumajakuning punya cerita. CITRA hadir untuk
                membantu kamu menemukan dan merencanakan perjalanan yang tak
                terlupakan.
              </p>

              {!loading && stats.length > 0 && (
                <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <span className="block font-display text-3xl font-bold text-white md:text-4xl">
                        {stat.value}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-white/60">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/wisata"
                className="mt-10 inline-flex min-h-13 items-center justify-center rounded-full bg-white/10 px-8 text-[0.9375rem] font-semibold leading-none text-white transition-all duration-200 hover:bg-white/20 active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citra-focus focus-visible:ring-offset-2 hover:shadow-lg hover:shadow-black/20"
              >
                Mulai Jelajahi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
