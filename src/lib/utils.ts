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
  const remInPixels = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );

  return parseInt(defaultTheme.screens[breakpoint]) * remInPixels;
}
