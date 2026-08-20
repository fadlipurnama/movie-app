import { useTranslations } from "next-intl";
import { FOOTER_NAV_CONFIG } from "../constants/footer.config";
import { Link } from "@/i18n/routing";

export default function FooterNav() {
  const t = useTranslations("Layout.Footer.navigation");

  return (
    <>
      {FOOTER_NAV_CONFIG.map((section) => (
        <div key={section.id} className="space-y-2">
          <p className="text-foreground font-semibold capitalize">
            {t(section.titleKey)}
          </p>
          <ul className="space-y-1 capitalize">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link className="hover:underline" href={link.href}>
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
