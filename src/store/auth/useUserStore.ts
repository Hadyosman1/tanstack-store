import services from "@/services/auth";
import { User, UserTokens } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  isLoggedIn: boolean;
  user: User | null;
  isFetchingUser: boolean;
  setIsFetchingUser: (v: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User | null) => void;
  fetchUser: (access_token: UserTokens["access_token"]) => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => {
      async function fetchUser(access_token: UserTokens["access_token"]) {
        console.log("Firing fetchUser😋");
        set((state) => ({ ...state, isFetchingUser: true }));
        try {
          const userProfile = await services.getUserProfile(access_token);
          set((state) => ({ ...state, isLoggedIn: true, user: userProfile }));
        } catch (error) {
          console.error(error);
          set((state) => ({ ...state, isLoggedIn: false, user: null }));
        } finally {
          set((state) => ({ ...state, isFetchingUser: false }));
        }
      }

      function clearUser() {
        set({
          isLoggedIn: false,
          user: null,
          isFetchingUser: false,
        });
      }

      return {
        isLoggedIn: false,
        user: null,
        isFetchingUser: false,
        setIsFetchingUser: (v) =>
          set((state) => ({ ...state, isFetchingUser: v })),
        setIsLoggedIn: (isLoggedIn: boolean) =>
          set((state) => ({ ...state, isLoggedIn })),
        setUser: (user: User | null) => set((state) => ({ ...state, user })),
        fetchUser,
        clearUser,
      };
    },
    { name: "user-store" },
  ),
);
