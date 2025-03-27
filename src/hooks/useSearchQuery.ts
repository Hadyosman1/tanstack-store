import { PRODUCT_PAGE_SIZE } from "@/constants";
import services from "@/services/products";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useSearchQuery({
  debouncedValue,
}: {
  debouncedValue: string;
}) {
  return useInfiniteQuery({
    queryKey: ["products", "search", debouncedValue],
    queryFn: async ({ pageParam = 1 }) => {
      return services.getProductsBySearchInTitle({
        pageParam,
        searchTerm: debouncedValue,
      });
    },
    enabled: !!debouncedValue,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length === PRODUCT_PAGE_SIZE + 1
        ? lastPageParam + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 10,
  });
}
