import ProductList from "@/components/products/ProductList";
import services from "@/services/products";

interface RelatedProductsProps {
  slug: string;
}

export default async function RelatedProducts({ slug }: RelatedProductsProps) {
  const relatedProducts = await services.getRelatedProductsBySlug(slug);

  if (!relatedProducts.length) return null;

  return (
    <section className="space-y-8">
      <h2 className="border-b pb-2 text-xl font-bold md:text-3xl">
        Related Products
      </h2>
      <ProductList products={relatedProducts} />
    </section>
  );
}
