import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import SearchPlannerSection from '@/components/sections/SearchPlannerSection'
import RegionGridSection from '@/components/sections/RegionGridSection'
import FeaturedDestinationsSection from '@/components/sections/FeaturedDestinationsSection'
import CulinaryPreviewSection from '@/components/sections/CulinaryPreviewSection'
import InspirationGallerySection from '@/components/sections/InspirationGallerySection'
import StoryBandSection from '@/components/sections/StoryBandSection'
import PlannerCTASection from '@/components/sections/PlannerCTASection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import InteractiveMap from '@/components/sections/InteractiveMap'

export const metadata: Metadata = { title: 'Beranda' }

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchPlannerSection />
      <RegionGridSection />
      <FeaturedDestinationsSection />
      <CulinaryPreviewSection />
      <InspirationGallerySection />
      <StoryBandSection />
      <PlannerCTASection />
      <NewsletterSection />
      <InteractiveMap />
    </>
  )
}
