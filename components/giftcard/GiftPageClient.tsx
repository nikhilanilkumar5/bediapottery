
import { getWorkshopData, WorkshopItem } from "@/services/workshop.service";

import GiftCardHero from "./GiftCardHero";
import InfoAndTimeline from "./InfoAndTimeline";
import TestimonialsSection from "../testimonial/TestimonialsSection";

export default async function GiftPageClient({  } ) {
 const data = await getWorkshopData("a-gift-made-by-hand-from-the-heart")
 
  return (
    <div className="min-h-screen bg-[#E6DFD566] font-sans text-primary">
      <GiftCardHero
        product={data}
      />
      <InfoAndTimeline product={data} />
      <TestimonialsSection />
    </div>
  );
}