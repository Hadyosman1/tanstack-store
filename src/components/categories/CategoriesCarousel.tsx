import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Category } from "@/types/categories";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import ImageWithErrorFallback from "../ImageWithErrorFallback";
import { cn } from "@/lib/utils";

interface CategoriesProps {
  categories: Category[];
}

export default function CategoriesCarousel({ categories }: CategoriesProps) {
  return (
    <Carousel opts={{ align: "center" }} className="w-full">
      <CarouselContent>
        {categories.map((cat) => (
          <CarouselItem
            key={cat.slug}
            className={`basis-1/2 md:basis-1/3 lg:basis-1/5`}
          >
            <div className="p-0.5">
              <Card className="group relative overflow-hidden p-0">
                <ImageWithErrorFallback
                  src={cat.image}
                  alt={cat.name}
                  width={520}
                  height={520}
                  priority
                  className="aspect-square select-none"
                />
                <div className="from-foreground/50 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 max-md:opacity-100">
                  <h3 className="text-accent flex h-full items-center justify-center text-sm font-bold break-all select-none sm:text-base lg:text-lg">
                    <Link
                      href={`/categories/${cat.id}/products`}
                      className="select-none hover:underline"
                    >
                      {cat.name}
                      <LinkIcon className="ms-1 inline-block size-5" />
                    </Link>
                  </h3>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={cn("left-0 sm:left-2", {
          "lg:hidden": categories.length === 5,
          "md:hidden": categories.length === 3,
          hidden: categories.length === 2,
        })}
      />
      <CarouselNext
        className={cn("right-0 sm:right-2", {
          "lg:hidden": categories.length === 5,
          "md:hidden": categories.length === 3,
          hidden: categories.length === 2,
        })}
      />
    </Carousel>
  );
}
