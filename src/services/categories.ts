import { Category } from "@/types/categories";

export default {
  getCategories: async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!res.ok) {
      throw new Error(`Failed to fetch categories, status: ${res.status}`);
    }
    return res.json() as Promise<Category[]>;
  },
};
