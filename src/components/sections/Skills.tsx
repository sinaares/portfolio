"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Data ────────────────────────────────────────────────────────────────── */
const SKILL_GROUPS = [
  {
    category: "AI & Machine Learning",
    accent: "text-indigo-400",
    bar: "bg-indigo-500",
    border: "border-indigo-500/20",
    glow: "bg-indigo-500/8",
    skills: [
      { name: "Python",       pct: 95 },
      { name: "PyTorch",      pct: 85 },
      { name: "scikit-learn", pct: 88 },
      { name: "Pandas / NumPy", pct: 90 },
      { name: "Data Pipeline", pct: 80 },
    ],
  },
  {
    category: "Frontend",
    accent: "text-cyan-400",
    bar: "bg-cyan-500",
    border: "border-cyan-500/20",
    glow: "bg-cyan-500/8",
    skills: [
      { name: "React / Next.js", pct: 90 },
      { name: "TypeScript",      pct: 85 },
      { name: "Tailwind CSS",    pct: 92 },
      { name: "Framer Motion",   pct: 78 },
      { name: "Responsive UI",   pct: 88 },
    ],
  },
  {
    category: "Backend & DevOps",
    accent: "text-amber-400",
    bar: "bg-amber-500",
    border: "border-amber-500/20",
    glow: "bg-amber-500/8",
    skills: [
      { name: "FastAPI / Node.js", pct: 82 },
      { name: "PostgreSQL",        pct: 78 },
      { name: "Docker",            pct: 75 },
      { name: "Git / CI-CD",       pct: 88 },
      { name: "REST APIs",         pct: 90 },
    ],
  },
  {
    category: "Cybersecurity",
    accent: "text-violet-400",
    bar: "bg-violet-500",
    border: "border-violet-500/20",
    glow: "bg-violet-500/8",
    skills: [
      { name: "Network Analysis",   pct: 80 },
      { name: "Intrusion Detection", pct: 82 },
      { name: "Threat Modelling",   pct: 75 },
      { name: "Penetration Testing", pct: 70 },
      { name: "Security Auditing",  pct: 72 },
    ],
  },
] as const;

/* ─── Animation variants ──────────────────────────────────────────────────── */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(3px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

/* ─── Skill bar row ───────────────────────────────────────────────────────── */
function SkillBar({
  name,
  pct,
  bar,
  inView,
  delay,
}: {
  name: string;
  pct: number;
  bar: string;
  inView: boolean;
  delay: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#94a3b8]">{name}</span>
        <span className="text-xs tabular-nums text-[#475569]">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", bar)}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 0.8, delay, ease: EASE_OUT }}
        />
      </div>
    </div>
  );
}

/* ─── Skills ──────────────────────────────────────────────────────────────── */
export function Skills() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      aria-label="Skills"
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
        Expertise
      </motion.p>

      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="mb-14 max-w-xl"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-bold tracking-tight text-[#f0f2ff] sm:text-4xl leading-[1.15]"
        >
          Skills &amp;{" "}
          <span className="gradient-text">Proficiency</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-sm leading-6 text-[#94a3b8]">
          Technologies and tools I work with daily — rated honestly against real-world project experience.
        </motion.p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        {SKILL_GROUPS.map(({ category, accent, bar, border, glow, skills }) => (
          <motion.div
            key={category}
            variants={fadeUp}
            className={cn(
              "rounded-2xl border p-5 space-y-4",
              "transition-all duration-300 hover:-translate-y-1",
              "hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
              glow, border
            )}
          >
            {/* Category heading */}
            <p className={cn("text-xs font-semibold uppercase tracking-widest", accent)}>
              {category}
            </p>

            {/* Skill bars */}
            <div className="space-y-3">
              {skills.map((s, i) => (
                <SkillBar
                  key={s.name}
                  name={s.name}
                  pct={s.pct}
                  bar={bar}
                  inView={inView}
                  delay={0.2 + i * 0.07}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 bottom-0 h-80 w-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </section>
  );
}
