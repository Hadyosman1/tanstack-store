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
import ImageWithFallback from "../ImageWithFallback";

interface CategoriesProps {
  categories: Category[];
}

export default function CategoriesCarousel({ categories }: CategoriesProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {categories.map((cat) => (
          <CarouselItem
            key={cat.slug}
            className={`basis-1/2 md:basis-1/3 lg:basis-1/5`}
          >
            <div className="p-0.5">
              <Card className="group relative overflow-hidden p-0">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  width={520}
                  height={520}
                  priority
                  className="aspect-square select-none"
                />
                <div className="from-foreground/50 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 max-md:opacity-100">
                  <h3 className="text-accent flex h-full items-center justify-center font-bold select-none lg:text-lg">
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
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
