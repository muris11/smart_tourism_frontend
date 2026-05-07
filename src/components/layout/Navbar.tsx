import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

const links = [
  { href: ROUTES.WISATA, label: 'Wisata' },
  { href: ROUTES.KULINER, label: 'Kuliner' },
  { href: ROUTES.NONGKRONG, label: 'Nongkrong' },
  { href: ROUTES.REKOMENDASI, label: 'Rekomendasi' },
  { href: ROUTES.PLANNING, label: 'Planning' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold text-[var(--color-brand-dark)]">{process.env.NEXT_PUBLIC_APP_NAME ?? 'Smart Tourism Ciayumajakuning'}</Link>
        <nav className="hidden gap-5 text-sm text-gray-600 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-[var(--color-brand)]">{link.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
