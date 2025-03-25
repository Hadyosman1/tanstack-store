import { Product } from "@/types/products";

export default {
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
