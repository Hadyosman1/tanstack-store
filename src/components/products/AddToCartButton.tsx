"use client";

import { cn, openAuthDialogIfNotLoggedIn } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import {
  useCartStore,
  useGetCartItemQuantity,
} from "@/store/auth/useCartStore";
import { Product } from "@/types/products";
import { VariantProps } from "class-variance-authority";

interface AddToCartButtonProps extends VariantProps<typeof buttonVariants> {
  product: Product;
  className?: string;
}
export default function AddToCartButton({
  product,
  className,
  ...props
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const productQuantity = useGetCartItemQuantity(product.id, product.slug) ?? 0;

  const handleAddToCart = openAuthDialogIfNotLoggedIn(() => {
    addToCart(product.id, product.slug);
  });

  return (
    <Button
      onClick={handleAddToCart}
      variant="outline"
      {...props}
      className={cn("bg-[#6ba26e] px-10 hover:bg-[#6bc26e]", className)}
    >
      <span className="">Add to Cart</span>
      <div className="relative">
        <ShoppingCartIcon className="size-5" />
        {productQuantity > 0 && (
          <span className="bg-card absolute -top-1 -right-2.5 grid size-4 place-content-center rounded-full text-xs tabular-nums">
            {productQuantity}
          </span>
        )}
      </div>
    </Button>
  );
}
