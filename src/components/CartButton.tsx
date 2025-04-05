"use client";

import { useGetCartQuantity } from "@/store/auth/useCartStore";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "@/store/auth/useUserStore";

export default function CartButton() {
  const user = useUserStore((state) => state.user);
  const cartQuantity = useGetCartQuantity();

  if (!user) return null;

  return (
    <Button variant="ghost" className="relative" size="icon" asChild>
      <Link href="/cart">
        <ShoppingCart className="size-5" />
        <span className="bg-primary/10 absolute -top-1 right-0 grid aspect-square w-4.5 place-content-center rounded-full text-xs tabular-nums">
          {cartQuantity}
        </span>
        <span className="sr-only">Shopping cart</span>
      </Link>
    </Button>
  );
}
