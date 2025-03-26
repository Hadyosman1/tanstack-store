import services from "@/services/products";
import { Product as ProductType } from "@/types/products";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PRODUCT_PAGE_SIZE = 10;

export default function useHomeProducts() {
  const searchParams = useSearchParams();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    isSuccess,
  } = useInfiniteQuery<
    ProductType[],
    Error,
    InfiniteData<ProductType[]>,
    readonly unknown[],
    number
  >({
    queryKey: [
      "products",
      "pagination",
      searchParams.get("category"),
      searchParams.get("price_min"),
      searchParams.get("price_max"),
    ],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) =>
      services.getProductsWithFilterAndPagination({
        offset: pageParam,
        searchParams,
      }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length === PRODUCT_PAGE_SIZE + 1
        ? lastPageParam + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 10,
  });

  const products = data?.pages.flatMap((page) =>
    page.slice(0, PRODUCT_PAGE_SIZE),
  );

  const onBottomReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  return { products, onBottomReached, isLoading, isError, isSuccess };
}
