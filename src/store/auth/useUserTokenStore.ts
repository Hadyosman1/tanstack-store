import { UserTokens } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./useUserStore";

interface UserTokenStore {
  access_token: string | null;
  refresh_token: string | null;
  setTokens: (tokens: UserTokens) => void;
  clearTokens: () => void;
}

export const useUserTokenStore = create<UserTokenStore>()(
  persist(
    (set) => {
      return {
        access_token: null,
        refresh_token: null,
        setTokens: (tokens: UserTokens) =>
          set((state) => ({ ...state, ...tokens })),
        clearTokens: () =>
          set((state) => ({
            ...state,
            access_token: null,
            refresh_token: null,
          })),
      };
    },
    { name: "user-token-store" },
  ),
);

if (typeof window !== undefined && useUserTokenStore.getState().access_token) {
  useUserStore.getState().fetchUser(useUserTokenStore.getState().access_token!);
}

useUserTokenStore.subscribe((state) => {
  if (state.access_token) {
    useUserStore.getState().fetchUser(state.access_token);
  } else {
    useUserStore.getState().setUser(null);
    useUserStore.getState().setIsLoggedIn(false);
  }
});
