import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/products";
import ImageWithErrorFallback from "../ImageWithErrorFallback";

interface ProductCardCarouselProps {
  images: Product["images"];
  priority: boolean;
}

export default function ProductCardCarousel({
  images,
  priority,
}: ProductCardCarouselProps) {
  return (
    <Carousel className="group w-full">
      <CarouselContent>
        {images.map((img) => (
          <CarouselItem key={img}>
            <ImageWithErrorFallback
              src={img}
              alt="product image"
              width={520}
              height={520}
              priority={priority}
              className="aspect-square w-full select-none"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 transition-all duration-300 ease-in-out md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100" />
      <CarouselNext className="right-2 transition-all duration-300 ease-in-out md:invisible md:opacity-0 md:group-hover:visible md:group-hover:opacity-100" />
    </Carousel>
  );
}
