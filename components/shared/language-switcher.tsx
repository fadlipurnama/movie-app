"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "short" | "full"; // 🔴 Prop untuk memilih jenis tampilan
}

export default function LanguageSwhitcer({
  variant = "short",
}: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale: "id" | "en") => {
    if (nextLocale === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    router.refresh();
  };

  return (
    <Select
      value={currentLocale}
      disabled={isPending}
      onValueChange={(value) => handleLanguageChange(value as "id" | "en")}
    >
      <SelectTrigger
        aria-label={t("label")}
        className="w-auto rounded-xs text-foreground outline-none data-popup-open:ring-2"
      >
        <Languages className="mr-1 size-4" />
        <SelectValue>
         
          {variant === "short" ? currentLocale.toUpperCase() : t(currentLocale)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-none  **:rounded-none">
        <SelectItem value="id">{t("id")}</SelectItem>
        <SelectItem value="en">{t("en")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
