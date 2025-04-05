"use client";

import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/auth/useUserStore";
import { useGetWishlistQuantity } from "@/store/useWishlistStore";

export default function WishlistButton() {
  const user = useUserStore((state) => state.user);
  const wishListQuantity = useGetWishlistQuantity();

  if (!user) return null;

  return (
    <Button variant="ghost" className="relative" size="icon" asChild>
      <Link href="/wishlist">
        <HeartIcon className="size-5" />
        <span className="bg-red-500/20 absolute -top-1 right-0 grid aspect-square w-4.5 place-content-center rounded-full text-xs tabular-nums">
          {wishListQuantity}
        </span>
        <span className="sr-only">Your wishlist</span>
      </Link>
    </Button>
  );
}
