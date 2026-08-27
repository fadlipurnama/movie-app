import { cookies } from "next/headers";

export async function getTmdbAccessToken() {
  const cookieStore = await cookies();

  return cookieStore.get("tmdb_access_token")?.value;
}

export async function getTmdbAccount() {
  const accessToken = await getTmdbAccessToken();

  if (!accessToken) {
    return null;
  }

  const response = await fetch(
    "https://api.themoviedb.org/3/account",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}