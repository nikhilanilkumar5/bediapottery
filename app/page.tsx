import HeroSection from '@/components/sections/HeroSection'
import TestimonialsSection from '@/components/testimonial/TestimonialsSection'
import FeatureBanner from '@/components/kids-birthday/FeatureBanner'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TestimonialsSection />
      <FeatureBanner />
    </main>
  )
}
