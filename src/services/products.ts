import { Product } from "@/types/products";

interface GetProductsWithFilterAndPaginationParams {
  offset: number;
  searchParams: URLSearchParams;
}

const PRODUCT_PAGE_SIZE = 10;

export default {
  getProductsWithFilterAndPagination: async ({
    offset,
    searchParams,
  }: GetProductsWithFilterAndPaginationParams) => {
    const category = searchParams.get("category");
    const priceMin = searchParams.get("price_min");
    const priceMax = searchParams.get("price_max");

    const newSearchParams = new URLSearchParams({
      offset: `${(offset - 1) * PRODUCT_PAGE_SIZE}`,
      limit: `${PRODUCT_PAGE_SIZE + 1}`,
      ...(category ? { categorySlug: category } : {}),
      ...(priceMin ? { price_min: priceMin } : {}),
      ...(priceMax ? { price_max: priceMax } : {}),
    });

    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products?${newSearchParams.toString()}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }

    return res.json() as Promise<Product[]>;
  },
  getAllProducts: async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");

    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }

    return res.json() as Promise<Product[]>;
  },
  getProductsByCategoryId: async (id: number) => {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}/products`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }
    return res.json() as Promise<Product[]>;
  },
};
