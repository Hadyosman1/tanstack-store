"use client";

import { useCartStore } from "@/store/useCartStore";
import { Suspense } from "react";
import CartItem from "./CartItem";
import CartItemSkeleton from "./CartItemSkeleton";

export default function CartItems() {
  const cartItems = useCartStore((state) => state.getCart)();

  if (cartItems.length === 0) {
    return (
      <p className=" text-center text-lg font-semibold md:text-2xl">
        Your cart is empty. Add some products to it!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {cartItems.map((item) => (
        <Suspense key={item.id} fallback={<CartItemSkeleton />}>
          <CartItem {...item} />
        </Suspense>
      ))}
    </div>
  );
}
