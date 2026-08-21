import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { getMessages, getTranslations } from "next-intl/server";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Cta from "@/components/layout/Cta";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;

  // getTranslations dipanggil di dalam fungsi request scope
  const t = await getTranslations({
    locale: locale || "id",
    namespace: "Layout.Metadata",
  });

  return {
    title: t("defaultTitle"),
    description: t("defaultDescription"),
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${manrope.className} dark`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className="min-h-full flex flex-col">
          <Header />
          <main className="min-h-svh">
            {children}
            <Cta />
          </main>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
