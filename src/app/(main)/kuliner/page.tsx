'use client'

import Link from 'next/link'
import { ROUTES } from '@/lib/constants/routes'

export default function KulinerPage() {
  const kulinerItems = [
    {
      id: 'rendang',
      name: 'Rendang Daging Minang',
      image:
        'https://images.unsplash.com/photo-1574315042823-3563458b68aa?auto=format&fit=crop&q=80&w=800',
      region: 'Sumatera Barat',
      desc:
        'Dimasak perlahan dengan santan dan rempah khas menghasilkan tekstur daging yang lembut dan kaya rasa.',
    },
    {
      id: 'sate-lilit',
      name: 'Sate Lilit Ikan',
      image:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800',
      region: 'Bali',
      desc:
        'Daging ikan cincang yang dibalut pada batang serai, dipanggang sempurna dengan bumbu genep.',
    },
    {
      id: 'soto-betawi',
      name: 'Soto Betawi Kuah Susu',
      image:
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
      region: 'DKI Jakarta',
      desc:
        'Paduan kuah santan dan susu yang gurih, disajikan hangat dengan potongan daging dan emping.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24 animate-fade-in">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 border-b border-slate-200 pb-16 text-center md:flex-row md:text-left">
          <div className="max-w-2xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
              Catatan Rasa
            </span>
            <h1 className="text-5xl leading-tight text-brand-navy md:text-6xl">
              Warisan Rempah Lokal
            </h1>
          </div>
          <p className="max-w-sm text-lg font-light text-slate-500 md:text-right">
            Setiap hidangan adalah cerita tentang tanah, iklim, dan tangan-tangan terampil yang menjaganya.
          </p>
        </div>

        <div className="space-y-24">
          {kulinerItems.map((item, idx) => (
            <div
              key={item.id}
              className={`group flex flex-col items-center gap-12 lg:gap-20 ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              <Link
                href={ROUTES.KULINER_DETAIL(item.id)}
                className="block aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 md:w-1/2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>

              <div className="flex w-full flex-col items-start px-4 md:w-1/2 md:px-0">
                <span className="mb-6 rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {item.region}
                </span>
                <h3 className="mb-6 text-4xl leading-tight text-brand-navy lg:text-5xl">
                  <Link
                    href={ROUTES.KULINER_DETAIL(item.id)}
                    className="transition-colors hover:text-brand-green"
                  >
                    {item.name}
                  </Link>
                </h3>
                <p className="mb-8 text-lg font-light leading-relaxed text-slate-500">{item.desc}</p>
                <Link
                  href={ROUTES.KULINER_DETAIL(item.id)}
                  className="inline-flex items-center gap-2 border-b border-brand-navy pb-1 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-green hover:text-brand-green"
                >
                  Baca cerita lengkap
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
