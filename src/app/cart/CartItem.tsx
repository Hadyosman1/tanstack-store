"use client";

import ImageWithErrorFallback from "@/components/ImageWithErrorFallback";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { delay } from "@/lib/utils";
import services from "@/services/products";
import {
  useCartStore,
  useGetCartItemQuantity,
} from "@/store/auth/useCartStore";
import { Product } from "@/types/products";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AlertCircleIcon, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

interface CartItemProps {
  id: Product["id"];
  slug: Product["slug"];
}

export default function CartItem({ id, slug }: CartItemProps) {
  const {
    data: product,
    isError,
    isSuccess,
  } = useSuspenseQuery({
    queryKey: ["product", `${id}-${slug}`],
    queryFn: async () => {
      await delay(2000);
      return services.getProductBySlug(slug);
    },
    staleTime: 1000 * 60 * 5,
  });

  const increaseQuantity = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const quantity = useGetCartItemQuantity(id, slug) ?? 0;
  const totalPrice = (product.price * quantity).toFixed(2);

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
      <div className="bg-accent flex flex-col items-center gap-5 rounded-md border p-5 shadow md:flex-row">
        <ImageWithErrorFallback
          src={product.images[0]}
          alt={product.title}
          size={200}
          className="rounded-md"
        />
        <div className="grow space-y-3">
          <Button
            onClick={() => removeFromCart(id, slug)}
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
          <div className="flex w-fit items-center gap-2 rounded-md border">
            <Button
              disabled={quantity === 1}
              variant="ghost"
              size="icon"
              onClick={() => decreaseQuantity(id, slug)}
            >
              <MinusIcon />
              <span className="sr-only">Decrease quantity by one</span>
            </Button>
            <span>{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => increaseQuantity(id, slug)}
            >
              <PlusIcon />
              <span className="sr-only">Increase quantity by one</span>
            </Button>
          </div>
          <p>Total price: {totalPrice}</p>
        </div>
      </div>
    );
  }

  return null;
}
