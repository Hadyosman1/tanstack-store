import ImageWithErrorFallback from "@/components/ImageWithErrorFallback";
import ProductList from "@/components/products/ProductList";
import services from "@/services/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getProducts = cache(async (id: number) => {
  try {
    const products = await services.getProductsByCategoryId(id);
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }
});

interface ProductsByCategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductsByCategoryPageProps): Promise<Metadata> {
  const id = parseInt((await params).id);

  if (isNaN(id)) return { title: "Products" };

  const products = await getProducts(id);

  if (!products || products.length === 0) return { title: "Products" };

  const category = products[0].category;

  return {
    title: `${category.name} products`,
    description: `All products in the ${category.name} category`,
  };
}

export default async function ProductsByCategoryPage({
  params,
}: ProductsByCategoryPageProps) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return notFound();

  const products = await getProducts(id);

  if (!products || !products.length) return notFound();

  return (
    <main className="container space-y-8 py-8">
      <ImageWithErrorFallback
        src={products[0].category.image}
        alt={products[0].category.name}
        width={520}
        height={520}
        className="mx-auto aspect-video max-h-96 w-full rounded-lg object-cover shadow-md"
        priority
      />

      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight capitalize max-sm:text-xl lg:text-4xl">
        {products[0].category.name} products
      </h1>

      <ProductList products={products} />
    </main>
  );
}
