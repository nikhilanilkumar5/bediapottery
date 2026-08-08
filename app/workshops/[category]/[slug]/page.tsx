import React from 'react'
import ProductDetailClient from '@/components/product/ProductDetailClient'
import { getWorkshopData } from '@/services/workshop.service'
import ClientLogosSlider from '@/components/testimonial/ClientLogosSlider';
import { Title } from '@/components/ui';
import FaqListSmall from '@/components/faq/FaqListSmall';
import { getFaqData } from '@/services/faq.service';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { category } = await params;

  const data = await getWorkshopData(slug)
const faqData = await getFaqData(category, 1, 8)
  return (
    <main className="min-h-screen bg-secondary-dark">
      <ProductDetailClient product={data} category={category}  slug={slug}/>
         {category === 'corporate-events' && (
          <ClientLogosSlider />
         )}
      {faqData.length > 0 && (
        <section className="page-wrapper lg:px-[17px] py-12 lg:py-24">
         <Title className="lg:mb-12 mb-8 text-center">
            General Frequently Asked Questions
          </Title>
          <FaqListSmall items={faqData} />
        </section>
      )}
    </main>
  )
}