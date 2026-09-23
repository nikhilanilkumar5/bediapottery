
import { getWorkshopData } from '@/services/workshop.service'
import FamilyProductDetailClient from '@/components/product/FamilyProductDetailClient'
import { getFaqData } from '@/services/faq.service'
import FaqListSmall from '@/components/faq/FaqListSmall'
import { Title } from '@/components/ui'

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Pottery Workshop Dubai | Pottery for All Ages',
  description:
    'Create together at a family pottery workshop in Dubai. Enjoy pottery wheel or handbuilding activities for kids and adults in a fun, beginner-friendly studio.',
  keywords: [
    // Primary Keywords
    'family pottery workshop Dubai',
    'family pottery Dubai',
    'family activities Dubai',
    // Secondary Keywords
    'things to do with family Dubai',
    'family art workshop Dubai',
    'pottery class for families Dubai',
  ],
  openGraph: {
    title: 'Family Pottery Workshop Dubai | Pottery for All Ages',
    description:
      'Create together at a family pottery workshop in Dubai. Enjoy pottery wheel or handbuilding activities for kids and adults in a fun, beginner-friendly studio.',
    type: 'website',
  },
};
export default async function ProductDetailPage() {

  const data = await getWorkshopData("family-pottery-workshop")
  const faqData = await getFaqData("family-pottery-workshop", 1, 8)
  return (
    <main className="min-h-screen bg-secondary-dark">
      <FamilyProductDetailClient product={data} />
    <section className="page-wrapper  md:py-12 lg:py-24 py-8">
                <Title className="lg:mb-12 mb-8 text-center">
                Frequently Asked Questions
                </Title>
          <FaqListSmall items={faqData} />
        </section>
    </main>
  )
}
