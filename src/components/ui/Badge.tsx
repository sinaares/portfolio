import { cn } from "@/lib/utils";

type Variant = "default" | "accent" | "success" | "warning" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-white/5 text-[#94a3b8] border-white/8",
  accent:  "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  warning: "bg-amber-500/10  text-amber-300  border-amber-500/20",
  info:    "bg-sky-500/10    text-sky-300    border-sky-500/20",
};

const dotStyles: Record<Variant, string> = {
  default: "bg-slate-400",
  accent:  "bg-indigo-400",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  info:    "bg-sky-400",
};

export function Badge({ children, variant = "default", className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "text-xs font-medium leading-none",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[variant])} />
      )}
      {children}
    </span>
  );
}
