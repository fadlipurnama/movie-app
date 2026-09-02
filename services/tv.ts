import { getTmdbLanguage, tmdbFetch } from "@/lib/tmdb";
import type { MovieResponse } from "@/types/movie";

export async function getPopularTvShows(
  page: number = 1,
  language: "ID" | "EN" = "ID",
): Promise<MovieResponse> {
  try {
    const tmdbLanguage = getTmdbLanguage(language);

    return await tmdbFetch<MovieResponse>(
      `/tv/popular?language=${tmdbLanguage}&page=${page}`,
      { next: { revalidate: 3600 } },
    );
  } catch (error) {
    console.error(`Error fetching popular movies page ${page}:`, error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}

export async function getTvShowByGenre(
  genreId: number,
  limit: number = 4,
  language: "ID" | "EN" = "ID",
) {
  try {
    const response = await tmdbFetch<MovieResponse>(
      `/discover/tv?with_genres=${genreId}&language=${language}&sort_by=popularity.desc`,
      { next: { revalidate: 86400 } },
    );

    const data = response as MovieResponse;
    return (data.results || []).filter((m) => m.poster_path).slice(0, limit);
  } catch (error) {
    console.error(`Error fetching TV shows for genre ${genreId}:`, error);
    return [];
  }
}
