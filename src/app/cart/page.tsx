"use client";

import { useUserStore } from "@/store/auth/useUserStore";
import { redirect } from "next/navigation";
import CartItems from "./CartItems";
import { useCartStore, useGetCartQuantity } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export default function CartPage() {
  const user = useUserStore((state) => state.user);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartQuantity = useGetCartQuantity();

  if (!user) redirect("/");

  return (
    <main className="container space-y-8 py-8">
      <div className="flex items-center justify-between gap-3 border-b pb-2">
        <h2 className="text-xl font-bold md:text-2xl">Your Cart</h2>
        {cartQuantity > 0 && (
          <Button variant="destructive" size="sm" onClick={clearCart}>
            Clear cart
            <TrashIcon />
          </Button>
        )}
      </div>
      <CartItems />
    </main>
  );
}
