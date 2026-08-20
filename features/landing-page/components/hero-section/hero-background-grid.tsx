import Image from "next/image";
import { MOCK_POSTERS } from "./mock-poster";
function getResponsiveDisplay(index: number): string {
  if (index >= 9 && index < 15) {
    return "hidden sm:block";
  }
  if (index >= 15 && index < 21) {
    return "hidden md:block";
  }
  if (index >= 21) {
    return "hidden xl:block";
  }
  return "block"; // Default 0-8 muncul di layar terkecil (HP)
}

export default function HeroBackgroundGrid() {
  const poster = MOCK_POSTERS.slice(0, 36);

  return (
    <>
      {/* 2. GRID BACKGROUND DEKORATIF - Z-0 & POINTER-EVENTS-NONE */}
      <div className="absolute inset-0 z-0 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-7 p-2 xl:grid-cols-9 gap-2 opacity-30 pointer-events-none select-none">
        {poster.map((item, index) => {
          const responsiveDisplay = getResponsiveDisplay(index);
          return (
            <div
              key={item.id}
              className={`relative rounded-lg overflow-hidden bg-card ${responsiveDisplay}`}
            >
              <Image
                src={item.url}
                alt={`Dekoratif Poster ${index + 1}`}
                className="object-cover"
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
                fill
             // 🔴 Turunkan quality untuk gambar background dekoratif
                quality={75}
                // 🔴 Gunakan priority untuk 6 gambar pertama (Hero section)
                priority={index < 6}
              />
            </div>
          );
        })}
      </div>
<div className="absolute inset-0 z-1 bg-linear-to-t from-background via-background/20 to-background/60 pointer-events-none" />
    </>
  );
}
