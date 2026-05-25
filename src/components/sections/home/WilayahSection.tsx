/**
 * WilayahSection - Komponen untuk menampilkan wilayah Ciayumajakuning
 * 
 * Fitur:
 * - Menampilkan 4 wilayah utama (Cirebon, Indramayu, Majalengka, Kuningan)
 * - Setiap wilayah memiliki deskripsi dan jumlah destinasi
 * - Hover effect pada card wilayah (background, warna, animasi icon)
 * - Link ke halaman wisata dengan filter wilayah otomatis
 * - Layout grid dengan border antar item
 * - Responsive design (stack di mobile, row di desktop)
 * 
 * @component
 * @returns {JSX.Element} Komponen wilayah section
 * 
 * @example
 * // Penggunaan di halaman beranda
 * <WilayahSection />
 * 
 * @example
 * // Setelah hero section
 * <>
 *   <HeroSection />
 *   <WilayahSection />
 * </>
 */
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/** Interface untuk data wilayah */
interface WilayahItem {
  /** Nama wilayah (Cirebon, Indramayu, Majalengka, Kuningan) */
  name: string
  /** Deskripsi singkat tentang wilayah */
  description: string
  /** Jumlah destinasi di wilayah tersebut */
  total: string
}

/** Data wilayah Ciayumajakuning */
const wilayah: WilayahItem[] = [
  {
    name: 'Cirebon',
    description:
      'Kota budaya dengan kekayaan sejarah keraton, wisata religi, dan kuliner legendaris.',
    total: '45+ Destinasi',
  },
  {
    name: 'Indramayu',
    description:
      'Pesona pantai utara dengan suasana laut, mangrove, dan wisata alam yang menenangkan.',
    total: '30+ Destinasi',
  },
  {
    name: 'Majalengka',
    description:
      'Hamparan pegunungan, air terjun, dan panorama alam terbaik di Jawa Barat.',
    total: '50+ Destinasi',
  },
  {
    name: 'Kuningan',
    description:
      'Udara sejuk kaki Gunung Ciremai dengan destinasi alam dan healing terbaik.',
    total: '40+ Destinasi',
  },
]

/**
 * Komponen WilayahSection untuk menampilkan daftar wilayah
 * 
 * @returns {JSX.Element} Wilayah section dengan 4 wilayah
 */
export default function WilayahSection() {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

        {/* ========== HEADER SECTION ========== */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end lg:mb-20">

          {/* Left Side - Title */}
          <div className="max-w-2xl">
            {/* Badge Label */}
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-brand-green md:mb-4">
              Explore Region
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl font-bold leading-tight text-brand-navy md:text-4xl lg:text-5xl">
              Jelajahi Wilayah
              <br />
              Ciayumajakuning
            </h2>
          </div>

          {/* Right Side - Description */}
          <p className="max-w-lg text-base leading-relaxed font-light text-slate-500 md:text-lg">
            Setiap wilayah memiliki karakter, budaya, dan pengalaman
            wisata yang berbeda untuk dijelajahi.
          </p>
        </div>

        {/* ========== WILAYAH LIST ========== */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {wilayah.map((item, index) => (
            <Link
              key={item.name}
              href={`/wisata?wilayah=${item.name}`}
              className="group flex flex-col gap-6 px-0 py-6 transition-all duration-300 hover:px-2 md:gap-8 md:py-8 lg:gap-10 lg:py-10"
            >
              {/* Left Section - Number & Info */}
              <div className="flex items-start gap-4 md:gap-5 lg:gap-6">
                {/* Nomor Urut */}
                <span className="mt-0.5 text-xs font-medium text-slate-400 sm:text-sm">
                  {(index + 1).toString().padStart(2, '0')}
                </span>

                {/* Wilayah Info */}
                <div>
                  {/* Wilayah Name */}
                  <h3 className="mb-2 text-2xl font-bold text-brand-navy transition-colors duration-300 group-hover:text-brand-green md:mb-3 md:text-3xl">
                    {item.name}
                  </h3>

                  {/* Wilayah Description */}
                  <p className="max-w-xl text-sm leading-relaxed font-light text-slate-500 md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right Section - Total & Arrow Icon */}
              <div className="flex items-center justify-between gap-4 md:justify-end md:gap-5">
                {/* Total Destinasi */}
                <span className="text-xs font-medium tracking-wide text-slate-400 uppercase md:text-sm">
                  {item.total}
                </span>

                {/* Arrow Icon Circle */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-transparent text-brand-navy transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-pale group-hover:text-brand-green md:h-11 md:w-11 lg:h-12 lg:w-12">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-4.5 md:w-4.5 lg:h-5 lg:w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}