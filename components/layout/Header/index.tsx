"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing"; // 🟢 Import usePathname dari i18n
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";
import LanguageSwhitcer from "../../shared/language-switcher";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Header({ isAuthPage }: { isAuthPage: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations("Layout.Header");

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    queueMicrotask(() => {
      setIsReady(true);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${!isAuthPage ? "fixed" : "absolute"} top-0 py-4 w-full z-50 transition-all duration-500 ease-in-out 
     ${isReady ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${
          isScrolled
            ? "bg-linear-to-b form-header to-header/50 backdrop-blur-2xl "
            : "-translate-y-full bg-transparent"
        }`}
    >
      <div className="px-4 sm:px-8 lg:px-12 flex items-center justify-between relative">
        {/* Logo (Selalu tampil di semua halaman) */}
        <Link href={"/"}>
          <Image
            src={"/assets/logo/inline-logo.svg"}
            alt="inline-logo"
            width={"166"}
            height={"50"}
          />
        </Link>

        {/* Desktop Menu - Disembunyikan saat di Auth Page */}
        {!isAuthPage && <DesktopNav />}

        {/* Btns */}
        <div className="flex items-center">
          {/* Sembunyikan Search & Bell di Auth Page */}
          {!isAuthPage && (
            <>
              <Button size={"icon-lg"} variant={"ghost"}>
                <Search />
              </Button>

              <Button size={"icon-lg"} variant={"ghost"}>
                <Bell />
              </Button>
            </>
          )}

          {/* Language Switcher (Tetap tampil agar user bisa ganti bahasa di login) */}
          <LanguageSwhitcer />

          {/* Menu Btn Mobile - Disembunyikan saat di Auth Page */}
          {!isAuthPage && (
            <Button
              size={"icon-lg"}
              variant={"secondary"}
              className={"lg:hidden ml-2"}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </Button>
          )}

          {/* Tombol Login - Disembunyikan jika SUDAH di halaman login */}
          {!isAuthPage && (
            <Link href="/login">
              <Button
                className={"hidden lg:block ml-2 rounded-sm font-semibold"}
              >
                {t("login")}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!isAuthPage && (
        <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </header>
  );
}
