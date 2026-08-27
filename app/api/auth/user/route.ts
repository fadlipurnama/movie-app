import { NextRequest, NextResponse } from "next/server";

const TMDB_API_URL = "https://api.themoviedb.org/3";

export async function GET(request: NextRequest) {
  try {
    const sessionId =
      request.cookies.get("tmdb_session_id")?.value;

    if (!sessionId) {
      return NextResponse.json(
        {
          authenticated: false,
          message: "User belum login.",
        },
        {
          status: 401,
        }
      );
    }

    const tmdbToken = process.env.TMDB_API_TOKEN;

    if (!tmdbToken) {
      return NextResponse.json(
        {
          message: "TMDB_API_TOKEN belum tersedia.",
        },
        {
          status: 500,
        }
      );
    }

    const response = await fetch(
      `${TMDB_API_URL}/account?session_id=${encodeURIComponent(
        sessionId
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tmdbToken}`,
          accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("TMDb account error:", data);

      return NextResponse.json(
        {
          authenticated: false,
          message:
            data.status_message ||
            "Gagal mengambil data akun TMDb.",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: data,
    });
  } catch (error) {
    console.error("GET /api/auth/user error:", error);

    return NextResponse.json(
      {
        authenticated: false,
        message: "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
      }
    );
  }
}