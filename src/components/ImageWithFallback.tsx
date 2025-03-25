"use client";
import productImagePlaceholder from "@/../public/product-image-placeholder.png";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends ImageProps {
  size?: number;
  className?: string;
}

export default function ImageWithFallback({
  size = 520,
  className,
  ...others
}: ImageWithFallbackProps) {
  return (
    <Image
      width={size}
      height={size}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        const newImage = document.createElement("img");
        newImage.src = productImagePlaceholder.src;
        newImage.alt = "placeholder";
        newImage.width = size;
        newImage.height = size;
        newImage.className = className || "";
        target.replaceWith(newImage);
      }}
      {...others}
    />
  );
}
