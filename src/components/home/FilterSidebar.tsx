"use client";

import useCategoriesQuery from "@/hooks/useCategoriesQuery";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  className?: string;
}

export default function FilterSidebar({ className }: FilterSidebarProps) {
  // TODO: Add categories filter and another filters and handle loading state
  const { data: categories, isLoading } = useCategoriesQuery();

  return (
    <aside className={cn("space-y-6", className)}>
      <h2 className="border-b pb-2 text-2xl font-bold">Filter sidebar</h2>

      <div className="space-y-2">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="space-y-2">
            {categories?.map((category) => (
              <div key={category.id}>
                <input type="checkbox" id={category.id.toString()} />
                <label htmlFor={category.id.toString()}>{category.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
