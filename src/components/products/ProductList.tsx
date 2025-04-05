"use client";

import { Product } from "@/types/products";
import ProductCard from "./ProductCard";
import ProductsGrid from "./ProductsGrid";

interface ProductListProps {
  products: Product[];
  className?: string;
}

export default function ProductList({ products, className }: ProductListProps) {
  return (
    <ProductsGrid className={className}>
      {products.map((product, idx) => (
        <ProductCard
          key={`${product.slug}-${product.id}`}
          product={product}
          productIdx={idx}
        />
      ))}
    </ProductsGrid>
  );
}
