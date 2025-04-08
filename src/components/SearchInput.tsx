"use client";

import { Input } from "@/components/ui/input";
import useHeaderSearchInput from "@/hooks/useHeaderSearchInput";
import { cn } from "@/lib/utils";
import { Loader, SearchIcon, XIcon } from "lucide-react";
import { useId } from "react";
import InfiniteScrollingTriggerBoundary from "./InfiniteScrollingTriggerBoundary";
import ProductResultCard from "./products/ProductResultCard";

export default function SearchInput({ className }: { className?: string }) {
  const {
    value,
    setValue,
    debouncedValue,
    isResultsVisible,
    setIsResultsVisible,
    searchResultsContainerRef,
    setIsFormHasFocus,
    searchResults,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isSuccess,
    fetchNextPage,
    closeResultsMenu,
  } = useHeaderSearchInput();

  const searchInputId = useId();

  return (
    <form
      onFocus={() => {
        setIsResultsVisible(true);
        setIsFormHasFocus(true);
      }}
      onBlur={() => {
        setIsResultsVisible(false);
        setIsFormHasFocus(false);
      }}
      className={cn(
        "relative grow transition-all duration-300 md:max-w-64 has-[input:active,input:focus]:md:max-w-80",
        className,
      )}
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        className="w-full pe-7"
        placeholder="Search for..."
        value={value}
        id={searchInputId}
        onChange={(e) => setValue(e.target.value.trimStart())}
      />

      {!value && (
        <label
          htmlFor={searchInputId}
          className="absolute top-0 right-0 flex h-full items-center px-2"
        >
          <SearchIcon size={18} />
        </label>
      )}

      {value && (
        <button
          onPointerDown={(e) => {
            e.stopPropagation();
            setValue("");
            setIsFormHasFocus(false);
          }}
          type="reset"
          className="absolute top-0 right-0 flex h-full items-center px-2"
        >
          <XIcon size={18} />
        </button>
      )}

      <div
        className={cn(
          "bg-card results absolute bottom-0 left-0 z-20 w-full rounded-md border py-4 shadow-md transition-all duration-300 ease-in",
          {
            "invisible translate-y-[calc(100%+25px)] opacity-0":
              !isResultsVisible || !debouncedValue || !value.trim(),
            "translate-y-full opacity-100":
              isResultsVisible && debouncedValue && value.trim(),
          },
        )}
      >
        <div
          className="max-h-[max(300px,50dvh)] overflow-y-auto"
          ref={searchResultsContainerRef}
        >
          <InfiniteScrollingTriggerBoundary
            threshold={0.5}
            rootMargin="80px"
            onBottomReached={() => {
              if (hasNextPage && !isFetchingNextPage && !isFetching) {
                fetchNextPage();
              }
            }}
            root={searchResultsContainerRef.current}
          >
            {isSuccess && searchResults.length === 0 && (
              <p className="text-muted-foreground my-4 text-center">
                No results found
              </p>
            )}

            {isError && (
              <p className="text-destructive my-4 text-center">
                Error loading search results
              </p>
            )}

            <div className="divide-y">
              {searchResults.map((pro, idx) => (
                <ProductResultCard
                  closeResultsMenu={closeResultsMenu}
                  key={pro.slug}
                  product={pro}
                  idx={idx}
                />
              ))}
            </div>

            {isFetching && (
              <Loader className="text-muted-foreground mx-auto my-2 size-8 animate-spin" />
            )}
          </InfiniteScrollingTriggerBoundary>
        </div>
      </div>
    </form>
  );
}
