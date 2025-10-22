"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Reusable Button component
 * Supports theme variants, sizes, and dark mode
 *
 * Variants: primary | secondary | outline | ghost | destructive
 * Themes:   base (blue) | pink | mint | dark
 * Hover effects: gentle lift, glow, and smooth transitions
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[.98]",
  {
    variants: {
      variant: {
        primary: cn(
          "text-white shadow-md bg-gradient-to-r from-[#0052FF] via-[#7AA5FF] to-[#FF89C2]",
          "hover:shadow-xl hover:-translate-y-[2px] hover:brightness-110"
        ),
        secondary: cn(
          "bg-white border border-[#C7D2FE] text-[#1E293B] shadow-sm",
          "hover:-translate-y-[1px] hover:shadow-md hover:bg-[#F8FAFC]"
        ),
        outline: cn(
          "border-2 border-[#E2E8F0] bg-transparent text-[#1E293B]",
          "hover:bg-[#F1F5F9] hover:-translate-y-[1px] hover:shadow-sm"
        ),
        ghost: cn(
          "bg-transparent text-[#1E293B]",
          "hover:bg-[#E2E8F0]/40 hover:-translate-y-[1px]"
        ),
        destructive: cn(
          "bg-[#FF5A5A] text-white shadow-md",
          "hover:bg-[#E54848] hover:shadow-lg hover:-translate-y-[2px]"
        ),
      },
      size: {
        sm: "px-3 py-1.5 text-sm rounded-xl",
        md: "px-5 py-3 text-base",
        lg: "px-6 py-3.5 text-lg rounded-2xl",
      },
      theme: {
        base: "", // default Base blue gradient
        pink: "from-[#FF89C2] via-[#FFABD6] to-[#FFD4E8]",
        mint: "from-[#00C48C] via-[#4FE8B8] to-[#92F5C7]",
        dark: "bg-[#1E293B] text-white hover:bg-[#0F172A] hover:shadow-lg hover:-translate-y-[2px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      theme: "base",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, theme, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, theme, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
