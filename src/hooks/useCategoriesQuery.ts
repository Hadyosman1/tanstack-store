import { useQuery } from "@tanstack/react-query";
import services from "@/services/categories";

export default function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: services.getCategories,
    staleTime: 1000 * 60 * 10,
  });
}
