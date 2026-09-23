
import GiftPageClient from '@/components/giftcard/GiftPageClient'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pottery Gift Card Dubai | Give a Creative Experience',
  description:
    'Give the gift of creativity with a Bedia Pottery gift card in Dubai. A unique pottery experience for birthdays, couples, friends and special occasions.',
  keywords: [
    // Primary Keywords
    'pottery gift card Dubai',
    'pottery gift voucher Dubai',
    'experience gifts Dubai',
    // Secondary Keywords
    'creative gifts Dubai',
    'unique gifts Dubai',
    'pottery gift voucher',
    'experience gift Dubai',
  ],
  openGraph: {
    title: 'Pottery Gift Card Dubai | Give a Creative Experience',
    description:
      'Give the gift of creativity with a Bedia Pottery gift card in Dubai. A unique pottery experience for birthdays, couples, friends and special occasions.',
    type: 'website',
  },
};

const GiftCardsPage = async () => {
  
  return (
      <main>
                <GiftPageClient/>
        </main>

  )
}

export default GiftCardsPage
