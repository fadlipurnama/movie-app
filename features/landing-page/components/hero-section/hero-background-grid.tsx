import Image from "next/image";
import { getHeroGridMovies } from "../../data/poster/hero-grid-poster";
import { getResponsiveDisplay } from "../../utils";

interface HeroBackgroundGridProps {
  language?: "ID" | "EN";
}

export default async function HeroBackgroundGrid({
  language = "EN",
}: HeroBackgroundGridProps) {
  // 3. Panggil fungsi API-nya di sini
  const movies = await getHeroGridMovies(language);

  // Fallback jika data kosong/error
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <>
      <div className="absolute contain-strict inset-0 z-0 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-7 p-2 xl:grid-cols-9 gap-2 opacity-30 pointer-events-none select-none">
        {movies.map((movie, index) => {
          const responsiveDisplay = getResponsiveDisplay(index);

          if (!movie.poster_path) {
            return null;
          }

          return (
            <div
              key={movie.id}
              className={`relative rounded-lg overflow-hidden bg-card ${responsiveDisplay}`}
            >
              <Image
                src={movie.poster_path}
                alt={`Poster ${movie.title}`}
                className="object-cover"
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
                fill
                quality={75}
                priority={index < 6}
              />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 z-1 bg-linear-to-t from-background/60 via-background/10 to-background/40 pointer-events-none" />
    </>
  );
}
