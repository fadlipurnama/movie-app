// landing-page/components/categories-section.tsx
import { getLocale } from "next-intl/server";
import CategoriesSectionClient from "./categories-section-client";
import {
  getMoviePosterByGenre,
  getTvPosterByGenre,
} from "@/services/data/categories-by-genre";

interface CategoriesSectionProps {
  type: "movie" | "tv";
  title: string;
  description: string;
}

export default async function CategoriesSection({
  type,
  title,
  description,
}: CategoriesSectionProps) {
  const locale = (await getLocale()).toUpperCase() as "ID" | "EN";

  // Panggil service sesuai tipe yang diminta
  const items =
    type === "tv"
      ? await getTvPosterByGenre(locale)
      : await getMoviePosterByGenre(locale);

  // const categoryPosters = await getMoviePosterByGenre(formattedLocale);

  return (
    <CategoriesSectionClient
      title={title}
      description={description}
      items={items}
    />
  );
}
