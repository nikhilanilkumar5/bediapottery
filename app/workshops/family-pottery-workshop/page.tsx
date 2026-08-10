
import { getWorkshopData } from '@/services/workshop.service'
import FamilyProductDetailClient from '@/components/product/FamilyProductDetailClient'
import { getFaqData } from '@/services/faq.service'
import FaqListSmall from '@/components/faq/FaqListSmall'
import { Title } from '@/components/ui'


export default async function ProductDetailPage() {

  const data = await getWorkshopData("family-pottery-workshop")
  const faqData = await getFaqData("family-pottery-workshop", 1, 8)
  return (
    <main className="min-h-screen bg-secondary-dark">
      <FamilyProductDetailClient product={data} />
    <section className="page-wrapper  py-12 lg:py-24">
                <Title className="lg:mb-12 mb-8 text-center">
                  General Frequently Asked Questions
                </Title>
          <FaqListSmall items={faqData} />
        </section>
    </main>
  )
}
