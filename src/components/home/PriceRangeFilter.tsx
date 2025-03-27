"use client";

import useGetProductsPriceRange from "@/hooks/useGetProductsPriceRange";
import { scrollToHomeProductsSection } from "@/lib/utils";
import { Loader } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import DualRangeSlider from "../ui/dual-range-slider";

interface PriceRangeFilterProps {
  closeFiltersBarWhenApplyFilterOnMobile: () => void;
}

const PriceRangeFilter = ({
  closeFiltersBarWhenApplyFilterOnMobile,
}: PriceRangeFilterProps) => {
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { min: minProductPrice, max: maxProductPrice } =
    useGetProductsPriceRange();

  useEffect(() => {
    if (minProductPrice && maxProductPrice) {
      setPriceRange([minProductPrice, maxProductPrice]);
    }
  }, [minProductPrice, maxProductPrice]);

  const handleApplyPriceRange = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("price_min", priceRange[0].toString());
    newSearchParams.set("price_max", priceRange[1].toString());

    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
      scrollToHomeProductsSection();
      closeFiltersBarWhenApplyFilterOnMobile();
    });
  };

  const handleClearPriceRange = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("price_min");
    newSearchParams.delete("price_max");
    setPriceRange([minProductPrice, maxProductPrice]);

    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
      scrollToHomeProductsSection();
      closeFiltersBarWhenApplyFilterOnMobile();
    });
  };

  const searchParamsMinPrice = searchParams.get("price_min");
  const searchParamsMaxPrice = searchParams.get("price_max");

  const isSearchParamsHasPriceRangeFilter =
    searchParams.has("price_min") || searchParams.has("price_max");

  const isPriceStateNotMatchSearchParamsPriceState =
    priceRange[0] !== Number(searchParamsMinPrice) ||
    priceRange[1] !== Number(searchParamsMaxPrice);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-lg font-semibold">Price range</h3>

        {isSearchParamsHasPriceRangeFilter && (
          <Button
            variant="link"
            type="button"
            onClick={handleClearPriceRange}
            disabled={isPending}
            className="text-muted-foreground cursor-pointer gap-0.5"
          >
            Clear
            {isPending && <Loader className="mt-1 size-4 animate-spin" />}
          </Button>
        )}
      </div>

      <DualRangeSlider
        min={minProductPrice}
        max={maxProductPrice}
        value={priceRange}
        onValueChange={setPriceRange}
        disabled={isPending}
      />

      <p className="flex items-center justify-between text-sm font-semibold">
        <span>{priceRange[0]}$</span> <span>{priceRange[1]}$</span>
      </p>

      {isPriceStateNotMatchSearchParamsPriceState && (
        <Button
          disabled={isPending}
          type="submit"
          className="ms-auto flex cursor-pointer"
          onClick={handleApplyPriceRange}
        >
          Apply {isPending && <Loader className="size-4 animate-spin" />}
        </Button>
      )}
    </div>
  );
};

export default PriceRangeFilter;
