// landing-page/utils/responsive-grid.ts (atau taruh di utils lokal)
export function getResponsiveDisplay(index: number): string {
  if (index >= 9 && index < 15) return "hidden sm:block";
  if (index >= 15 && index < 21) return "hidden md:block";
  if (index >= 21) return "hidden xl:block";
  return "block";
}