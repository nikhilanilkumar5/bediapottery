import React from "react";
import ProductCard from "@/components/product/ProductCard";
import { notFound } from "next/navigation";
import { Content, Title } from "@/components/ui";
import TestimonialsSection from "@/components/testimonial/TestimonialsSection";
import { getCategoryData } from "@/services/category.service";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const data = await getCategoryData(category);

  // Check category exists
  if (!data.totalCount || data.totalCount === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className=" pb-20 min-h-48">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 ">
          <div
            className="relative overflow-hidden w-full py-16 mb-20 bg-cover bg-center"
            style={{
              backgroundImage: `url(${data.category?.image?.[0]})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 blur-sm "  />
            {data.category?.title && (
              <div className="flex-1 page-wrapper">
                <Title className="mb-2.5 font-normal text-2xl">
                  {data.category?.title}
                </Title>

                {/* <Title className="mb-2.5 font-normal !text-2xl">
                ({data.category?.shortDescription})
              </Title> */}
              </div>
            )}
            {/* 
          {data.category?.description && (
            <div className="lg:max-w-lg flex-1">
              <Content>{data.category.description}</Content>
            </div>
          )} */}
          </div>
        </div>
        {/* Products Grid */}
        {data?.workshops.length > 0 ? (
          <div className=" page-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.workshops.map((workshop) => (
              <ProductCard
                key={workshop._id}
                product={{
                  id: workshop._id,
                  title: workshop.title,
                  imageUrl: workshop.bannerImage,
                  slug: workshop.slug,
                  mainSlug: category,
                  description: workshop.shortDescription,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No workshops available in this category.
            </p>
          </div>
        )}
      </div>

      <TestimonialsSection />
    </main>
  );
}
