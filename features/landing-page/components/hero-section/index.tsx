import Image from "next/image";
import HeroContent from "./hero-content";
import HeroBackgroundGrid from "./hero-background-grid";

export default function HeroSection() {
  return (
    <section>
      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center z-0 bg-background text-center">
        <HeroBackgroundGrid />

        {/* Logo */}
        <div className="aspect my-auto z-2">
          <Image
            src={"/assets/logo/play-logo.svg"}
            alt="Hero Logo"
            width={360}
            height={360}
          />
        </div>
      </div>
      <HeroContent />
    </section>
  );
}
