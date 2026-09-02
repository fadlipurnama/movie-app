import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { MovieGenrePosterType } from "@/services/data/categories-by-genre";
import { slugify } from "@/lib/utils";

interface CategoriesGridCarouselProps {
  items: MovieGenrePosterType[];
  setApi?: (api: CarouselApi) => void;
}

export default function CategoriesGridCarousel({
  items,
  setApi,
}: CategoriesGridCarouselProps) {
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full space-y-6"
    >
      <CarouselContent className="-ml-4">
        {items.map((item) => (
          <CarouselItem key={item.id} className="pl-4 basis-1/3 lg:basis-1/5">
            <div>
              <Card className="cursor-pointer border border-black-10 select-none hover:border-red-45 transition-colors">
                <CardContent className="">
                  <div className="grid grid-cols-2 gap-1.5 relative">
                    {item.posters.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${item.name}`}
                        className="w-full rounded-xs object-cover aspect-square"
                        sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
                        width={50}
                        height={50}
                      />
                    ))}

                    {/* Jika ada type (seperti Popular Top 10 In Genres) */}
                    {item.type && (
                      <span className="absolute -bottom-7 -left-0.5 opacity-85 bg-red-45 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="inline-flex items-center justify-between py-2 pl-4 pr-1">
                  <h3 className="text-xs sm:text-sm font-semibold">
                    {item.name}
                  </h3>
                  <Button variant="ghost" size="icon">
                    <Link
                      href={`${item.type && slugify(item.type)}/${slugify(item.name)}?id=${item.id}`}
                    >
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
