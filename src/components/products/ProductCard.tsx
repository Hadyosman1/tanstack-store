import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product as ProductType } from "@/types/products";
import ProductCardCarousel from "./ProductCardCarousel";
import ImageWithErrorFallback from "../ImageWithErrorFallback";
import Link from "next/link";

interface ProductProps {
  product: ProductType;
  productIdx: number;
}

// TODO: Add Action buttons to this Product Card
export default function ProductCard({ product, productIdx }: ProductProps) {
  return (
    <div>
      <div className="overflow-hidden rounded-t-lg shadow-md">
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
      <Card className="relative gap-2 rounded-t-none border-t-0">
        <CardHeader>
          <CardTitle className="line-clamp-1" title={product.title}>
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription
            title={product.description}
            className="line-clamp-3 min-h-[3lh]"
          >
            {product.description}
          </CardDescription>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="mt-2 text-lg font-bold">{product.price}$</p>
            <p>{product.category.name}</p>
          </div>
        </CardContent>
        <Link className="absolute inset-0" href={`/products/${product.slug}`}>
          <span className="sr-only">Go to product page</span>
        </Link>
      </Card>
    </div>
  );
}
