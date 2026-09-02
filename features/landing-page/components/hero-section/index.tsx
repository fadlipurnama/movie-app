import Image from "next/image";
import HeroContent from "./hero-content";
import HeroBackgroundGrid from "./hero-background-grid";

export default function HeroSection() {
  return (
    <section>
      <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center z-0 bg-background text-center">
        <HeroBackgroundGrid />

        {/* Logo */}
        <div className="w-90 my-auto z-4">
          <Image
            src={"/assets/logo/play-logo.svg"}
            alt="Hero Logo"
            width={240}
            height={240}
            className="w-auto h-auto"
          />
        </div>
      </div>
      <HeroContent />
    </section>
  );
}
