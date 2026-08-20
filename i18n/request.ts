import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import fs from "fs";
import path from "path";
import { AbstractIntlMessages } from "next-intl";

function toPascalCase(str: string) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "id" | "en")) {
    locale = routing.defaultLocale;
  }

  // 1. Load semua messages global dari components/messages/[locale].json
  const componentMessages: Record<string, AbstractIntlMessages> = (
    await import(`../components/messages/${locale}.json`)
  ).default;

  // 2. Load messages spesifik dari folder features/
  const featureMessages: Record<string, AbstractIntlMessages> = {};
  const featuresDir = path.join(process.cwd(), "features");

  if (fs.existsSync(featuresDir)) {
    const featureFolders = fs.readdirSync(featuresDir);

    for (const feature of featureFolders) {
      const filePath = path.join(featuresDir, feature, "messages", `${locale}.json`);

      if (fs.existsSync(filePath)) {
        const fileContent = (
          await import(`../features/${feature}/messages/${locale}.json`)
        ).default;

        const key = toPascalCase(feature); // Contoh: landing-page -> LandingPage
        featureMessages[key] = fileContent;
      }
    }
  }

  // 3. Gabungkan Message Global (components) & Message Fitur
  return {
    locale,
    messages: {
      ...componentMessages, // 👈 Otomatis memasukkan "LanguageSwitcher", "Layout", dll.
      ...featureMessages,   // 👈 Otomatis memasukkan "LandingPage", "MovieDetail", dll.
    },
  };
});