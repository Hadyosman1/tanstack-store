import { PRODUCT_PAGE_SIZE } from "@/constants";
import useDebounce from "@/hooks/useDebounce";
import useSearchQuery from "@/hooks/useSearchQuery";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export default function useHeaderSearchInput() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const id = useId();
  const searchResultsContainerRef = useRef<HTMLDivElement>(null);
  const [isFormHasFocus, setIsFormHasFocus] = useState(false);

  const {
    data,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isSuccess,
    fetchNextPage,
  } = useSearchQuery({
    debouncedValue,
  });

  const closeResultsMenu = useCallback(() => {
    setIsResultsVisible(false);
  }, []);

  const addKeyboardEvents = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (!isFormHasFocus) return;

      const searchResultCards =
        searchResultsContainerRef.current?.querySelectorAll(
          "[data-search-result-card]",
        );

      const activeElement = document.activeElement?.closest(
        "[data-search-result-card]",
      );

      const activeElementIdx = activeElement?.getAttribute(
        "data-search-result-card",
      );

      const activeElementIdxNum = activeElementIdx
        ? Number(activeElementIdx)
        : -1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextElement =
          searchResultCards?.[activeElementIdxNum + 1]?.querySelector("a");

        if (nextElement) {
          (nextElement as HTMLElement)?.focus();
        } else {
          const firstElementInList = searchResultCards?.[0]?.querySelector("a");

          if (firstElementInList && !isFetching) {
            (firstElementInList as HTMLElement)?.focus();
          }
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevElement =
          searchResultCards?.[activeElementIdxNum - 1]?.querySelector("a");

        if (prevElement) {
          (prevElement as HTMLElement)?.focus();
        } else {
          const lastElementInList =
            searchResultCards?.[searchResultCards.length - 1]?.querySelector(
              "a",
            );

          if (lastElementInList) {
            (lastElementInList as HTMLElement)?.focus();
          }
        }
      }
    },
    [isFormHasFocus],
  );

  useEffect(() => {
    document.addEventListener("keyup", addKeyboardEvents);

    if (isFormHasFocus) {
      setIsResultsVisible(true);
      document.documentElement.style.height = "100dvh";
      document.documentElement.style.overflow = "hidden";
    } else {
      setIsResultsVisible(false);
      document.documentElement.style.height = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keyup", addKeyboardEvents);
    };
  }, [isFormHasFocus, addKeyboardEvents]);

  const searchResults =
    data?.pages.flatMap((page) => page.slice(0, PRODUCT_PAGE_SIZE)) ?? [];

  return {
    value,
    setValue,
    debouncedValue,
    isResultsVisible,
    setIsResultsVisible,
    id,
    searchResultsContainerRef,
    isFormHasFocus,
    setIsFormHasFocus,
    searchResults,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isSuccess,
    fetchNextPage,
    closeResultsMenu,
  };
}
