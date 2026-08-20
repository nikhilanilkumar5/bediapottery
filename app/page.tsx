import HeroSection from '@/components/sections/HeroSection'
import FeatureScroller from '@/components/sections/FeatureScroller'
import TestimonialsSection from '@/components/testimonial/TestimonialsSection'
import { getHeroSlides } from '@/services/hero.service'
import LocationSection from '@/components/common/LocationSection'
import TwoColumnSection from '@/components/sections/TwoColumnSection'
import { aboutPageData } from '@/constants/aboutData'
export interface WorkshopSection {
  title: string;
  description: string;
  imageUrl: string;
  imagePosition: "left" | "right";
}

export interface WorkshopPageData {
  handbuilding: WorkshopSection;
  potteryWheel: WorkshopSection;
}

export const workshopPageData: WorkshopPageData = {
  handbuilding: {
    title: "Handbuilding Pottery Workshop",
    description:
      "Our Handbuilding Pottery Workshop is a fun and relaxing way to create with clay using your hands and simple pottery tools - no pottery wheel needed. You can make mugs, bowls, plates, sculptures, and more. We offer three types of clay, all suitable for beginners, so you can choose the one that gives you the result you want. No matter which clay you choose, our instructors will guide you every step of the way. Perfect for kids and adults with no experience needed.",
    imageUrl: "/images/type/hand.png",
    imagePosition: "right" as const,
  },
  potteryWheel: {
    title: "Pottery Wheel Workshop",
    description:
      "Our Pottery Wheel Workshop is a fun way to learn how to shape clay on a spinning wheel. With step-by-step guidance from our instructors, you'll create your own bowl, cup, or vase. We offer three types of clay, all beginner-friendly, so you can choose the one that best suits your desired result. We'll guide you throughout the experience, making it perfect for kids and adults, even if it's your first time.",
    imageUrl: "/images/type/wheel.png",
    imagePosition: "left" as const,
  },
};
export default async function Home() {
  const heroSlides = await getHeroSlides()

  return (
    <main className="min-h-screen">
      <HeroSection slides={heroSlides} />
      <FeatureScroller />
       <div className="lg:py-16 py-8 space-y-9 page-wrapper">
        {/* Mission Section */}
        <TwoColumnSection
          title={workshopPageData.handbuilding.title}
          description={workshopPageData.handbuilding.description}
          imageUrl={workshopPageData.handbuilding.imageUrl}
          imagePosition={workshopPageData.handbuilding.imagePosition}
        />

        {/* Vision Section */}
        <TwoColumnSection
          title={workshopPageData.potteryWheel.title}
          description={workshopPageData.potteryWheel.description}
          imageUrl={workshopPageData.potteryWheel.imageUrl}
          imagePosition={workshopPageData.potteryWheel.imagePosition}
        />
      </div>
      <TestimonialsSection />
      <LocationSection/>
    </main>
  )
}
