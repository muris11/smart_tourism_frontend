'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/Button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <section className="section-spacing bg-citra-canvas-alt">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-citra-primary-soft">
            <Mail className="h-6 w-6 text-citra-primary" />
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-citra-ink md:text-4xl">
            Dapatkan Inspirasi Perjalanan
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-citra-body">
            Dapatkan rekomendasi destinasi, kuliner, dan tips perjalanan
            terbaru dari CITRA langsung di emailmu.
          </p>

          {subscribed ? (
            <div className="mt-8 rounded-lg bg-citra-success-soft px-6 py-4">
              <p className="text-sm font-medium text-citra-success">
                Terima kasih! Kamu telah berlangganan newsletter CITRA.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
              <div className="flex items-center gap-2 rounded-full border border-citra-border bg-citra-surface p-1.5 pl-5 shadow-sm transition-all focus-within:border-citra-primary focus-within:shadow-card">
                <Mail className="h-4 w-4 shrink-0 text-citra-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full bg-transparent text-sm text-citra-ink placeholder-citra-muted-soft outline-none"
                />
                <Button type="submit" size="sm" className="shrink-0 rounded-full">
                  Berlangganan
                  <Send className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="mt-3 text-xs text-citra-muted-soft">
                Tenang, emailmu aman dan bisa berhenti kapan saja.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
