"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pill (Badge/Tag) component
 * --------------------------
 * Supports multiple variants and tones for a unified design system.
 */

const pillVariants = cva(
  "inline-flex items-center gap-2 rounded-full border font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        solid: "text-white shadow-sm",
        soft: "bg-opacity-20 border-transparent",
        outline: "bg-transparent border",
        glass:
          "bg-white/30 backdrop-blur-md border-white/40 shadow-inner text-[#0F172A]",
      },
      tone: {
        success: "bg-[#00C48C] border-[#00C48C] text-white",
        error: "bg-[#FF5A5A] border-[#FF5A5A] text-white",
        warning: "bg-[#FACC15] border-[#FACC15] text-[#1E293B]",
        info: "bg-[#3B82F6] border-[#3B82F6] text-white",
        neutral: "bg-[#EEF2FF] border-[#C7D2FE] text-[#1E293B]",
      },
      theme: {
        base: "",
        pink: "bg-[#FF89C2] border-[#FF89C2] text-white",
        mint: "bg-[#00C48C] border-[#00C48C] text-white",
        dark: "bg-[#1E293B] border-[#1E293B] text-white",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
    },
    compoundVariants: [
      {
        variant: "soft",
        tone: "success",
        className: "bg-[#00C48C]/10 text-[#006C4E]",
      },
      {
        variant: "soft",
        tone: "error",
        className: "bg-[#FF5A5A]/10 text-[#8F1D1D]",
      },
      {
        variant: "soft",
        tone: "neutral",
        className: "bg-[#EEF2FF] text-[#1E293B]",
      },
    ],
    defaultVariants: {
      variant: "soft",
      tone: "neutral",
      size: "md",
      theme: "base",
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  icon?: React.ReactNode;
}

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ className, variant, tone, size, theme, icon, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(pillVariants({ variant, tone, size, theme, className }))}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
);
Pill.displayName = "Pill";
