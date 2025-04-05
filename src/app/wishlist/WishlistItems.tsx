"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { Suspense } from "react";
import WishlistItemSkeleton from "./WishlistItemSkeleton";
import WishlistItem from "./WishlistItem";
export default function WishlistItems() {
  const wishlistItems = useWishlistStore((state) => state.getWishList)();

  if (wishlistItems.length === 0) {
    return (
      <p className="text-center text-lg font-semibold md:text-2xl">
        Your wishlist is empty. Add some products to it!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {wishlistItems.map((item) => (
        <Suspense key={item.id} fallback={<WishlistItemSkeleton />}>
          <WishlistItem {...item} />
        </Suspense>
      ))}
    </div>
  );
}
