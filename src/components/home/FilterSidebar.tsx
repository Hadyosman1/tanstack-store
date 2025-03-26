"use client";

import { cn } from "@/lib/utils";
import PriceRangeFilter from "./PriceRangeFilter";
import CategoriesFilter from "./CategoriesFilter";

interface FilterSidebarProps {
  className?: string;
}

export default function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <aside className={cn("space-y-4 rounded-lg border", className)}>
      <h2 className="text-2xl font-bold">Filter bar</h2>

      <div className="space-y-4 divide-y">
        <CategoriesFilter />
        <PriceRangeFilter />
      </div>
    </aside>
  );
}
