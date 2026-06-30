"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Content } from "../ui";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/workshops/${product.mainSlug}/${product.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden">
        {!imageError ? (
          <Image
            src={product.imageUrl || "/images/banner/banner-2.png"}
            alt={product.title}
            width={500}
            height={700}
            onError={() => setImageError(true)}
            className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-[420px] bg-gray-200" />
        )}

        {/* Top Ribbon */}
  <div
  className="absolute top-0 left-0 inline-flex items-center gap-2
             bg-primary text-secondary-off px-3 py-1.5 lg:px-5 lg:py-2"
>
  <Content className="!text-secondary-off">
    Explore Now
  </Content>
</div>

        {/* Bottom Title */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#d9d7d2]/95 py-3 px-4 text-center">
            <Content className="text-primary text-center   2xl:!text-2xl  xl:!text-xl">
             {product.title}
          </Content>
        </div>
      </div>
    </Link>
  );
}
