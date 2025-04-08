"use client";
import { cn, getTwBreakpoint } from "@/lib/utils";
import { FilterIcon, XIcon } from "lucide-react";
import { Suspense, useCallback, useState } from "react";
import { Button } from "../ui/button";
import CategoriesFilter from "./CategoriesFilter";
import PriceRangeFilter from "./PriceRangeFilter";

interface FiltersBarProps {
  className?: string;
}

export default function FiltersBar({ className }: FiltersBarProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const closeFiltersBarWhenApplyFilterOnMobile = useCallback(() => {
    const mdBreakpoint = getTwBreakpoint("md");

    if (window.innerWidth < mdBreakpoint) {
      setIsFiltersOpen(false);
    }
  }, []);

  return (
    <aside
      className={cn(
        "bg-card sticky top-[calc(var(--header-height)+(var(--spacing)_*_3))] z-10 w-full shrink-0 self-start rounded-lg border p-2 shadow-md max-md:px-4 md:w-72 md:p-4",
        className,
      )}
    >
      <div
        className={cn(`flex items-center justify-between gap-3`, {
          "border-b pb-2": isFiltersOpen,
        })}
      >
        <h2 className="text-2xl font-bold">Filters</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          {isFiltersOpen ? <XIcon /> : <FilterIcon />}
          <span className="sr-only">
            {isFiltersOpen ? "Close" : "Open"} filters
          </span>
        </Button>
      </div>

      <div
        className={cn(
          "space-y-4 divide-y overflow-hidden transition-all duration-300",
          {
            "h-0": !isFiltersOpen,
            "h-fit pt-4": isFiltersOpen,
          },
        )}
      >
        <Suspense>
          <CategoriesFilter
            closeFiltersBarWhenApplyFilterOnMobile={
              closeFiltersBarWhenApplyFilterOnMobile
            }
          />
        </Suspense>
        <Suspense>
          <PriceRangeFilter
            closeFiltersBarWhenApplyFilterOnMobile={
              closeFiltersBarWhenApplyFilterOnMobile
            }
          />
        </Suspense>
      </div>
    </aside>
  );
}
