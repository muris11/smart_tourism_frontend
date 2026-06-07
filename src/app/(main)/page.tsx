import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import LazySentimentChart from '@/components/sections/LazySentimentChart'
import RegionGridSection from '@/components/sections/RegionGridSection'
import FeaturedDestinationsSection from '@/components/sections/FeaturedDestinationsSection'
import CulinaryPreviewSection from '@/components/sections/CulinaryPreviewSection'
import InspirationGallerySection from '@/components/sections/InspirationGallerySection'
import StoryBandSection from '@/components/sections/StoryBandSection'
import PlannerCTASection from '@/components/sections/PlannerCTASection'
import LazyInteractiveMap from '@/components/sections/LazyInteractiveMap'

export const metadata: Metadata = { title: 'Beranda' }

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RegionGridSection />
      <LazySentimentChart />
      <FeaturedDestinationsSection />
      <CulinaryPreviewSection />
      <StoryBandSection />
      <PlannerCTASection />
      <LazyInteractiveMap />
      <InspirationGallerySection />
    </>
  )
}
