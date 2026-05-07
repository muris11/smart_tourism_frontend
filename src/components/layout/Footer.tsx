import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white px-6 pt-28 pb-10 text-slate-700 md:px-12">
      <div className="container mb-20 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col items-start gap-6 lg:col-span-4">
          <div className="flex flex-col">
            <span className="text-3xl leading-none tracking-[0.14em] text-brand-navy">CITRA</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Ciayumajakuning Intelligent Tourism & Recommendation Assistant</span>
          </div>
          <p className="mt-2 max-w-sm text-sm leading-7 font-light text-slate-500">
            Asisten wisata digital untuk menjelajahi destinasi, kuliner, tempat nongkrong, dan itinerary di Ciayumajakuning dengan pengalaman yang lebih tenang dan terarah.
          </p>
          <div className="mt-5 w-full max-w-sm">
            <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Berlangganan Buletin</span>
            <div className="relative flex">
              <input type="email" placeholder="Alamat email Anda" className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-5 pr-12 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--color-brand)]" />
              <button className="absolute top-1 right-1 bottom-1 aspect-square rounded-full bg-[var(--color-brand-dark)] text-white transition-colors hover:bg-[var(--color-brand)]">
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:col-span-8">
          <div>
            <h5 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy">Jelajah</h5>
            <ul className="space-y-4 text-sm font-light text-slate-500">
              <li><Link href={ROUTES.WISATA} className="transition-colors hover:text-[var(--color-brand)]">Wisata Alam</Link></li>
              <li><Link href={ROUTES.KULINER} className="transition-colors hover:text-[var(--color-brand)]">Kuliner Khas</Link></li>
              <li><Link href={ROUTES.NONGKRONG} className="transition-colors hover:text-[var(--color-brand)]">Ruang Kumpul</Link></li>
              <li><Link href={ROUTES.REKOMENDASI} className="transition-colors hover:text-[var(--color-brand)]">Pilihan Editor</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy">Perusahaan</h5>
            <ul className="space-y-4 text-sm font-light text-slate-500">
              <li><Link href={ROUTES.TENTANG} className="transition-colors hover:text-[var(--color-brand)]">Tentang Kami</Link></li>
              <li><Link href={ROUTES.KONTAK} className="transition-colors hover:text-[var(--color-brand)]">Hubungi Kami</Link></li>
              <li><Link href={ROUTES.FAQ} className="transition-colors hover:text-[var(--color-brand)]">Pusat Bantuan (FAQ)</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy">Legalitas</h5>
            <ul className="space-y-4 text-sm font-light text-slate-500">
              <li><span>Kebijakan Privasi</span></li>
              <li><span>Syarat & Ketentuan</span></li>
              <li><span>Lisensi Aset</span></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy">Jejak Digital</h5>
            <div className="flex flex-wrap gap-3">
              {['Instagram', 'YouTube', 'TikTok'].map((label) => (
                <a key={label} href="#" className="flex h-10 min-w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 text-[11px] font-medium text-slate-500 transition-all hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-pale)] hover:text-brand-navy">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-xs font-light text-slate-400 md:flex-row">
        <div>&copy; {new Date().getFullYear()} CITRA. Ciayumajakuning Intelligent Tourism & Recommendation Assistant.</div>
        <div className="flex gap-6 font-medium tracking-wide">
          <span className="text-brand-navy">Indonesia (ID)</span>
          <span className="cursor-pointer transition-colors hover:text-brand-navy">English (EN)</span>
        </div>
      </div>
    </footer>
  )
}
