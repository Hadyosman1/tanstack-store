import { Product } from "@/types/products";
import { User } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./useUserStore";

interface CartItem {
  id: Product["id"];
  slug: Product["slug"];
  quantity: number;
}

interface Carts {
  [userId: User["id"]]: CartItem[];
}

interface CartStore {
  carts: Carts;
  addToCart: (id: Product["id"], slug: Product["slug"]) => void;
  removeFromCart: (id: Product["id"], slug: Product["slug"]) => void;
  decreaseQuantity: (id: Product["id"], slug: Product["slug"]) => void;
  clearCart: () => void;
  getCart: () => CartItem[];
}

const getUserId = () => useUserStore.getState().user?.id ?? -Infinity;
const getCurrentCart = (carts: Carts) => {
  const userId = getUserId();
  return carts[userId] ?? [];
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      return {
        carts: {},
        getCart: () => get().carts[getUserId()] ?? [],
        addToCart: (id, slug) => {
          const userId = getUserId();
          const currentCart = getCurrentCart(get().carts);

          const isExisting = currentCart.some(
            (item) => item.id === id && item.slug === slug,
          );

          if (isExisting) {
            set({
              carts: {
                ...get().carts,
                [userId]: currentCart.map((item) => {
                  if (item.id === id && item.slug === slug) {
                    return { ...item, quantity: item.quantity + 1 };
                  }
                  return item;
                }),
              },
            });
          } else {
            set({
              carts: {
                ...get().carts,
                [userId]: [...currentCart, { id, slug, quantity: 1 }],
              },
            });
          }
        },
        removeFromCart: (id, slug) => {
          const userId = getUserId();
          const currentCart = getCurrentCart(get().carts);

          set({
            carts: {
              [userId]: currentCart.filter(
                (item) => item.id !== id || item.slug !== slug,
              ),
            },
          });
        },
        decreaseQuantity: (id, slug) => {
          const userId = getUserId();
          const currentCart = getCurrentCart(get().carts);

          set({
            carts: {
              ...get().carts,
              [userId]: currentCart.map((item) => {
                if (item.id === id && item.slug === slug) {
                  return {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                  };
                } else return item;
              }),
            },
          });
        },
        clearCart: () => {
          const userId = getUserId();

          set({ carts: { ...get().carts, [userId]: [] } });
        },
      };
    },
    { name: `cart-store` },
  ),
);

export const useGetCartItemQuantity = (
  id: Product["id"],
  slug: Product["slug"],
) =>
  useCartStore((state) => {
    const currentCart = getCurrentCart(state.carts);
    return currentCart.find((item) => item.id === id && item.slug === slug)
      ?.quantity;
  });

export const useGetCartQuantity = () =>
  useCartStore((state) => {
    const currentCart = getCurrentCart(state.carts);
    return currentCart.reduce((acc, curr) => acc + curr.quantity, 0);
  });

export const useGetCartItem = (id: Product["id"], slug: Product["slug"]) =>
  useCartStore((state) => {
    const currentCart = getCurrentCart(state.carts);
    const cartItem = currentCart.find(
      (item) => item.id === id && item.slug === slug,
    );
    return cartItem ?? null;
  });
