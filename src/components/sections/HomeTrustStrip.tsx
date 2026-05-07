export default function HomeTrustStrip() {
  return (
    <section className="border-b border-slate-100 py-14">
      <div className="container flex flex-col items-center justify-between gap-8 px-6 text-center md:flex-row md:text-left md:px-12">
        <p className="shrink-0 text-sm font-semibold uppercase tracking-widest text-slate-500">Telah dipercaya oleh</p>
        <div className="flex flex-wrap justify-center gap-10 text-base font-semibold tracking-[0.14em] text-slate-500 md:justify-end md:gap-16">
          <span className="transition-colors hover:text-brand-navy">NatGeo</span>
          <span className="transition-colors hover:text-brand-navy">Tripadvisor</span>
          <span className="transition-colors hover:text-brand-navy">Lonely Planet</span>
          <span className="transition-colors hover:text-brand-navy">Booking.com</span>
        </div>
      </div>
    </section>
  )
}
