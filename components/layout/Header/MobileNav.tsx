import { Link, usePathname } from "@/i18n/routing";
import { HEADER_NAV_CONFIG } from "@/components/layout/constants/header.config";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("Layout.Header");

  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches && isOpen) {
        onClose();
      }
    };

    // Jalankan sekali saat mount / resize
    handleResize(mediaQuery);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [isOpen, onClose]);

  // 2. Logic Click Outside & Lock Scroll
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);
  return (
    <nav
      ref={navRef}
      className={`py-8 px-6 lg:hidden flex flex-col gap-4 absolute inset-0 min-h-screen bg-background rounded-[10px] opacity-0 invisible ${isOpen && "opacity-100 visible"}`}
    >
      <Button
        onClick={onClose}
        className={"ml-auto"}
        size={"icon-lg"}
        variant={"ghost"}
      >
        <X className="size-8" />
      </Button>
      <ul className="grid w-full items-center gap-1 mx-auto">
        {HEADER_NAV_CONFIG.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={onClose}
              className={`px-6 pr-10 py-3 block text-navbar-foreground  rounded-sm ${pathname === item.href ? "bg-navbar-accent" : "hover:bg-navbar-accent-2 transition-colors"}`}
            >
              {t(`navigation.${item.key}`)}
            </Link>
          </li>
        ))}
      </ul>
      <Button
        size={"lg"}
        className={
          "font-semibold text-base text-white"
        }
      >
        {t("login")}
      </Button>
    </nav>
  );
}
