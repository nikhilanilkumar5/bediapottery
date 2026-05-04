import React from 'react'
import BirthdayHero from '@/components/kids-birthday/BirthdayHero'
import FeatureBanner from '@/components/kids-birthday/FeatureBanner'
import BirthdayDetails from '@/components/kids-birthday/BirthdayDetails'


const page = () => {
  return (
    <div>
      <BirthdayHero />
        <FeatureBanner />
        <BirthdayDetails />
    </div>
  )
}

export default page