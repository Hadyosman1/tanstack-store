import { Product } from "@/types/products";
import { User } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./auth/useUserStore";

interface WishlistItem {
  id: Product["id"];
  slug: Product["slug"];
}

interface Wishlists {
  [userId: User["id"]]: WishlistItem[];
}

interface CartStore {
  wishlists: Wishlists;
  toggleWishlistItem: (id: Product["id"], slug: Product["slug"]) => void;
  removeFromWishlist: (id: Product["id"], slug: Product["slug"]) => void;
  clearWishlist: () => void;
  getWishList: () => WishlistItem[];
}

const getUserId = () => useUserStore.getState().user?.id ?? -Infinity;
const getCurrentWishlist = (wishlists: Wishlists) => {
  const userId = getUserId();
  return wishlists[userId] ?? [];
};

export const useWishlistStore = create<CartStore>()(
  persist(
    (set, get) => {
      return {
        wishlists: {},
        getWishList: () => get().wishlists[getUserId()] ?? [],
        toggleWishlistItem: (id, slug) => {
          const userId = getUserId();
          const currentWishlist = getCurrentWishlist(get().wishlists);

          const isLiked = currentWishlist.some(
            (item) => item.id === id && item.slug === slug,
          );

          if (isLiked) {
            set({
              wishlists: {
                ...get().wishlists,
                [userId]: currentWishlist.filter(
                  (item) => item.id !== id || item.slug !== slug,
                ),
              },
            });
          } else {
            set({
              wishlists: {
                ...get().wishlists,
                [userId]: [...currentWishlist, { id, slug }],
              },
            });
          }
        },
        removeFromWishlist: (id, slug) => {
          const userId = getUserId();
          const currentWishlist = getCurrentWishlist(get().wishlists);

          set({
            wishlists: {
              ...get().wishlists,
              [userId]: currentWishlist.filter(
                (item) => item.id !== id || item.slug !== slug,
              ),
            },
          });
        },
        clearWishlist: () => {
          const userId = getUserId();
          set({ wishlists: { ...get().wishlists, [userId]: [] } });
        },
      };
    },
    { name: `cart-store` },
  ),
);

export const useGetWishlistQuantity = () =>
  useWishlistStore((state) => getCurrentWishlist(state.wishlists).length);

export const useGetWishlistItem = (id: Product["id"], slug: Product["slug"]) =>
  useWishlistStore((state) => {
    const currentWishlist = getCurrentWishlist(state.wishlists);
    return (
      currentWishlist.find((item) => item.id === id && item.slug === slug) ??
      null
    );
  });
