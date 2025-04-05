"use client";

import { Product } from "@/types/products";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { cn, openAuthDialogIfNotLoggedIn } from "@/lib/utils";
import { useGetWishlistItem, useWishlistStore } from "@/store/useWishlistStore";

interface AddToWishlistButtonProps extends VariantProps<typeof buttonVariants> {
  product: Product;
  className?: string;
}

export default function AddToWishlistButton({
  product,
  className,
  ...props
}: AddToWishlistButtonProps) {
  const isInWishList = useGetWishlistItem(product.id, product.slug);
  const toggleWishlistItem = useWishlistStore(
    (state) => state.toggleWishlistItem,
  );

  const handleAddToWishlist = openAuthDialogIfNotLoggedIn(() => {
    toggleWishlistItem(product.id, product.slug);
  });

  return (
    <Button
      onClick={handleAddToWishlist}
      className={cn("[&_.button-text]:sr-only", className)}
      {...props}
      variant="secondary"
    >
      <span className="button-text">Add to wishlist</span>
      <HeartIcon
        className={cn("size-5", { "fill-red-500 text-red-500": isInWishList })}
      />
    </Button>
  );
}
