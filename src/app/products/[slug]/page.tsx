import { ProductCardsSkeleton } from "@/components/products/ProductCardSkeleton";
import ProductsGrid from "@/components/products/ProductsGrid";
import services from "@/services/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";
import Product from "../Product";
import RelatedProducts from "./RelatedProducts";

const getProduct = cache(services.getProductBySlug);

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProduct(slug);

  if (!product) notFound();

  return {
    title: product.title,
    description: product.description,
  };
}

// TODO: Finalize the product page
export default async function ProductPage({ params }: ProductPageProps) {
  const slug = (await params).slug;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <main className="container space-y-8 py-8">
      <Product product={product} />

      <Suspense
        fallback={
          <ProductsGrid>
            <ProductCardsSkeleton />
          </ProductsGrid>
        }
      >
        <RelatedProducts slug={slug} />
      </Suspense>
    </main>
  );
}
