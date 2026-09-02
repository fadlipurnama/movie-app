import CategoriesSection from "@/features/landing-page/components/categories-section";
import FaqSection from "@/features/landing-page/components/faq-section";
import HeroSection from "@/features/landing-page/components/hero-section";
import { useTranslations } from "next-intl";

function Home() {
  const t = useTranslations("LandingPage");
  return (
    <>
      <HeroSection />
      <CategoriesSection
        type="movie"
        title={t("Categories.MovieSection.title")}
        description={t("Categories.MovieSection.description")}
      />
      <CategoriesSection
        type="tv"
        title={t("Categories.TvSection.title")}
        description={t("Categories.TvSection.description")}
      />
      <FaqSection />
    </>
  );
}

export default Home;
