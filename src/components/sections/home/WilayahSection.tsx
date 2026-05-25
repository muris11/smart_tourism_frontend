import Link from 'next/link'
import { ArrowUpRight, Mountain, Waves, Landmark, TreePine } from 'lucide-react'

interface WilayahItem {
  name: string
  description: string
  total: string
  icon: React.ReactNode
  color: string
  bgGradient: string
}

const wilayah: WilayahItem[] = [
  {
    name: 'Cirebon',
    description:
      'Kota budaya dengan kekayaan sejarah keraton, wisata religi, dan kuliner legendaris.',
    total: '45+ Destinasi',
    icon: <Landmark className="h-5 w-5" />,
    color: 'text-amber-600',
    bgGradient: 'from-amber-50 to-amber-100/60',
  },
  {
    name: 'Indramayu',
    description:
      'Pesona pantai utara dengan suasana laut, mangrove, dan wisata alam yang menenangkan.',
    total: '30+ Destinasi',
    icon: <Waves className="h-5 w-5" />,
    color: 'text-cyan-600',
    bgGradient: 'from-cyan-50 to-cyan-100/60',
  },
  {
    name: 'Majalengka',
    description:
      'Hamparan pegunungan, air terjun, dan panorama alam terbaik di Jawa Barat.',
    total: '50+ Destinasi',
    icon: <Mountain className="h-5 w-5" />,
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-50 to-emerald-100/60',
  },
  {
    name: 'Kuningan',
    description:
      'Udara sejuk kaki Gunung Ciremai dengan destinasi alam dan healing terbaik.',
    total: '40+ Destinasi',
    icon: <TreePine className="h-5 w-5" />,
    color: 'text-violet-600',
    bgGradient: 'from-violet-50 to-violet-100/60',
  },
]

export default function WilayahSection() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="max-w-2xl">
            <span className="eyebrow mb-4 block">Explore Region</span>
            <h2 className="section-title mb-6">
              Jelajahi Wilayah
              <br />
              Ciayumajakuning
            </h2>
            <p className="section-copy max-w-lg">
              Setiap wilayah memiliki karakter, budaya, dan pengalaman
              wisata yang berbeda untuk dijelajahi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {wilayah.map((item) => (
            <Link
              key={item.name}
              href={`/wisata?wilayah=${item.name}`}
              className="group relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated md:p-8"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${item.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/50 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold font-display tracking-tight text-brand-deep transition-colors duration-300 md:text-2xl`}>
                      {item.name}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs font-medium text-slate-400">
                    {item.total}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pale text-muted transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
