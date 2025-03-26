import ProductCard from "@/components/products/ProductCard";
import services from "@/services/products";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

const getProducts = cache(async (id: number) => {
  return services.getProductsByCategoryId(id);
});

interface ProductsByCategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductsByCategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const products = await getProducts(parseInt(id));
  if (!products.length) notFound();

  const category = products[0].category;

  return {
    title: `${category.name} products`,
    description: `All products in the ${category.name} category`,
  };
}

export default async function ProductsByCategoryPage({
  params,
}: ProductsByCategoryPageProps) {
  const { id } = await params;

  const products = await getProducts(parseInt(id));

  if (!products.length) notFound();

  return (
    <main className="container space-y-8 py-8">
      <Image
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

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 py-8">
        {products.map((pro, idx) => (
          <ProductCard key={pro.id} product={pro} productIdx={idx} />
        ))}
      </div>
    </main>
  );
}
