"use client";

import useCategoriesQuery from "@/hooks/useCategoriesQuery";
import CategoriesCarousel from "./CategoriesCarousel";
import CategoriesCarouselSkeleton from "./CategoriesCarouselSkeleton";

export default function Categories() {
  const { data: categories, status } = useCategoriesQuery();

  return (
    <div className="space-y-4">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Categories
      </h2>

      {status === "pending" && <CategoriesCarouselSkeleton />}
      {status === "error" && (
        <p className="text-destructive my-4 text-center text-lg">
          Something went wrong
        </p>
      )}
      {status === "success" && (
        <CategoriesCarousel categories={categories ?? []} />
      )}
    </div>
  );
}
