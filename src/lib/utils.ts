import { useAuthDialogStore } from "@/store/auth/useAuthDialogStore";
import { useUserStore } from "@/store/auth/useUserStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import defaultTheme from "tailwindcss/defaultTheme";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToHomeProductsSection() {
  const homeProductsSection = document.getElementById("home-products-section");
  if (homeProductsSection) {
    homeProductsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getTwBreakpoint(breakpoint: keyof typeof defaultTheme.screens) {
  if (typeof window === "undefined") return 0;

  const remInPixels = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize,
  );

  return parseInt(defaultTheme.screens[breakpoint]) * remInPixels;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function openAuthDialogIfNotLoggedIn<T extends (...args: any[]) => any>(
  fn: T,
): T {
  return ((...args: Parameters<T>) => {
    const isLoggedIn = useUserStore.getState().isLoggedIn;
    const setIsAuthDialogOpen = useAuthDialogStore.getState().setIsOpen;
    const setAuthDialogDescription =
      useAuthDialogStore.getState().setDescription;

    if (!isLoggedIn) {
      setIsAuthDialogOpen(true);
      setAuthDialogDescription("Please login to continue");
      return;
    }

    return fn(...args);
  }) as T;
}
