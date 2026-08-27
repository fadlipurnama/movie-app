import { NextRequest, NextResponse } from "next/server";

const TMDB_API_URL = process.env.TMDB_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const username = body.username;
    const password = body.password;

    if (
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json(
        {
          message: "Username dan password wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    if (!username.trim() || !password.trim()) {
      return NextResponse.json(
        {
          message: "Username dan password wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const tmdbToken = process.env.TMDB_API_TOKEN;

    if (!tmdbToken) {
      console.error(
        "TMDB_API_TOKEN belum dikonfigurasi."
      );

      return NextResponse.json(
        {
          message:
            "Konfigurasi TMDb API belum tersedia.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * STEP 1
     * Membuat request token
     */
    const requestTokenResponse = await fetch(
      `${TMDB_API_URL}/authentication/token/new`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tmdbToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const requestTokenData =
      await requestTokenResponse.json();

    if (
      !requestTokenResponse.ok ||
      !requestTokenData.success
    ) {
      console.error(
        "TMDb request token error:",
        requestTokenData
      );

      return NextResponse.json(
        {
          message:
            requestTokenData.status_message ||
            "Gagal membuat request token TMDb.",
        },
        {
          status: 500,
        }
      );
    }

    const requestToken =
      requestTokenData.request_token;

    /*
     * STEP 2
     * Validasi request token menggunakan
     * username dan password TMDb
     */
    const validateResponse = await fetch(
      `${TMDB_API_URL}/authentication/token/validate_with_login`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tmdbToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          request_token: requestToken,
        }),
        cache: "no-store",
      }
    );

    const validateData =
      await validateResponse.json();

    if (
      !validateResponse.ok ||
      !validateData.success
    ) {
      console.error(
        "TMDb validation error:",
        validateData
      );

      return NextResponse.json(
        {
          message:
            validateData.status_message ||
            "Username atau password TMDb salah.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * STEP 3
     * Membuat session ID
     */
    const sessionResponse = await fetch(
      `${TMDB_API_URL}/authentication/session/new`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tmdbToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: requestToken,
        }),
        cache: "no-store",
      }
    );

    const sessionData =
      await sessionResponse.json();

    if (
      !sessionResponse.ok ||
      !sessionData.success ||
      !sessionData.session_id
    ) {
      console.error(
        "TMDb session error:",
        sessionData
      );

      return NextResponse.json(
        {
          message:
            sessionData.status_message ||
            "Gagal membuat session TMDb.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * STEP 4
     * Simpan session ID di HttpOnly Cookie
     */
    const response = NextResponse.json({
      success: true,
      message: "Login berhasil.",
    });

    response.cookies.set({
      name: "tmdb_session_id",
      value: sessionData.session_id,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error(
      "Login API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
      }
    );
  }
}