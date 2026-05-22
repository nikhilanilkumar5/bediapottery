import React from 'react'
import BirthdayHero from '@/components/kids-birthday/BirthdayHero'
import FeatureBanner from '@/components/kids-birthday/FeatureBanner'
import BirthdayDetails from '@/components/kids-birthday/BirthdayDetails'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Kids' Birthday",
  description: 'Celebrate your child\'s birthday with a fun pottery experience at Bedia Pottery Studio.',
}

const KidsBirthdayPage = () => {
  return (
    <div>
      <BirthdayHero />
      <FeatureBanner />
      <BirthdayDetails />
    </div>
  )
}

export default KidsBirthdayPage
