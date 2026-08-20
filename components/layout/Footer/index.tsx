import LanguageSwhitcer from "@/components/shared/language-switcher";

import FooterNav from "./FooterNav";
import FooterSocial from "./FooterSocial";
import FooterPolicy from "./FooterPolicy";

export default function Footer() {
  return (
    <footer className="pt-14 bg-navbar/90 mt-14">
      <div className="container divide-y divide-navbar-accent-2">
        {/* Footer top */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4  gap-8 pb-14 lg:pb-20">
          <FooterNav />
          <FooterSocial />
          <LanguageSwhitcer variant="full" />
        </div>

        {/* Policy */}
        <FooterPolicy />
      </div>
    </footer>
  );
}
