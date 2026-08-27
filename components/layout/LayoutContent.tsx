"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Cta from "./Cta";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Cek apakah halaman saat ini adalah halaman auth (login, register, dsb)
  const isAuthPage = pathname?.includes("/login");

  return (
    <>
      <Header isAuthPage={isAuthPage} />
      <main className="min-h-svh flex-1">
        {children}

        {!isAuthPage && <Cta />}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
