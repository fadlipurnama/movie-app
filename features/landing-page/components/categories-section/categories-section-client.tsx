"use client";

import Title from "@/components/ui/title";
import { CarouselCustomControls } from "@/components/shared/carousel-custom-controls";
import { CarouselApi } from "@/components/ui/carousel";
import { useState } from "react";
import CategoriesGridCarousel from "@/components/shared/categories-grid-carousel";

import type { MovieGenrePosterType } from "@/services/data/categories-by-genre";


export default function CategoriesSectionClient({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: MovieGenrePosterType[];
}) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="container mb-32">
      <div
        id="categories"
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-4 mb-5 lg:mb-9"
      >
        {/* Title */}
        <Title title={title} text={description} />

        {/* Navigasi Custom*/}
        <CarouselCustomControls api={api} />
      </div>
      <CategoriesGridCarousel
        setApi={setApi}
        items={items}
      />
    </section>
  );
}
