import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
// 1. Daftarkan semua key FAQ yang ada di messages JSON
const FAQ_KEYS = [
  "WhatIsIt",
  "Cost",
  "Content",
  "WhereToWatch",
  "SignUp",
  "FreeTrial",
  "Support",
  "Payment",
] as const;

export function FaqAccordion() {
  const t = useTranslations("LandingPage.FAQ");

  return (
    <Accordion
      defaultValue={[t(`${FAQ_KEYS[0]}.question`)]}
      className="block columns-1 md:columns-2 gap-10 pb-4"
    >
      {FAQ_KEYS.map((key, index) => {
        const question = t(`${key}.question`);
        const answer = t(`${key}.answer`);
        const formattedIndex = String(index + 1).padStart(2, "0");
        return (
          <AccordionItem
            aria-label={`${question} ${answer}`}
            className={
              "inline-block border-none w-full relative py-4 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[0.7px] after:bg-linear-to-r after:from-transparent after:via-red-45 after:to-transparent"
            }
            key={key}
            value={question}
          >
            <AccordionTrigger className={" hover:no-underline! "}>
              <div className="flex items-center gap-4 flex-1 text-left min-w-0 pr-4">
                <span className="size-12 shrink-0 bg-box flex items-center justify-center ring ring-black-15 rounded-md font-semibold">
                  {formattedIndex}
                </span>
                <p className="font-medium leading-snug warp-words">
                  {question}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className={"pl-16 pr-4 "}>
              <p>{answer}</p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
