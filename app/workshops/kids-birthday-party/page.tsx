import React from 'react'
import BirthdayHero from '@/components/kids-birthday/BirthdayHero'
import FeatureBanner from '@/components/kids-birthday/FeatureBanner'
import BirthdayDetails from '@/components/kids-birthday/BirthdayDetails'
import { Metadata } from 'next'
import { getWorkshopData } from '@/services/workshop.service'



export const metadata: Metadata = {
  title: 'Kids Birthday Party Dubai | Pottery Birthday Experience',
  description:
    "Celebrate your child's birthday with a creative pottery party in Dubai. Enjoy a private pottery experience, hands-on activities, cake time and take-home pottery.",
  keywords: [
    // Primary Keywords
    'kids birthday party Dubai',
    'pottery birthday party Dubai',
    'kids birthday venue Dubai',
    // Secondary Keywords
    'birthday party ideas Dubai',
    'creative birthday party Dubai',
    'kids activities Dubai',
    'kids party venue Dubai',
  ],
  openGraph: {
    title: 'Kids Birthday Party Dubai | Pottery Birthday Experience',
    description:
      "Celebrate your child's birthday with a creative pottery party in Dubai. Enjoy a private pottery experience, hands-on activities, cake time and take-home pottery.",
    type: 'website',
  },
};
const KidsBirthdayPage = async () => {
   const data = await getWorkshopData("kids-birthday-party")
  return (
    <div>
      <BirthdayHero product={data} type="kids"/>
      <FeatureBanner />
      <BirthdayDetails product={data} type="kids"/>
    </div>
  )
}

export default KidsBirthdayPage
