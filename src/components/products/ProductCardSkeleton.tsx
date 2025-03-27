import { PRODUCT_PAGE_SIZE } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ProductCardsSkeleton({
  count = PRODUCT_PAGE_SIZE,
}: {
  count?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="overflow-hidden rounded-t-lg shadow">
        <Skeleton className="aspect-square w-full" />
      </div>
      <Card className="gap-2 rounded-t-none border-t-0">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-2/3" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex min-h-[3lh] flex-col gap-2">
            <Skeleton className="h-[0.80lh] w-2/3" />
            <Skeleton className="h-[0.80lh] w-4/5" />
            <Skeleton className="h-[0.80lh] w-1/4" />
          </CardDescription>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
