import { create } from "zustand";

interface AuthDialogStore {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;

  description: string;
  setDescription: (v: string) => void;
}

export const useAuthDialogStore = create<AuthDialogStore>((set) => {
  return {
    isOpen: false,
    setIsOpen: (v: boolean) => set((state) => ({ ...state, isOpen: v })),

    description: "",
    setDescription: (v: string) =>
      set((state) => ({ ...state, description: v })),
  };
});
