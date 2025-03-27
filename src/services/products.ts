import { API_BASE_URL, PRODUCT_PAGE_SIZE } from "@/constants";
import { Product } from "@/types/products";

interface GetProductsWithFilterAndPaginationParams {
  pageParam: number;
  searchParams: URLSearchParams;
}

const services = {
  getProductsWithFilterAndPagination: async ({
    pageParam,
    searchParams,
  }: GetProductsWithFilterAndPaginationParams) => {
    const category = searchParams.get("category");
    const priceMin = searchParams.get("price_min");
    const priceMax = searchParams.get("price_max");

    const newSearchParams = new URLSearchParams({
      offset: `${(pageParam - 1) * PRODUCT_PAGE_SIZE}`,
      limit: `${PRODUCT_PAGE_SIZE + 1}`,
      ...(category ? { categorySlug: category } : {}),
      ...(priceMin ? { price_min: priceMin } : {}),
      ...(priceMax ? { price_max: priceMax } : {}),
    });

    const res = await fetch(
      `${API_BASE_URL}/products?${newSearchParams.toString()}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }

    return res.json() as Promise<Product[]>;
  },
  getAllProducts: async () => {
    const res = await fetch(`${API_BASE_URL}/products`);

    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }

    return res.json() as Promise<Product[]>;
  },
  getProductsBySearchInTitle: async ({
    searchTerm,
    pageParam,
  }: {
    searchTerm: string;
    pageParam: number;
  }) => {
    const searchParams = new URLSearchParams({
      offset: `${(pageParam - 1) * PRODUCT_PAGE_SIZE}`,
      limit: `${PRODUCT_PAGE_SIZE + 1}`,
      title: searchTerm,
    });

    const res = await fetch(
      `${API_BASE_URL}/products?${searchParams.toString()}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }

    return res.json() as Promise<Product[]>;
  },
  getProductsByCategoryId: async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}/products`);

    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }

    return res.json() as Promise<Product[]>;
  },
  getProductBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/products/slug/${slug}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch product, status: ${res.status}`);
    }

    return res.json() as Promise<Product>;
  },
  getRelatedProductsBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/products/slug/${slug}/related`);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch related products, status: ${res.status}`,
      );
    }

    return res.json() as Promise<Product[]>;
  },
};

export default services;
