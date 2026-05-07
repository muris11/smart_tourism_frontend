export default function SentimentBanner() {
  return (
    <section className="container px-4 pb-16">
      <div className="rounded-3xl bg-[var(--color-brand-dark)] px-6 py-8 text-white md:px-8">
        <p className="text-sm uppercase tracking-[0.18em] text-green-200">Sentiment Insight</p>
        <h2 className="mt-2 text-2xl font-semibold">Ringkasan opini pengunjung siap divisualkan.</h2>
        <p className="mt-3 max-w-2xl text-sm text-green-100">Area ini disiapkan untuk banner insight, chart singkat, atau CTA menuju halaman rekomendasi dan sentiment.</p>
      </div>
    </section>
  )
}
