import {
  RiFacebookFill,
  RiTwitterFill,
  RiLinkedinFill,
  type RemixiconComponentType,
} from "@remixicon/react";

export interface BaseFooterSection {
  id: number | string;
  titleKey: string;
  links: {
    key: string;
    href: string;
  }[];
  name: string;
  href: string;
  icon: RemixiconComponentType;
}

// 🔴 2. Gunakan Omit untuk membuang field khusus Social Media

export const FOOTER_NAV_CONFIG: Omit<
  BaseFooterSection,
  "name" | "href" | "icon"
>[] = [
  {
    id: 1,
    titleKey: "home",
    links: [
      { key: "categories", href: "#categories" },
      { key: "devices", href: "#devices" },
      { key: "pricing", href: "#pricing" },
      { key: "faq", href: "#faq" },
      { key: "contact", href: "/contact-us" },
    ],
  },
  {
    id: 2,
    titleKey: "movies",
    links: [
      { key: "genres", href: "/movies/genres" },
      { key: "trending", href: "/movies/trending" },
      { key: "newRelease", href: "/movies/new-release" },
      { key: "popular", href: "/movies/popular" },
    ],
  },
  {
    id: 3,
    titleKey: "tv-shows",
    links: [
      { key: "genres", href: "/tv-show/genres" },
      { key: "trending", href: "/tv-show/trending" },
      { key: "newRelease", href: "/tv-shows/new-release" },
      { key: "popular", href: "/tv-show/popular" },
    ],
  },
];

export const FOOTER_POLICY_CONFIG: Omit<BaseFooterSection, "icon" | "links">[] = [
  {
    id: 1,
    name: "Terms of Us",
    titleKey: "terms",
    href: "#",
  },
  {
    id: 2,
    name: "Privacy Policy",
    titleKey: "privacy",
    href: "#",
  },
  {
    id: 3,
    name: "Cookie Policy",
    titleKey: "cookie",
    href: "#",
  },
];

// 🔴 2. Data Konfigurasi Social Media
export const FOOTER_SOCIAL_CONFIG: Omit<
  BaseFooterSection,
  "titleKey" | "links"
>[] = [
  {
    id: 1,
    name: "Facebook",
    href: "https://facebook.com",
    icon: RiFacebookFill,
  },
  {
    id: 2,
    name: "Twitter",
    href: "https://twitter.com",
    icon: RiTwitterFill,
  },
  {
    id: 3,
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: RiLinkedinFill,
  },
];
