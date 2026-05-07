import FeaturedWisata from '@/components/sections/FeaturedWisata'
import HeroSection from '@/components/sections/HeroSection'
import HomeClosingCta from '@/components/sections/HomeClosingCta'
import HomeTestimonials from '@/components/sections/HomeTestimonials'
import HomeTrustStrip from '@/components/sections/HomeTrustStrip'
import SentimentBanner from '@/components/sections/SentimentBanner'
import WilayahSection from '@/components/sections/WilayahSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeTrustStrip />
      <WilayahSection />
      <FeaturedWisata />
      <SentimentBanner />
      <HomeTestimonials />
      <HomeClosingCta />
    </>
  )
}
