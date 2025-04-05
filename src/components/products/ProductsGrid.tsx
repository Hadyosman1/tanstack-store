import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function ProductsGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 py-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
