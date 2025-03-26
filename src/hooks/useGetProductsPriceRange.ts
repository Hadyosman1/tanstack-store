import { useQuery } from "@tanstack/react-query";
import services from "@/services/products";

export default function useGetProductsPriceRange() {
  const { data } = useQuery({
    queryKey: ["all-products"],
    queryFn: services.getAllProducts,
    staleTime: Infinity,
  });

  if (!data) return { min: 0, max: 0 };

  const minMax = data.reduce(
    (acc, curr) => {
      acc.min = Math.min(acc.min, curr.price);
      acc.max = Math.max(acc.max, curr.price);
      return acc;
    },
    { min: Infinity, max: -Infinity },
  );

  return minMax;
}
