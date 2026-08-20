import { Button } from "@/components/ui/button";
import { RiPlayFill } from "@remixicon/react";
import { useTranslations } from "next-intl";

export default function HeroContent() {
  const t = useTranslations("LandingPage.Hero.Content");

  return (
    <>
      {/* Content */}
      <div className="z-2 max-h-44 bottom-0 translate-y-[-60%] container text-center mb-10">
        <h1 className="text-2xl mb-4 sm:text-3xl lg:text-4xl">{t("title")}</h1>
        <p className="max-w-3.5xl  mx-auto mt-2.5 mb-6 md:mb-8 ">
          {t("description")}
        </p>
        <Button size={"lg"}>
          <span>
            <RiPlayFill />
          </span>
          {t("button")}
        </Button>
      </div>
    </>
  );
}
