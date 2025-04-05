"use client";

import ImageWithErrorFallback from "@/components/ImageWithErrorFallback";
import AddToCartButton from "@/components/products/AddToCartButton";
import { Button } from "@/components/ui/button";
import { cn, openAuthDialogIfNotLoggedIn } from "@/lib/utils";
import { Product as ProductType } from "@/types/products";
import { CreditCardIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const handleAddToWishlist = openAuthDialogIfNotLoggedIn(() => {
    console.log("Add To Wishlist");
  });

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="basis-2/5 xl:basis-1/2">
        <div className="space-y-4">
          <ImageWithErrorFallback
            key={product.images[activeImageIdx]}
            priority
            src={product.images[activeImageIdx]}
            alt={product.title}
            width={520}
            height={520}
            className="w-full rounded shadow-md"
          />

          {product.images.length > 1 && (
            <>
              <hr />
              <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIdx(idx)}
                    className={cn("overflow-hidden rounded shadow-md", {
                      "ring-primary ring-3": idx === activeImageIdx,
                    })}
                  >
                    <ImageWithErrorFallback
                      priority
                      src={img}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="w-full"
                    />
                    <div className="sr-only">Image number {idx + 1}</div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="basis-1/2 py-8 text-balance">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold md:text-4xl md:font-extrabold">
            {product.title}
          </h1>
          <p className="max-w-xl text-lg md:text-xl">{product.description}</p>

          <p className="border-y py-2 text-lg font-bold md:text-2xl">
            Price: {product.price}$
          </p>

          <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
            <Button className="grow-[3]">
              Buy Now <CreditCardIcon />
            </Button>

            <AddToCartButton
              className="min-w-max shrink-0 grow"
              product={product}
            />

            <Button
              onClick={handleAddToWishlist}
              variant="outline"
              className="min-w-max shrink-0 px-10 sm:grow"
            >
              <span className="max-sm:hidden">Add to wishlist</span>
              <HeartIcon />
            </Button>
          </div>

          <Link
            href={`/categories/${product.category.id}/products`}
            className="text-muted-foreground hover:bg-muted mt-8 flex w-fit items-center gap-4 rounded-lg border p-3 text-lg shadow-md hover:underline md:text-xl"
          >
            <span>Category: {product.category.name}</span>
            <ImageWithErrorFallback
              src={product.category.image}
              alt={product.category.name}
              width={60}
              height={60}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
