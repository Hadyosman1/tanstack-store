"use client";

import useHomeProducts from "@/hooks/useHomeProducts";
import InfiniteScrollingTriggerBoundary from "../InfiniteScrollingTriggerBoundary";
import ProductCard from "../products/ProductCard";
import { ProductCardsSkeleton } from "../products/ProductCardSkeleton";
import ProductsGrid from "../products/ProductsGrid";

export default function Products() {
  const {
    products,
    onBottomReached,
    isFetchingNextPage,
    isLoading,
    isError,
    isSuccess,
  } = useHomeProducts();

  return (
    <section id="home-products-section" className="grow">
      <h1 className="border-b pt-4 pb-2 text-2xl font-bold">Products</h1>

      {isError && <p className="py-4">Something went wrong</p>}
      {isLoading && (
        <ProductsGrid>
          <ProductCardsSkeleton />
        </ProductsGrid>
      )}
      {isSuccess && !products?.length && (
        <p className="py-4 text-center text-xl">No products found</p>
      )}

      <InfiniteScrollingTriggerBoundary
        threshold={0.5}
        rootMargin="300px"
        onBottomReached={onBottomReached}
      >
        {!!products?.length && !isLoading && !isError && (
          <ProductsGrid>
            {products.map((product, idx) => (
              <ProductCard
                key={product.slug}
                product={product}
                productIdx={idx}
              />
            ))}

            {isFetchingNextPage && <ProductCardsSkeleton />}
          </ProductsGrid>
        )}
      </InfiniteScrollingTriggerBoundary>
    </section>
  );
}
