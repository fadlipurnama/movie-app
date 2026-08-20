"use client";

import { useTranslations } from "next-intl";
import { CtaForm } from "./CtaForm";

export default function Cta() {
  const t = useTranslations("Layout.CTA");

  return (
    <section className="mb-32">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto px-4">
          <p className="text-white text-lg md:text-xl font-normal">
            {t("title")}
          </p>

          <CtaForm />
        </div>
      </div>
    </section>
  );
}