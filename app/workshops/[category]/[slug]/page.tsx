import React from 'react'
import ProductDetailClient from '@/components/product/ProductDetailClient'
import { products } from '@/constants/products'
import { Metadata } from 'next'
import { getWorkshopData } from '@/services/workshop.service'

interface PageProps {
  params: {
    category: string
    slug: string
  }
}

/**
 * Required for static export
 */
export async function generateStaticParams() {
  return products.map(product => ({
    category: product.category,
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({
  params,
}: PageProps) {
  const data = await getWorkshopData(params.slug)

  const product = products.find(
    item => item.slug === params.slug
  )

  if (!product) {
    return null
  }

  return (
    <main className="min-h-screen bg-secondary-dark">
      <ProductDetailClient product={product} />
    </main>
  )
}