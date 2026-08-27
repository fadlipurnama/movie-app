const TMDB_API_URL = "https://api.themoviedb.org";

export async function tmdbFetch<T>(
  endpoint: string,
  options?: RequestInit
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