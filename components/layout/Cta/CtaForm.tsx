"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/shared/floating-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ctaFormSchema, CtaFormValues } from "@/schemas/cta.schema";

export function CtaForm() {
  // Ubah namespace ke Layout.CTA
  const t = useTranslations("Layout.CTA");

  const form = useForm<CtaFormValues>({
    resolver: zodResolver(ctaFormSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: CtaFormValues) {
    console.log("Email submitted:", values.email);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 w-full max-w-4xl"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full space-y-1 text-left">
              <FormControl>
                <FloatingInput
                  id="cta-email"
                  type="email"
                  label={t("emailLabel")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-14 text-xl hover:bg-red-70 shrink-0 w-full sm:w-auto flex items-center justify-center gap-1 transition-colors"
        >
          {t("buttonText")}
          <ChevronRight className="size-6" />
        </Button>
      </form>
    </Form>
  );
}
