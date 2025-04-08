import services from "@/services/products";
import { Product } from "@/types/products";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useGetSuspendedProduct({
  id,
  slug,
}: {
  id: Product["id"];
  slug: Product["slug"];
}) {
  return useSuspenseQuery({
    queryKey: ["product", `${id}-${slug}`],
    queryFn: async () => services.getProductBySlug(slug).catch(() => null),
    staleTime: 1000 * 60 * 5,
  });
}
