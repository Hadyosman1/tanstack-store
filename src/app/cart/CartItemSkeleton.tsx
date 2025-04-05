import { Skeleton } from "@/components/ui/skeleton";

export default function CartItemSkeleton() {
  return (
    <div className="bg-accent flex flex-col items-center gap-5 rounded-md border p-5 shadow md:flex-row">
      <Skeleton className="h-[200px] w-[200px] rounded-md" />

      <div className="w-full grow space-y-3">
        <div className="flex justify-end">
          <Skeleton className="h-8 w-[80px] rounded md:w-[100px]" />
        </div>

        <Skeleton className="h-6 w-1/2 rounded" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>

        <div className="flex w-fit items-center gap-2 rounded-md px-4 py-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-6 w-6 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>

        <Skeleton className="h-5 w-1/3 rounded" />
      </div>
    </div>
  );
}
