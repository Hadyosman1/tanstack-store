import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
