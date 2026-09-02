// landing-page/components/categories-section.tsx
import { getLocale } from "next-intl/server";
import CategoriesSectionClient from "./categories-section-client";
import { getTvPosterByGenre } from "@/services/data/categories-by-genre";

export default async function CategoriesTvSection() {
  const currentLocale = await getLocale();
  const formattedLocale = currentLocale.toUpperCase() === "ID" ? "ID" : "EN";

  const categoryPosters = await getTvPosterByGenre(formattedLocale);

  return <CategoriesSectionClient items={categoryPosters} />;
}
