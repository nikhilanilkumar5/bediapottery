"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { Content } from "../ui";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-secondary-dark hover:bg-white p-2 pb-3 transition-all duration-300 hover:shadow-soft">
      {/* IMAGE CONTAINER */}
      <div className="relative w-full h-[420px] overflow-hidden">
        {!imageError ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}

        {/* OVERLAY */}
       <div className="absolute inset-0 bg-[linear-gradient(171.31deg,rgba(0,0,0,0.4)_6.63%,rgba(0,0,0,0)_55.09%)] flex items-start justify-center">
          
          <Content className="text-white text-center mt-2 pt-8 2xl:!text-2xl  xl:!text-xl">
             {product.title}
          </Content>
        </div>
      </div>

      {/* BUTTON */}
      <Link
        href={`/workshops/${product.category}/${product.slug}`}
        className="block mt-3 w-full bg-primary text-white text-center py-4 text-lg font-medium hover:bg-primary-dark transition-colors duration-300"
      >
        Book Now
      </Link>
    </div>
  );
};

export default ProductCard;
