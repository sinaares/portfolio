"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { Brain, Zap, Globe, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Data ────────────────────────────────────────────────────────────────── */
const LANGUAGES = [
  { name: "English",     level: "Fluent",     flag: "🇬🇧" },
  { name: "Turkish",     level: "Fluent",     flag: "🇹🇷" },
  { name: "Persian",     level: "Native",     flag: "🇮🇷" },
  { name: "Azerbaijani", level: "Fluent",     flag: "🇦🇿" },
] as const;

const FOCUS_AREAS = [
  {
    icon: Brain,
    title: "Intelligent Systems",
    body: "Designing and training ML models — from classical algorithms to deep neural architectures — with a focus on real-world deployment and performance.",
    accent: "text-indigo-400",
    bg: "bg-indigo-500/8 border-indigo-500/15",
  },
  {
    icon: Zap,
    title: "Automation & DevOps",
    body: "Building automated pipelines, CI/CD workflows, and data ingestion systems that reduce friction and scale gracefully.",
    accent: "text-amber-400",
    bg: "bg-amber-500/8 border-amber-500/15",
  },
  {
    icon: Layers,
    title: "Full-Stack Engineering",
    body: "Crafting end-to-end web applications with modern React ecosystems — performant, accessible, and delightful to use.",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/8 border-emerald-500/15",
  },
  {
    icon: Globe,
    title: "Cybersecurity",
    body: "Researching network intrusion detection, threat modelling, and applying security-first thinking across every layer of the stack.",
    accent: "text-violet-400",
    bg: "bg-violet-500/8 border-violet-500/15",
  },
] as const;

const TECH_STACK = [
  {
    category: "AI / ML",
    color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/20",
    dot: "bg-indigo-400",
    items: ["Python", "PyTorch", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    category: "Frontend",
    color: "from-cyan-500/20 to-sky-500/20 border-cyan-500/20",
    dot: "bg-cyan-400",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Design",
    color: "from-rose-500/20 to-pink-500/20 border-rose-500/20",
    dot: "bg-rose-400",
    items: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
  },
  {
    category: "Backend & Tools",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/20",
    dot: "bg-amber-400",
    items: ["Node.js", "FastAPI", "Docker", "Git", "PostgreSQL"],
  },
] as const;

/* ─── Animation variants ──────────────────────────────────────────────────── */
const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(3px)" },
  show:   {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const revealLeft: Variants = {
  hidden: { opacity: 0, x: -28, filter: "blur(3px)" },
  show:   {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/* ─── Sub-components ──────────────────────────────────────────────────────── */
function FocusCard({
  icon: Icon,
  title,
  body,
  accent,
  bg,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  accent: string;
  bg: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={revealItem}
      custom={delay}
      className={cn(
        "group rounded-2xl border p-5 transition-all duration-300",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1",
        bg
      )}
    >
      <div className={cn("mb-3 inline-flex rounded-xl p-2.5", "bg-white/5")}>
        <Icon size={18} className={accent} aria-hidden />
      </div>
      <h3 className="mb-1.5 text-sm font-semibold text-[#f0f2ff]">{title}</h3>
      <p className="text-xs leading-5 text-[#94a3b8]">{body}</p>
    </motion.div>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-lg px-2.5 py-1",
      "bg-white/5 border border-white/8 text-xs text-[#94a3b8]",
      "transition-colors duration-150 hover:bg-white/8 hover:text-[#f0f2ff] cursor-default"
    )}>
      {label}
    </span>
  );
}

/* ─── About ───────────────────────────────────────────────────────────────── */
export function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const bioRef      = useRef<HTMLDivElement>(null);
  const stackRef    = useRef<HTMLDivElement>(null);

  const bioInView   = useInView(bioRef,   { once: true, margin: "-80px" });
  const stackInView = useInView(stackRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About"
      className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-28 md:py-36"
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400"
      >
        About me
      </motion.p>

      {/* ── Top: Bio + Focus grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 mb-20">
        {/* Left — bio */}
        <motion.div
          ref={bioRef}
          variants={revealContainer}
          initial="hidden"
          animate={bioInView ? "show" : "hidden"}
          className="flex flex-col gap-6"
        >
          <motion.h2
            variants={revealLeft}
            className="text-3xl font-bold tracking-tight text-[#f0f2ff] sm:text-4xl leading-[1.15]"
          >
            Engineering systems that{" "}
            <span className="gradient-text">think</span> and interfaces that{" "}
            <span className="gradient-text">resonate</span>.
          </motion.h2>

          <motion.div variants={revealItem} className="space-y-4 text-sm leading-7 text-[#94a3b8]">
            <p>
              I&apos;m{" "}
              <span className="text-[#f0f2ff] font-medium">Seyedsina Seyedhashemi</span>, a
              Computer Engineering student at{" "}
              <span className="text-[#f0f2ff] font-medium">
                Dokuz Eylül University (DEU)
              </span>{" "}
              in Izmir, Turkey. My work sits at the crossroads of artificial intelligence and
              modern web engineering.
            </p>
            <p>
              I specialise in building <span className="text-[#f0f2ff] font-medium">
                intelligent, automated systems
              </span>{" "}
              — training ML models that solve real problems, then wrapping them in fast,
              intuitive interfaces. I believe the best software is invisible: it just works,
              feels right, and stays out of your way.
            </p>
            <p>
              Outside of engineering, I bring a multilingual perspective to collaboration,
              communicating fluidly across cultures and teams.
            </p>
          </motion.div>

          {/* Languages */}
          <motion.div variants={revealItem}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#475569]">
              Languages
            </p>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(({ name, level, flag }) => (
                <span
                  key={name}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5",
                    "border-white/10 bg-white/[0.04] text-xs text-[#94a3b8]"
                  )}
                >
                  <span className="text-sm leading-none" aria-hidden>{flag}</span>
                  <span className="text-[#f0f2ff] font-medium">{name}</span>
                  <span className="text-[#475569]">· {level}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — focus area cards */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate={bioInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start"
        >
          {FOCUS_AREAS.map((area, i) => (
            <FocusCard key={area.title} {...area} delay={i * 0.08} />
          ))}
        </motion.div>
      </div>

      {/* ── Bottom: Tech stack ────────────────────────────────────────────── */}
      <motion.div
        ref={stackRef}
        variants={revealContainer}
        initial="hidden"
        animate={stackInView ? "show" : "hidden"}
      >
        <motion.div variants={revealItem} className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#475569] mb-1">
            Core tech stack
          </p>
          <div className="h-px w-full bg-gradient-to-r from-indigo-500/30 via-white/5 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_STACK.map(({ category, color, dot, items }) => (
            <motion.div
              key={category}
              variants={revealItem}
              className={cn(
                "rounded-2xl border bg-gradient-to-br p-4",
                color
              )}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={cn("h-1.5 w-1.5 rounded-full", dot)} aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#f0f2ff]">
                  {category}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <TechBadge key={item} label={item} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative side rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/4 h-1/2 w-px"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.3), transparent)",
        }}
      />
    </section>
  );
}
