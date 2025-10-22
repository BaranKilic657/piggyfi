"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fieldVariants = cva("space-y-2", {
  variants: {
    variant: {
      default: "",
      soft: "bg-[#F8FAFC] rounded-xl p-3",
      minimal: "space-y-1",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {
  label: string;
  hint?: string;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ label, hint, variant, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(fieldVariants({ variant, className }))} {...props}>
        <label className="block text-sm font-semibold text-[#0F172A]">{label}</label>
        {children}
        {hint && <p className="text-xs text-[#64748B]">{hint}</p>}
      </div>
    );
  }
);
Field.displayName = "Field";
