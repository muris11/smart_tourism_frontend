import HeroSection from '@/components/sections/HeroSection'
import WilayahSection from '@/components/sections/WilayahSection'
import FeaturedWisata from '@/components/sections/FeaturedWisata'
import SentimentBanner from '@/components/sections/SentimentBanner'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WilayahSection />
      <FeaturedWisata />
      <SentimentBanner />
    </main>
  )
}
