'use client'

import HeroSection from '@/components/sections/tentang/HeroSection'
import StorySection from '@/components/sections/tentang/StorySection'
import ValuesSection from '@/components/sections/tentang/ValuesSection'
import CTASection from '@/components/sections/tentang/CTASection'
import FAQSection from '@/components/sections/tentang/FAQSection'

export default function TentangPage() {
  return (
    <div className="min-h-screen animate-fade-in bg-white pt-32 pb-24">
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <FAQSection />
      <CTASection />
    </div>
  )
}