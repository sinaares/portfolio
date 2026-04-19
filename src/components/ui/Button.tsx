"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-indigo-500 text-white shadow-[0_0_24px_rgba(99,102,241,0.35)] hover:bg-indigo-400 hover:shadow-[0_0_32px_rgba(99,102,241,0.5)] active:bg-indigo-600",
  secondary:
    "bg-[#161922] text-[#f0f2ff] border border-white/10 hover:bg-[#1c2030] hover:border-white/20",
  ghost:
    "bg-transparent text-[#94a3b8] hover:bg-white/5 hover:text-[#f0f2ff]",
  outline:
    "bg-transparent text-indigo-400 border border-indigo-500/40 hover:bg-indigo-500/10 hover:border-indigo-500/70",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8  px-3.5 text-xs  gap-1.5 rounded-lg",
  md: "h-10 px-5   text-sm  gap-2   rounded-xl",
  lg: "h-12 px-7   text-base gap-2.5 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      loading = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
        whileHover={{ y: isDisabled ? 0 : -1 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "relative inline-flex items-center justify-center font-medium",
          "transition-all duration-200 ease-out select-none",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={isDisabled}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          </span>
        )}
        <span className={cn("inline-flex items-center gap-inherit", loading && "invisible")}>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
