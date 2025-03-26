"use client";

import useHomeProducts from "@/hooks/useHomeProducts";
import InfiniteScrollingTriggerBoundary from "../InfiniteScrollingTriggerBoundary";
import ProductList from "../products/ProductList";

export default function Products() {
  const { products, onBottomReached, isLoading, isError, isSuccess } =
    useHomeProducts();

  return (
    <section id="home-products-section" className="grow">
      <h1 className="border-b pt-4 pb-2 text-2xl font-bold">Products</h1>

      {isError && <p className="py-4">Something went wrong</p>}
      {isLoading && <p className="py-4">Loading...</p>}
      {isSuccess && !products?.length && (
        <p className="py-4 text-center text-xl">No products found</p>
      )}

      <InfiniteScrollingTriggerBoundary onBottomReached={onBottomReached}>
        {!!products?.length && !isLoading && !isError && (
          <ProductList products={products} />
        )}
      </InfiniteScrollingTriggerBoundary>
    </section>
  );
}
