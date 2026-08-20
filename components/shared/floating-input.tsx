import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingInput = React.forwardRef<
  HTMLInputElement,
  FloatingInputProps
>(({ className, label, id, placeholder = " ", ...props }, ref) => {
  return (
    <div className="relative w-full">
      <Input
        id={id}
        ref={ref}
        placeholder={placeholder}
        className={cn(
          "peer h-14 w-full  border border-foreground/30 text-foreground pt-4 pb-1 px-4 rounded-xs text-base focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-transparent transition-all placeholder-transparent",
          className,
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 top-4 text-foreground/60 text-base transition-all duration-200 pointer-events-none origin-top-left",
          "peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-foreground/70",

          "peer-not-placeholder-shown:top-1.5  peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-foreground",
        )}
      >
        {label}
      </label>
    </div>
  );
});

FloatingInput.displayName = "FloatingInput";
