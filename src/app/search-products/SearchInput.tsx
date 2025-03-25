"use client";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { Product } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SearchInput({ q }: { q: string }) {
  const [value, setValue] = useState(q);
  const debouncedValue = useDebounce(value, 1000);

  // TODO: Remove fetching logic from here to the services file

  const { data } = useQuery<Product[]>({
    queryKey: ["products", "search", debouncedValue],
    queryFn: async () => {
      console.count("fire");
      return fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${debouncedValue}`,
      ).then((res) => res.json());
    },
    enabled: !!debouncedValue,
    initialData: [],
  });

  return (
    <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
      <Input
        placeholder="Search for..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
