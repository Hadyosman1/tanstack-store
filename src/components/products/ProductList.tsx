"use client";

import Product from "@/components/products/ProductCard";
import { Product as ProductType } from "@/types/products";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScrollingTriggerBoundary from "../InfiniteScrollingTriggerBoundary";
import { useCallback } from "react";

const PRODUCT_PAGE_SIZE = 10;

export default function Products() {
  // TODO: Remove all logic from here separate the fetching in a custom hook and make this presentation component
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery<
    ProductType[],
    Error,
    InfiniteData<ProductType[]>,
    string[],
    number
  >({
    queryKey: ["products", "pagination"],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${(pageParam - 1) * PRODUCT_PAGE_SIZE}&limit=${PRODUCT_PAGE_SIZE + 1}`,
      );
      return res.json();
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length === PRODUCT_PAGE_SIZE + 1
        ? lastPageParam + 1
        : undefined;
    },
    initialPageParam: 1,
  });

  const products = data?.pages.flatMap((page) =>
    page.slice(0, PRODUCT_PAGE_SIZE),
  );

  const onBottomReachedFn = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  return (
    <>
      {isError && <p>Something went wrong</p>}
      {isLoading && <p>Loading...</p>}

      <InfiniteScrollingTriggerBoundary onBottomReachedFn={onBottomReachedFn}>
        <section className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 pb-8">
          {products?.map((product, idx) => (
            <Product key={product.slug} product={product} productIdx={idx} />
          ))}
        </section>
      </InfiniteScrollingTriggerBoundary>
    </>
  );
}
