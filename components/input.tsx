"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full rounded-xl border px-4 py-3 text-[#0F172A] placeholder-[#94A3B8] shadow-sm transition focus:outline-none focus:ring-4 focus:ring-[#C7D2FE]",
  {
    variants: {
      variant: {
        default: "border-[#E2E8F0] bg-white",
        soft: "border-transparent bg-[#F8FAFC] focus:border-[#C7D2FE]",
        underline:
          "rounded-none border-0 border-b-2 border-[#E2E8F0] bg-transparent focus:border-[#0052FF] shadow-none",
        glass:
          "bg-white/40 backdrop-blur-md border border-white/50 shadow-inner focus:ring-[#A5B4FC]",
        dark:
          "bg-[#1E293B] text-white placeholder-[#CBD5E1] border-[#334155] focus:ring-[#475569]",
      },
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
      },
      theme: {
        base: "",
        pink: "focus:ring-[#FF89C2]",
        mint: "focus:ring-[#00C48C]",
        dark: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      theme: "base",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, theme, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ variant, size, theme, className }))}
      {...props}
    />
  )
);
Input.displayName = "Input";
