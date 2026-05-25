import HeroSection from '@/components/sections/home/HeroSection'
import WilayahSection from '@/components/sections/home/WilayahSection'
import FeaturedWisata from '@/components/sections/home/FeaturedWisata'
import DiscoverBanner from '@/components/sections/home/DiscoverBanner'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WilayahSection />
      <FeaturedWisata />
      <DiscoverBanner />
    </main>
  )
}
