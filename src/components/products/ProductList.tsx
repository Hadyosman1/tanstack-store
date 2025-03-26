"use client";

import { Product } from "@/types/products";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

interface ProductListProps {
  products: Product[];
  className?: string;
}

export default function ProductList({ products, className }: ProductListProps) {
  return (
    <div
      className={cn(
        "mt-8 grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-3 pb-8",
        className,
      )}
    >
      {products.map((product, idx) => (
        <ProductCard key={product.slug} product={product} productIdx={idx} />
      ))}
    </div>
  );
}
