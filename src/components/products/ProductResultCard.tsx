import { Product } from "@/types/products";
import ImageWithFallback from "../ImageWithFallback";
import Link from "next/link";

interface ProductResultCardProps {
  product: Product;
  closeResultsMenu: () => void;
  idx: number;
}

export default function ProductResultCard({
  product,
  closeResultsMenu,
  idx,
}: ProductResultCardProps) {
  return (
    <div
      data-search-result-card={idx}
      className="has-[a:hover,a:focus]:bg-accent-foreground/90 has-[a:hover,a:focus]:text-accent relative flex items-center gap-2 p-2 transition-colors duration-200 ease-in-out"
    >
      <ImageWithFallback
        src={product.images[0]}
        alt={product.title}
        width={50}
        height={50}
        className="shrink-0 rounded-md shadow-md"
      />
      <div className="flex grow flex-col gap-1 text-xs">
        <p className="line-clamp-1">{product.title}</p>
        <div className="flex items-center justify-between">
          <p className="line-clamp-1">{product.price}$</p>
          <p className="line-clamp-1">{product.category.name}</p>
        </div>
      </div>

      <Link
        onClick={closeResultsMenu}
        href={`/products/${product.slug}`}
        className="absolute inset-0"
      >
        <p className="sr-only">{product.title}</p>
      </Link>
    </div>
  );
}
