"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FloatingInput } from "@/components/shared/floating-input";
import z from "zod";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

// 1. Skema Validasi Zod
function useLoginFormSchema() {
  const t = useTranslations("Auth.Login.errors");

  return z.object({
    username: z.string().min(1, { message: t("usernameRequired") }),
    password: z.string().min(1, { message: t("passwordRequired") }),
  });
}

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loginFormSchema = useLoginFormSchema();
  const t = useTranslations("Auth.Login");

  // 2. Inisialisasi React Hook Form
  const form = useForm<z.infer<ReturnType<typeof useLoginFormSchema>>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 3. Logika Fetch disatukan ke fungsi onSubmit
  async function onSubmit(
    values: z.infer<ReturnType<typeof useLoginFormSchema>>,
  ) {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("errors.defaultError"));
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errors.generalError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Field Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full space-y-1 text-left">
                <FormControl>
                  <FloatingInput
                    id="username"
                    type="text"
                    label={t("usernameLabel")}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Field Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full space-y-1 text-left">
                <FormControl>
                  <FloatingInput
                    id="password"
                    type="password"
                    label={t("passwordLabel")}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button Submit */}
          <Button
            size={"lg"}
            type="submit"
            disabled={loading}
            className="w-full text-lg transition-colors disabled:opacity-50"
          >
            {loading ? t("buttonLoading") : t("button")}
          </Button>
        </form>
      </Form>
    </>
  );
}
