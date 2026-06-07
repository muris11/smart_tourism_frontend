'use client'

import { useState } from 'react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { Mail, Phone, MapPin, Music2, CheckCircle2 } from 'lucide-react'
import { FaInstagram, FaYoutube } from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'
import ToastContainer from '@/components/ui/ToastContainer'

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
  const { toasts, success: toastSuccess, removeToast } = useToast()
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [subjek, setSubjek] = useState('')
  const [pesan, setPesan] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nama || !email || !subjek || !pesan) return
    setIsSubmitting(true)
    // Simulasi pengiriman form
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    toastSuccess('Pesan berhasil terkirim! Terima kasih telah menghubungi kami.')
    // Reset form
    setNama('')
    setEmail('')
    setSubjek('')
    setPesan('')
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen animate-fade-in pt-28 pb-24">
      <ToastContainer toasts={toasts} onClose={removeToast} />
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

            {submitted ? (
              <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-5 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h3 className="mt-4 text-base font-semibold text-emerald-800">Pesan Terkirim!</h3>
                <p className="mt-2 text-sm text-emerald-700">Terima kasih telah menghubungi kami. Kami akan segera menghubungi Anda kembali.</p>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-citra-muted">
                    Nama <span className="text-citra-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    required
                    value={subjek}
                    onChange={(e) => setSubjek(e.target.value)}
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
                    required
                    value={pesan}
                    onChange={(e) => setPesan(e.target.value)}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full resize-none rounded-lg border border-citra-border bg-citra-canvas px-5 py-3 text-sm text-citra-ink outline-none transition-all placeholder:text-citra-muted-soft focus:border-citra-primary focus:ring-2 focus:ring-citra-primary/20"
                  />
                </div>
                <Button type="submit" loading={isSubmitting} className="w-full">
                  Kirim Pesan
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
