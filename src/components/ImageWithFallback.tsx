"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import productImagePlaceholder from "@/../public/product-image-placeholder.png";

interface ImageWithFallbackProps extends ImageProps {
  size?: number;
  className?: string;
}

const isValidImageUrl = (url: string) => /^https?:\/\//.test(url);

export default function ImageWithFallback({
  size = 520,
  className,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(
    isValidImageUrl(src as string) ? src : productImagePlaceholder.src,
  );

  return (
    <Image
      width={size}
      height={size}
      className={className}
      src={imgSrc}
      onError={() => setImgSrc(productImagePlaceholder.src)}
      {...props}
    />
  );
}
