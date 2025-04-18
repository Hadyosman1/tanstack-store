import { Category } from "@/types/categories";
import { API_BASE_URL } from "@/constants";

const services = {
  getCategories: async () => {
    const res = await fetch(`${API_BASE_URL}/categories`);

    if (!res.ok) {
      throw new Error(`Failed to fetch categories, status: ${res.status}`);
    }

    return res.json() as Promise<Category[]>;
  },
};

export default services;
