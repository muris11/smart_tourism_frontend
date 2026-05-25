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
    <footer className="mt-auto border-t border-slate-100 bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          <div className="lg:col-span-4 space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-brand-deep tracking-tight font-display">CITRA</h2>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mt-1">
                Ciayumajakuning Intelligent Tourism & Recommendation Assistant
              </p>
            </div>

            <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
              Asisten wisata digital untuk menjelajahi destinasi, kuliner, tempat nongkrong,
              dan itinerary di Ciayumajakuning.
            </p>

            <div className="space-y-3 pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Langganan Newsletter
              </p>
              <div className="relative max-w-sm">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full rounded-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 pr-11 text-sm text-slate-700 outline-none transition-all focus:border-brand focus:ring-1 focus:ring-brand/20"
                />
                <button
                  className="absolute right-1 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-deep text-white transition-all hover:bg-brand"
                  aria-label="Subscribe"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-deep mb-4">
                  Jelajah
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: ROUTES.WISATA, label: 'Wisata Alam' },
                    { href: ROUTES.KULINER, label: 'Kuliner Khas' },
                    { href: ROUTES.NONGKRONG, label: 'Ruang Kumpul' },
                    { href: ROUTES.REKOMENDASI, label: 'Pilihan Editor' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group inline-flex items-center text-sm text-slate-500 hover:text-brand transition-colors">
                        <ChevronRight className="h-3 w-3 mr-0.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-deep mb-4">
                  Perusahaan
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: ROUTES.TENTANG, label: 'Tentang Kami' },
                    { href: ROUTES.KONTAK, label: 'Hubungi Kami' },
                    { href: ROUTES.FAQ, label: 'Pusat Bantuan' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-block text-sm text-slate-500 hover:text-brand transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-deep mb-4">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {['Kebijakan Privasi', 'Syarat & Ketentuan', 'Lisensi Aset'].map((label) => (
                    <li key={label} className="text-sm text-slate-500 hover:text-brand transition-colors cursor-pointer">
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-deep mb-4">
                  Ikuti Kami
                </h3>
                <div className="flex gap-2.5 mb-5">
                  {[
                    { icon: FaInstagram, label: 'Instagram' },
                    { icon: FaYoutube, label: 'YouTube' },
                    { icon: FaTiktok, label: 'TikTok' },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-300 hover:bg-brand hover:text-white hover:shadow-md"
                      aria-label={label}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Mail className="h-3.5 w-3.5" />
                    <span>hello@citra.id</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Phone className="h-3.5 w-3.5" />
                    <span>+62 123 4567 890</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-5 border-t border-slate-100">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} CITRA. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Globe className="h-3.5 w-3.5" />
              <span>Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
