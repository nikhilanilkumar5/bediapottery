import React from 'react'
import ProductDetailClient from '@/components/product/ProductDetailClient'
import { getWorkshopData } from '@/services/workshop.service'
import ClientLogosSlider from '@/components/testimonial/ClientLogosSlider';

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

  return (
    <main className="min-h-screen bg-secondary-dark">
      <ProductDetailClient product={data} category={category} />
         {category === 'corporate-events' && (
          <ClientLogosSlider />
         )}
    </main>
  )
}