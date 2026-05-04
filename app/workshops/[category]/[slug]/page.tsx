import React from 'react'
import ProductDetailClient from '@/components/product/ProductDetailClient'
import { products } from '@/constants/products'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

/**
 * ProductDetailPage
 * Single Responsibility: Server-side page component that handles routing and data fetching
 * Open/Closed: Extensible through metadata generation
 */
interface PageProps {
  params: {
    category: string
    slug: string
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = products.find(
    (p) => p.category === params.category && p.slug === params.slug
  )

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.title} - Bedia Pottery`,
    description:
      product.description || `Book ${product.title} at Bedia Pottery`,
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }))
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = products.find(
    (p) => p.category === params.category && p.slug === params.slug
  )

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-secondary-dark">
      <ProductDetailClient product={product} />
    </main>
  )
}
