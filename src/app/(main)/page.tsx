import HeroSection from '@/components/sections/home/HeroSection'
import WilayahSection from '@/components/sections/home/WilayahSection'
import FeaturedWisata from '@/components/sections/home/FeaturedWisata'
import DiscoverBanner from '@/components/sections/home/DiscoverBanner'
import HomeTestimonials from '@/components/sections/home/HomeTestimonials'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WilayahSection />
      <FeaturedWisata />
      <HomeTestimonials />
      <DiscoverBanner />
    </main>
  )
}
