import FeaturedWisata from '@/components/sections/FeaturedWisata'
import HeroSection from '@/components/sections/HeroSection'
import SentimentBanner from '@/components/sections/SentimentBanner'
import WilayahSection from '@/components/sections/WilayahSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WilayahSection />
      <FeaturedWisata />
      <SentimentBanner />
    </>
  )
}
