import React from 'react'
import BirthdayHero from '@/components/kids-birthday/BirthdayHero'
import FeatureBanner from '@/components/kids-birthday/FeatureBanner'
import BirthdayDetails from '@/components/kids-birthday/BirthdayDetails'
import { Metadata } from 'next'
import { getWorkshopData } from '@/services/workshop.service'
export const metadata: Metadata = {
  title: 'Adult Birthday Party Dubai | Private Pottery Experience',
  description:
    'Celebrate your birthday with a private pottery experience in Dubai. Create, laugh and celebrate with friends through a hands-on pottery workshop at Bedia.',
  keywords: [
    // Primary Keywords
    'adult birthday party Dubai',
    'birthday party Dubai adults',
    'pottery birthday Dubai',
    // Secondary Keywords
    'birthday activities Dubai',
    'creative birthday party Dubai',
    'private birthday venue Dubai',
    'birthday experience Dubai',
  ],
  openGraph: {
    title: 'Adult Birthday Party Dubai | Private Pottery Experience',
    description:
      'Celebrate your birthday with a private pottery experience in Dubai. Create, laugh and celebrate with friends through a hands-on pottery workshop at Bedia.',
    type: 'website',
  },
};
const AdultsBirthdayPage = async () => {
   const data = await getWorkshopData("adults-birthday-party")
  return (
    <div>
      <BirthdayHero product={data} type="adults" />
      <FeatureBanner />
      <BirthdayDetails product={data} type="adults"/>
    </div>
  )
}

export default AdultsBirthdayPage
