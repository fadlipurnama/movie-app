import { Link, usePathname } from "@/i18n/routing";
import { HEADER_NAV_CONFIG } from "@/components/layout/constants/header.config";
import { useTranslations } from "next-intl";

export default function DesktopNav() {
  const t = useTranslations("Layout.Header.navigation");
  const pathname = usePathname();

  return (
    <nav className={`hidden lg:flex items-center flex-1`}>
      <ul className="flex items-center justify-center gap-1 mx-auto bg-navbar ring-1 ring-navbar-ring p-1 rounded-[10px]">
        {HEADER_NAV_CONFIG.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={`px-5 py-3 block rounded-sm text-sm xl:text-base text-navbar-foreground 
                ${pathname === item.href ? "bg-navbar-accent" : "hover:bg-navbar-accent-2 transition-colors"}`}
            >
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
