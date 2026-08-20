export interface NavItemConfig {
  id: number;
  key: string;  // Menyamakan key di layout.json (Navigation)
  href: string;
}

export const HEADER_NAV_CONFIG: NavItemConfig[] = [
  { id: 1, key: "home", href: "/" },
  { id: 2, key: "movies", href: "/movies" },
  { id: 3, key: "support", href: "/support" },
  { id: 4, key: "subscriptions", href: "/subscriptions" },
];