import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Section({ id, children, className, as: Tag = "section" }: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32",
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-16 max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-[#f0f2ff] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-7 text-[#94a3b8]">{subtitle}</p>
      )}
    </div>
  );
}
