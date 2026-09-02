import LoginSection from "@/features/auth/components/login-section";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("tmdb_session_id")?.value;

  // Jika session ditemukan, redirect otomatis ke profile
if (sessionId) {
    redirect("/"); // Langsung jalan tanpa error TypeScript!
  }
  return (
    <>
      <LoginSection />
    </>
  );
}
