"use client";

import Title from "@/components/ui/title";
import { CarouselCustomControls } from "@/components/shared/carousel-custom-controls";
import { CarouselApi } from "@/components/ui/carousel";
import { useState } from "react";
import { useTranslations } from "next-intl";
import CategoriesCarousel from "@/components/shared/categories-carousel";
import { MOCK_CATEGORIES_GENRES } from "@/mock/categories.data";

export default function CategoriesSection() {
  const [api, setApi] = useState<CarouselApi>();
  const t = useTranslations("LandingPage.Categories");

  return (
    <section className="container mb-32">
      {/* HEADER SECTION */}
      <div
        id="categories"
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-4 mb-5 lg:mb-9"
      >
        {/* Title */}
        <Title title={t("Section.title")} text={t("Section.description")} />

        {/* Taruh komponen navigasi custom di sini */}
        <CarouselCustomControls api={api} />
      </div>
      <CategoriesCarousel
        t={(key) => t(`Genres.${key}`)}
        setApi={setApi}
        items={MOCK_CATEGORIES_GENRES}
      />
    </section>
  );
}
