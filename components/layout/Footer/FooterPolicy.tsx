import Link from "next/link";
import { useTranslations } from "next-intl";
import { FOOTER_POLICY_CONFIG } from "../constants/footer.config";

export default function FooterPolicy() {
  const t = useTranslations("Layout.Footer");

  return (
    <div className="flex flex-wrap-reverse justify-between items-center gap-2 my-5 space-y-3 text-sm">
      <p>
        &copy; {new Date().getFullYear()} OkPlay.MOVIE, {t("copyright")}
      </p>

      <div className="divide-x divide-grey-65 space-x-2">
        {FOOTER_POLICY_CONFIG.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="inline-block pr-2 hover:underline text-foreground"
          >
            {t(`policy.${item.titleKey}`)}
          </Link>
        ))}
      </div>
    </div>
  );
}
