"use client";

import ImageWithErrorFallback from "@/components/ImageWithErrorFallback";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useGetSuspendedProduct from "@/hooks/useGetSuspendedProduct";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Product } from "@/types/products";
import { AlertCircleIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

interface WishlistItemProps {
  id: Product["id"];
  slug: Product["slug"];
}

export default function CartItem({ id, slug }: WishlistItemProps) {
  const {
    data: product,
    isError,
    isSuccess,
  } = useGetSuspendedProduct({ id, slug });

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  if (isError) {
    return (
      <Alert>
        <AlertCircleIcon />
        <AlertTitle>Error loading product with the slug {slug}</AlertTitle>
      </Alert>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-accent flex flex-col gap-5 rounded-md border p-5 shadow max-md:items-center md:flex-row">
        <ImageWithErrorFallback
          src={product.images[0]}
          alt={product.title}
          size={200}
          className="rounded-md"
        />
        <div className="grow space-y-3">
          <Button
            onClick={() => removeFromWishlist(id, slug)}
            size="sm"
            className="float-end gap-1 text-xs"
          >
            <span className="hidden md:block">Remove</span> <TrashIcon />
          </Button>
          <Link
            href={`/products/${product.slug}`}
            className="w-fit hover:underline"
          >
            <h2 className="italic">{product.title}</h2>
          </Link>
          <p className="text-muted-foreground line-clamp-3 min-h-[3lh] max-w-[500px]">
            {product.description}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
