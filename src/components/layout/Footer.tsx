/**
 * Footer - Komponen footer untuk halaman utama
 * 
 * Menampilkan informasi navigasi, tautan penting, dan form subscription
 * 
 * @returns {JSX.Element} Footer dengan desain modern
 */
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import {
  Send,
  Mail,
  Phone,
  Globe,
  ChevronRight
} from 'lucide-react'
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">

        {/* Grid Layout - 4 Columns Desktop */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand Section - 4 columns */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy tracking-tight">CITRA</h2>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mt-1">
                Ciayumajakuning Intelligent Tourism & Recommendation Assistant
              </p>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              Asisten wisata digital untuk menjelajahi destinasi, kuliner, tempat nongkrong,
              dan itinerary di Ciayumajakuning.
            </p>

            {/* Newsletter */}
            <div className="space-y-3 pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Langganan Newsletter
              </p>
              <div className="relative max-w-sm">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 pr-11 text-sm text-slate-700 outline-none transition-all focus:border-brand-green focus:ring-1 focus:ring-brand-green/20"
                />
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-white transition-all hover:bg-brand-green"
                  aria-label="Subscribe"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Links - 8 columns (4 x 2) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">

              {/* Explore */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-navy mb-4">
                  Jelajah
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href={ROUTES.WISATA} className="group flex items-center text-sm text-slate-500 hover:text-brand-green transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                      Wisata Alam
                    </Link>
                  </li>
                  <li>
                    <Link href={ROUTES.KULINER} className="group flex items-center text-sm text-slate-500 hover:text-brand-green transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                      Kuliner Khas
                    </Link>
                  </li>
                  <li>
                    <Link href={ROUTES.NONGKRONG} className="group flex items-center text-sm text-slate-500 hover:text-brand-green transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                      Ruang Kumpul
                    </Link>
                  </li>
                  <li>
                    <Link href={ROUTES.REKOMENDASI} className="group flex items-center text-sm text-slate-500 hover:text-brand-green transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-all" />
                      Pilihan Editor
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-navy mb-4">
                  Perusahaan
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href={ROUTES.TENTANG} className="text-sm text-slate-500 hover:text-brand-green transition-colors">
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <Link href={ROUTES.KONTAK} className="text-sm text-slate-500 hover:text-brand-green transition-colors">
                      Hubungi Kami
                    </Link>
                  </li>
                  <li>
                    <Link href={ROUTES.FAQ} className="text-sm text-slate-500 hover:text-brand-green transition-colors">
                      Pusat Bantuan
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-navy mb-4">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li className="text-sm text-slate-500 hover:text-brand-green transition-colors cursor-pointer">
                    Kebijakan Privasi
                  </li>
                  <li className="text-sm text-slate-500 hover:text-brand-green transition-colors cursor-pointer">
                    Syarat & Ketentuan
                  </li>
                  <li className="text-sm text-slate-500 hover:text-brand-green transition-colors cursor-pointer">
                    Lisensi Aset
                  </li>
                </ul>
              </div>

              {/* Social & Contact */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-navy mb-4">
                  Ikuti Kami
                </h3>
                <div className="flex gap-2 mb-4">
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-black transition-all hover:bg-brand-green hover:text-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-black transition-all hover:bg-brand-green hover:text-white"
                    aria-label="YouTube"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-black transition-all hover:bg-brand-green hover:text-white"
                    aria-label="TikTok"
                  >
                    <FaTiktok />
                  </a>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Mail className="h-3 w-3" />
                    <span>hello@citra.id</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Phone className="h-3 w-3" />
                    <span>+62 123 4567 890</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Lebih rendah dan lebih rapat */}
        <div className="mt-10 pt-5 border-t border-slate-200">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} CITRA. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Globe className="h-3 w-3" />
              <span>Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}