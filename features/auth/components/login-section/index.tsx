import { useTranslations } from "next-intl";
import LoginForm from "./login-form";

export default function LoginSection() {
  const t = useTranslations("Auth.Login");
  return (
    <section
      className="relative min-h-svh   
      before:pointer-events-none before:absolute before:-z-10 before:inset-0 before:h-svh before:bg-linear-to-b before:from-grey-60/25 before:via-grey-65/15 before:to-white/60
      
      dark:before:from-red-600/35 dark:before:via-red-950/20 dark:before:to-black/60"
    >
      <div className="max-w-md mx-auto pt-40 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

        <LoginForm />

        <p className="mt-4 text-center font-light text-foreground dark:text-grey-20">
          {t("noAccount")}
          {"  "}
          <span className="text-red-600 hover:underline">
            <a
              href="https://www.themoviedb.org/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("registerLink")}
            </a>
          </span>
        </p>
      </div>
    </section>
  );
}
