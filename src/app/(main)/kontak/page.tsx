'use client'

import { usePageTitle } from '@/hooks/usePageTitle'
import { Mail, Phone, MapPin, Music2 } from 'lucide-react'
import { FaInstagram, FaYoutube } from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'

const contactMethods = [
  { icon: Mail, label: 'Email', value: 'hello@citra.id', href: 'mailto:hello@citra.id' },
  { icon: MapPin, label: 'Lokasi', value: 'Cirebon, Jawa Barat', href: '#' },
]

const socialLinks = [
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/citra.ciayumajakuning' },
  { icon: Music2, label: 'TikTok', href: 'https://tiktok.com/@citra.ciayumajakuning' },
  { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com/@citra-ciayumajakuning' },
]

export default function KontakPage() {
  usePageTitle('Kontak')
  return (
    <div className="min-h-screen animate-fade-in pt-28 pb-24">
      <div className="container-page">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Hubungi Kami</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-citra-ink md:text-5xl">Ada Pertanyaan?</h1>
            <p className="mt-4 max-w-md text-citra-muted leading-relaxed">
              Punya pertanyaan, saran, atau ingin bermitra? Tim CITRA siap mendengar dan membantu Anda.
            </p>

            <div className="mt-10 space-y-5">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    className="flex items-center gap-4 rounded-lg bg-citra-surface p-5 shadow-card transition-all hover:shadow-card-hover"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-citra-primary-soft">
                      <Icon className="h-5 w-5 text-citra-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-citra-muted">{method.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-citra-ink">{method.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-citra-muted">Ikuti Kami</p>
              <div className="mt-3 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-citra-surface text-citra-muted shadow-card transition-all hover:bg-citra-primary hover:text-white hover:shadow-card-hover"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-citra-surface p-6 shadow-card md:p-8">
            <h2 className="font-display text-xl font-bold text-citra-ink">Kirim Pesan</h2>
            <p className="mt-1 text-sm text-citra-muted">Kami akan merespons pesan Anda secepatnya</p>

            <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                  Nama <span className="text-citra-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nama lengkap Anda"
                  className="w-full rounded-full border border-citra-border bg-citra-canvas px-5 py-3 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                  Email <span className="text-citra-error">*</span>
                </label>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  className="w-full rounded-full border border-citra-border bg-citra-canvas px-5 py-3 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                  Subjek <span className="text-citra-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Apa yang ingin Anda sampaikan?"
                  className="w-full rounded-full border border-citra-border bg-citra-canvas px-5 py-3 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                  Pesan <span className="text-citra-error">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full resize-none rounded-lg border border-citra-border bg-citra-canvas px-5 py-3 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20"
                />
              </div>
              <Button type="submit" className="w-full">
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
