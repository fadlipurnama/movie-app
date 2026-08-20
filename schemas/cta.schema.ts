import * as z from "zod";

export const ctaFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type CtaFormValues = z.infer<typeof ctaFormSchema>;