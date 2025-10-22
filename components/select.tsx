"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const selectVariants = cva(
  "w-full rounded-xl border px-4 py-3 shadow-sm transition focus:outline-none focus:ring-4",
  {
    variants: {
      variant: {
        default: "border-[#E2E8F0] bg-white text-[#0F172A]",
        soft: "border-transparent bg-[#F8FAFC]",
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

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, theme, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(selectVariants({ variant, theme, className }))}
      {...props}
    />
  )
);
Select.displayName = "Select";
