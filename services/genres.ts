// import type { GenreResponse } from "@/types/movie";
import { tmdbFetch, getTmdbLanguage } from "@/lib/tmdb";
import { GenreResponse } from "@/types";

export async function getGenresMovie(
  language: "ID" | "EN" = "ID",
): Promise<GenreResponse["genres"]> {

  try {
    const tmdbLanguage = getTmdbLanguage(language);
    const data = await tmdbFetch<GenreResponse>(
      `/genre/movie/list?language=${tmdbLanguage}`,
      { next: { revalidate: 86400 } }, // Cache 24 jam
    );
    return data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

export async function getGenresTvShow(
  language: "ID" | "EN" = "ID",
): Promise<GenreResponse["genres"]> {

  try {
    const tmdbLanguage = getTmdbLanguage(language);
    const data = await tmdbFetch<GenreResponse>(
      `/genre/tv/list?language=${tmdbLanguage}`,
      { next: { revalidate: 86400 } }, // Cache 24 jam
    );
    return data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}
