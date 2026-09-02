// landing-page/api/get-hero-grid.ts
import { getPopularMovies } from "@/services/movies";

export interface CleanPosterMovie {
  id: number;
  title: string;
  poster_path: string;
}

export async function getHeroGridMovies(
  language: "ID" | "EN" = "ID"
): Promise<CleanPosterMovie[]> {
  try {
    // 1. Fetch page 1 & page 2 via global service secara paralel
    const [data1, data2] = await Promise.all([
      getPopularMovies(1, language),
      getPopularMovies(2, language),
    ]);

    const rawMovies = [...(data1.results || []), ...(data2.results || [])];

    const uniqueMovies = Array.from(
      new Map(rawMovies.map((movie) => [movie.id, movie])).values()
    );

    return uniqueMovies
      .filter((movie): movie is typeof movie & { poster_path: string } =>
        Boolean(movie.poster_path)
      )
      .slice(0, 36)
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : "",
      }));
  } catch (error) {
    console.error("Error fetching hero grid movies:", error);
    return [];
  }
}