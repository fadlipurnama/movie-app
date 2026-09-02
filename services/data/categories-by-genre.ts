// features/landing-page/services/poster/category-poster.ts
import { getGenresMovie, getGenresTvShow } from "@/services/genres";
import { getMoviesByGenre } from "@/services/movies";
import { getTvShowByGenre } from "@/services/tv";

export interface MovieGenrePosterType {
  id: number;
  name: string;
  posters: string[];
  type?: string;
}

export async function getMoviePosterByGenre(
  language: "ID" | "EN" = "ID",
): Promise<MovieGenrePosterType[]> {
  try {
    const genres = await getGenresMovie(language);
    const selectedGenres = genres.slice(0, 10);

    const categoryPosters = await Promise.all(
      selectedGenres.map(async (genre) => {
        const movies = await getMoviesByGenre(genre.id, 4, language);

        const posters = movies
          .map((m) =>
            m.poster_path
              ? `https://image.tmdb.org/t/p/w185${m.poster_path}`
              : null,
          )
          .filter((poster): poster is string => Boolean(poster));

        return {
          id: genre.id,
          name: genre.name,
          posters,
          type: 'Movie',
        };
      }),
    );

    // Hanya kembalikan kategori yang punya minimal 4 poster
    return categoryPosters.filter((cat) => cat.posters.length > 0);
  } catch (error) {
    console.error("Error fetching category posters:", error);
    return [];
  }
}



export async function getTvPosterByGenre(
  language: "ID" | "EN" = "ID",
): Promise<MovieGenrePosterType[]> {
  try {
    const genres = await getGenresTvShow(language);
    const selectedGenres = genres.slice(0, 10);

    const categoryPosters = await Promise.all(
      selectedGenres.map(async (genre) => {
        const tvShows = await getTvShowByGenre(genre.id, 4, language);

        const posters = tvShows
          .map((m) =>
            m.poster_path
              ? `https://image.tmdb.org/t/p/w185${m.poster_path}`
              : null,
          )
          .filter((poster): poster is string => Boolean(poster));

        return {
          id: genre.id,
          name: genre.name,
          posters,
          type: 'TV Show',
        };
      }),
    );

   
    return categoryPosters.filter((cat) => cat.posters.length > 0);
  } catch (error) {
    console.error("Error fetching category posters:", error);
    return [];
  }
}
