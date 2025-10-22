"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Divider component
 * -------------------------------------------------
 * Flexible visual separator with theme & variant support
 */

const dividerVariants = cva("", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    size: {
      sm: "h-px",
      md: "h-[2px]",
      lg: "h-[3px]",
    },
    variant: {
      solid: "bg-[#E2E8F0]",
      dashed: "border-t border-dashed border-[#CBD5E1]",
      soft: "bg-[#F1F5F9]",
      gradient:
        "bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent",
    },
    theme: {
      base: "",
      pink: "via-[#FF89C2]/60",
      mint: "via-[#00C48C]/60",
      dark: "via-[#475569]/60",
    },
  },
  compoundVariants: [
    {
      variant: "gradient",
      theme: "pink",
      className: "bg-gradient-to-r from-transparent via-[#FF89C2]/50 to-transparent",
    },
    {
      variant: "gradient",
      theme: "mint",
      className: "bg-gradient-to-r from-transparent via-[#00C48C]/50 to-transparent",
    },
    {
      variant: "gradient",
      theme: "dark",
      className: "bg-gradient-to-r from-transparent via-[#475569]/50 to-transparent",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "gradient",
    size: "md",
    theme: "base",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

export const Divider: React.FC<DividerProps> = ({
  orientation,
  variant,
  size,
  theme,
  className,
  ...props
}) => {
  const baseClass =
    variant === "dashed"
      ? orientation === "horizontal"
        ? "border-t"
        : "border-l"
      : "";

  return (
    <div
      role="separator"
      className={cn(
        orientation === "horizontal"
          ? "my-6"
          : "mx-4 w-px h-auto self-stretch",
        dividerVariants({ orientation, variant, size, theme }),
        baseClass,
        className
      )}
      {...props}
    />
  );
};
