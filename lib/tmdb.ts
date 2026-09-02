const TMDB_API_URL = "https://api.themoviedb.org/3";

export const TMDB_LANGUAGE_MAP = {
  ID: "id-ID",
  EN: "en-US",
} as const;

export type LanguageCode = keyof typeof TMDB_LANGUAGE_MAP;

/**
 * Helper untuk normalisasi query param language ke format TMDB
 */
export function getTmdbLanguage(langParam: string | null): string {
  const lang = (langParam?.toUpperCase() || "ID") as LanguageCode;
  return TMDB_LANGUAGE_MAP[lang] || TMDB_LANGUAGE_MAP.ID;
}

export async function tmdbFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${TMDB_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDb API error: ${response.status}`);
  }

  return response.json();
}
