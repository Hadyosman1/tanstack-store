"use client";

import useCategoriesQuery from "@/hooks/useCategoriesQuery";
import { scrollToHomeProductsSection } from "@/lib/utils";
import { CheckIcon, Loader } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface CategoriesFilterProps {
  closeFiltersBarWhenApplyFilterOnMobile: () => void;
}

const CategoriesFilter = ({
  closeFiltersBarWhenApplyFilterOnMobile,
}: CategoriesFilterProps) => {
  const { data: categories, isLoading, isError } = useCategoriesQuery();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );

  const isSearchParamsHasCategory = searchParams.has("category");

  const handleCategorySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", value);

    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
      scrollToHomeProductsSection();
      closeFiltersBarWhenApplyFilterOnMobile();
    });
  };

  const handleClearCategoryFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("category");
    setSelectedCategory("");

    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
      scrollToHomeProductsSection();
      closeFiltersBarWhenApplyFilterOnMobile();
    });
  };

  return (
    <div className="overflow-y-auto">
      <div className="max-h-[max(40dvh,200px)] space-y-3">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-lg font-semibold">Categories</h3>

          {(isSearchParamsHasCategory || selectedCategory !== "") && (
            <Button
              variant="link"
              type="button"
              onClick={handleClearCategoryFilter}
              disabled={isPending}
              className="text-muted-foreground cursor-pointer gap-0.5"
            >
              Clear
              {isPending && selectedCategory === "" && (
                <Loader className="mt-1 size-4 animate-spin" />
              )}
            </Button>
          )}
        </div>

        {isError && (
          <p className="text-destructive mx-auto my-4">
            Something went wrong while loading categories
          </p>
        )}

        {isLoading && (
          <div className="flex min-h-32 items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )}

        {!!categories?.length ? (
          <form className="space-y-3 pb-4">
            {categories?.map((category) => (
              <Label key={category.id} className="w-fit cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  className="accent-primary"
                  checked={selectedCategory === category.slug}
                  onChange={handleCategorySelect}
                />
                <span>{category.name}</span>
                {selectedCategory === category.slug && !isPending && (
                  <CheckIcon className="size-4" />
                )}
                {isPending && selectedCategory === category.slug && (
                  <Loader className="size-4" />
                )}
              </Label>
            ))}
          </form>
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesFilter;
