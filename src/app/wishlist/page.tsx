"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/auth/useUserStore";
import {
  useGetWishlistQuantity,
  useWishlistStore,
} from "@/store/useWishlistStore";
import { TrashIcon } from "lucide-react";
import { redirect } from "next/navigation";
import WishlistItems from "./WishlistItems";

export default function WishlistPage() {
  const user = useUserStore((state) => state.user);
  const clearWishList = useWishlistStore((state) => state.clearWishlist);
  const wishlistQuantity = useGetWishlistQuantity();

  if (!user) redirect("/");

  return (
    <main className="container space-y-8 py-8">
      <div className="flex items-center justify-between gap-3 border-b pb-2">
        <h2 className="text-xl font-bold md:text-2xl">Your Wishlist</h2>
        {wishlistQuantity > 0 && (
          <Button variant="destructive" size="sm" onClick={clearWishList}>
            Clear wishlist
            <TrashIcon />
          </Button>
        )}
      </div>
      <WishlistItems />
    </main>
  );
}
