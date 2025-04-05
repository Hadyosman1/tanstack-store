import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product as ProductType } from "@/types/products";
import Link from "next/link";
import ImageWithErrorFallback from "../ImageWithErrorFallback";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";
import ProductCardCarousel from "./ProductCardCarousel";

interface ProductProps {
  product: ProductType;
  productIdx: number;
}

export default function ProductCard({ product, productIdx }: ProductProps) {
  return (
    <div className="self-start overflow-hidden rounded-lg border">
      <div className="grid aspect-square place-content-center overflow-hidden rounded-t-lg shadow-md">
        {product.images.length > 1 ? (
          <ProductCardCarousel
            images={product.images}
            priority={productIdx < 8}
          />
        ) : product.images.length === 1 ? (
          <ImageWithErrorFallback
            priority={productIdx < 8}
            src={product.images[0]}
            alt="product image"
            width={520}
            height={520}
          />
        ) : null}
      </div>
      <Card className="gap-2 rounded-none rounded-t-none border-none py-3">
        <CardHeader className="px-3">
          <CardTitle
            className="line-clamp-1 hover:underline"
            title={product.title}
          >
            <Link
              className="inset-0 contents"
              href={`/products/${product.slug}`}
            >
              {product.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3">
          <CardDescription
            title={product.description}
            className="line-clamp-3 min-h-[3lh]"
          >
            {product.description}
          </CardDescription>
          <hr className="my-2" />
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm">
            <p className="font-bold">{product.price}$</p>
            <Link
              href={`/categories/${product.category.id}/products`}
              className="hover:underline"
            >
              <p>{product.category.name}</p>
            </Link>
          </div>
          <hr className="my-2" />
          <div className="flex items-center gap-1">
            <AddToCartButton
              product={product}
              className="grow text-xs"
              size="sm"
            />
            <AddToWishlistButton product={product} size="icon" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
