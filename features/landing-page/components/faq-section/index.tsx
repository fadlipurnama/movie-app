import Title from "@/components/ui/title";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "./faq-accordion";

export default function FaqSection() {
  return (
    <section className="container mb-32">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-4 mb-5 lg:mb-9">
        <Title
          title="Frequently Asked Questions"
          text={`Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.`}
        />
        <Button className={'max-w-min'} size={"lg"}>Ask a Question</Button>
      </div>

      {/* warpper */}
      <div className="mt-10 md:mt-12 lg:mt-2">
        <FaqAccordion />
      </div>
    </section>
  );
}
