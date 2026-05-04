import React from 'react'
import { BirthdayPageClient } from '@/components/birthday'

export const metadata = {
  title: 'Birthday Party Packages | Bedia Pottery',
  description:
    'Create unforgettable birthday memories with our pottery party packages. Perfect for kids age 5-15.',
}

export default function BirthdayPage() {
  return (
    <main className="min-h-screen bg-white">
      <BirthdayPageClient />
    </main>
  )
}
