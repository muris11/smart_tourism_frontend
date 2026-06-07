'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'
import {
  Send,
  Mail,
  Phone,
  Globe,
  ChevronDown,
} from 'lucide-react'
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6'

const linkGroups = [
  {
    title: 'Jelajah',
    links: [
      { href: ROUTES.WISATA, label: 'Wisata Alam' },
      { href: ROUTES.KULINER, label: 'Kuliner Khas' },
      { href: ROUTES.NONGKRONG, label: 'Ruang Kumpul' },
      { href: ROUTES.REKOMENDASI, label: 'Pilihan Editor' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { href: ROUTES.TENTANG, label: 'Tentang Kami' },
      { href: ROUTES.KONTAK, label: 'Hubungi Kami' },
      { href: ROUTES.FAQ, label: 'Pusat Bantuan' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: ROUTES.KEBIJAKAN_PRIVASI, label: 'Kebijakan Privasi' },
      { href: ROUTES.SYARAT_KETENTUAN, label: 'Syarat & Ketentuan' },
      { href: ROUTES.LISENSI_ASET, label: 'Lisensi Aset' },
    ],
  },
]

const socialLinks = [
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaTiktok, label: 'TikTok' },
  { icon: FaYoutube, label: 'YouTube' },
]

function NewsletterSubForm() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    alert('Terima kasih! Anda telah berhasil berlangganan newsletter kami.')
  }

  if (subscribed) {
    return (
      <div className="rounded-full bg-citra-primary/10 border border-citra-primary/30 px-5 py-2.5 text-sm text-citra-on-dark font-medium">
        Telah berlangganan! 🎉
      </div>
    )
  }

  return (
    <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan email Anda"
        className="min-w-0 flex-1 rounded-full border border-citra-forest-elevated bg-citra-forest-elevated px-5 py-2.5 text-sm text-citra-on-dark placeholder-citra-muted outline-none transition-colors focus:border-citra-sage focus:ring-1 focus:ring-citra-sage/30"
      />
      <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-citra-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-citra-primary-hover cursor-pointer">
        Berlangganan
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}

function LinkGroupDesktop({ title, links }: { title: string; links: { href?: string; label: string }[] }) {
  return (
    <div className="hidden lg:block">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-citra-on-dark">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <Link
                href={link.href}
                className="text-sm text-citra-muted-soft transition-colors hover:text-citra-on-dark"
              >
                {link.label}
              </Link>
            ) : (
              <span className="cursor-pointer text-sm text-citra-muted-soft transition-colors hover:text-citra-on-dark">
                {link.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function LinkGroupMobile({ title, links }: { title: string; links: { href?: string; label: string }[] }) {
  return (
    <details className="group lg:hidden">
      <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-citra-on-dark list-none">
        {title}
        <ChevronDown className="h-4 w-4 text-citra-muted-soft transition-transform group-open:rotate-180" />
      </summary>
      <ul className="mt-2 space-y-2.5 pb-4">
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? (
              <Link
                href={link.href}
                className="text-sm text-citra-muted-soft transition-colors hover:text-citra-on-dark"
              >
                {link.label}
              </Link>
            ) : (
              <span className="cursor-pointer text-sm text-citra-muted-soft transition-colors hover:text-citra-on-dark">
                {link.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </details>
  )
}

function SocialDesktop() {
  return (
    <div className="hidden lg:block">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-citra-on-dark">
        Ikuti Kami
      </h3>
      <div className="mt-4 flex gap-3">
        {socialLinks.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-citra-forest-elevated text-citra-muted-soft transition-colors hover:border-citra-sage hover:text-citra-on-dark"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  )
}

function SocialMobile() {
  return (
    <details className="group lg:hidden">
      <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-citra-on-dark list-none">
        Ikuti Kami
        <ChevronDown className="h-4 w-4 text-citra-muted-soft transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-2 flex gap-3 pb-4">
        {socialLinks.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-citra-forest-elevated text-citra-muted-soft transition-colors hover:border-citra-sage hover:text-citra-on-dark"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </details>
  )
}

export default function Footer() {
  return (
    <footer className="bg-citra-forest">
      <div className="border-b border-citra-forest-elevated">
        <div className="container mx-auto px-4 py-10 md:px-6 md:py-12">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h3 className="text-lg font-semibold text-citra-on-dark md:text-xl">
                Dapatkan inspirasi perjalanan terbaru
              </h3>
              <p className="mt-1 text-sm text-citra-muted-soft">
                Bergabung dengan newsletter CITRA untuk rekomendasi wisata terbaik.
              </p>
            </div>
            <NewsletterSubForm />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">

          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-citra-on-dark">
              CITRA
            </h2>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-citra-muted-soft">
              Ciayumajakuning Intelligent Tourism & Recommendation Assistant
            </p>
            <p className={cn(
              'mt-4 text-sm leading-relaxed',
              'text-citra-muted-soft max-w-xs'
            )}>
              Asisten wisata digital untuk menjelajahi destinasi, kuliner, tempat nongkrong,
              dan itinerary di Ciayumajakuning.
            </p>
            <div className="mt-6 space-y-2">
              <a
                href="mailto:hello@citra.id"
                className="flex items-center gap-2 text-sm text-citra-muted-soft transition-colors hover:text-citra-on-dark"
              >
                <Mail className="h-4 w-4 shrink-0" />
                hello@citra.id
              </a>
              <a
                href="tel:+621234567890"
                className="flex items-center gap-2 text-sm text-citra-muted-soft transition-colors hover:text-citra-on-dark"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +62 123 4567 890
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4 lg:gap-6">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <LinkGroupDesktop title={group.title} links={group.links} />
                <LinkGroupMobile title={group.title} links={group.links} />
              </div>
            ))}
            <div>
              <SocialDesktop />
              <SocialMobile />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-citra-forest-elevated pt-6 text-center sm:flex-row">
          <p className="text-xs text-citra-muted-soft">
            &copy; {new Date().getFullYear()} CITRA. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-citra-muted-soft">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
