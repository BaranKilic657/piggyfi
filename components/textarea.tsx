"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "w-full rounded-xl border px-4 py-3 text-[#0F172A] placeholder-[#94A3B8] shadow-sm transition focus:outline-none focus:ring-4",
  {
    variants: {
      variant: {
        default: "border-[#E2E8F0] bg-white",
        soft: "border-transparent bg-[#F8FAFC]",
        underline: "rounded-none border-0 border-b-2 bg-transparent",
        glass: "bg-white/40 backdrop-blur-md border border-white/50 shadow-inner",
        dark: "bg-[#1E293B] text-white border-[#334155]",
      },
      theme: {
        base: "focus:ring-[#C7D2FE]",
        pink: "focus:ring-[#FF89C2]",
        mint: "focus:ring-[#00C48C]",
        dark: "focus:ring-[#475569]",
      },
    },
    defaultVariants: { variant: "default", theme: "base" },
  }
);

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, theme, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("min-h-[96px]", textareaVariants({ variant, theme, className }))}
      {...props}
    />
  )
);
TextArea.displayName = "TextArea";
