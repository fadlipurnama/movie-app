import { FOOTER_SOCIAL_CONFIG } from "../constants/footer.config";
import { useTranslations } from "next-intl";

export default function FooterSocial() {
  const t = useTranslations("Layout.Footer");

  return (
    <div className="text-foreground space-y-2.5">
      <p className="font-semibold">{t("socialMedia")}</p>
      <div className="inline-flex items-center gap-2.5">
        {FOOTER_SOCIAL_CONFIG.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="size-11 inline-flex items-center justify-center bg-navbar-accent hover:bg-navbar-accent-2 transition-colors ring-1 ring-navbar-ring rounded-sm"
            >
              <IconComponent className="size-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
