"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";
import LanguageSwhitcer from "../../shared/language-switcher";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations("Layout.Header");

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false); // 🔴 Flag untuk menandai posisi scroll sudah siap

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // 1. Cek posisi scroll saat ini
    handleScroll();

    // 2. Tampilkan header dari atas setelah posisi scroll terdeteksi
    queueMicrotask(() => {
      setIsReady(true);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 py-4 w-full z-50 transition-all duration-500 ease-in-out 
     ${isReady ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        ${
          isScrolled
            ? "bg-linear-to-b form-header to-header/50 backdrop-blur-2xl "
            : "-translate-y-full bg-transparent"
        }`}
    >
      <div className="px-4 sm:px-8 lg:px-12 flex items-center justify-between relative">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={"/assets/logo/inline-logo.svg"}
            alt="inline-logo"
            width={"166"}
            height={"50"}
          />
        </Link>

        {/* Desktop Menu */}
        <DesktopNav />

        {/* Btns */}
        <div className="flex items-center">
          <Button size={"icon-lg"} variant={"ghost"}>
            <Search />
          </Button>

          <Button size={"icon-lg"} variant={"ghost"}>
            <Bell />
          </Button>

          <LanguageSwhitcer />

          {/* Menu btn */}
          <Button
            size={"icon-lg"}
            variant={"secondary"}
            className={"lg:hidden ml-2"}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </Button>

          {/* Btn Loggin */}
          <Button className={"hidden lg:block ml-2 rounded-sm font-semibold"}>
            {t("login")}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
