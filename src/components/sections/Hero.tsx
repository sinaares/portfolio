"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence, type Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { ArrowDown, ExternalLink, Brain, Code2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─── Data ────────────────────────────────────────────────────────────────── */
const ROLES = [
  "Machine Learning Engineer",
  "Full-Stack Developer",
  "Cybersecurity Researcher",
  "UI / UX Designer",
] as const;

const STATS = [
  { value: "4+",  label: "Languages spoken"   },
  { value: "10+", label: "Projects shipped"    },
  { value: "3+",  label: "Years of experience" },
] as const;

/* ─── Animation variants ──────────────────────────────────────────────────── */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show:   {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } },
};

/* ─── Decorative floating code card ──────────────────────────────────────── */
const CODE_SNIPPET = `model = NIDS(
  layers=[512, 256, 128],
  dropout=0.3,
  activation="relu",
)
acc = model.train(X_train)
# → 99.2% accuracy`;

function FloatingCodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: -20 }}
      animate={{ opacity: 1, x: 0,  y: 0  }}
      transition={{ delay: 1.1, duration: 0.8, ease: EASE_OUT }}
      className={cn(
        "hidden xl:block absolute right-8 top-1/2 -translate-y-1/2",
        "glass rounded-2xl p-5 w-72 border border-white/[0.07]",
        "shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70"   />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70"  />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70"/>
        <span className="ml-auto text-[10px] text-[#475569] font-mono">nids_model.py</span>
      </div>

      {/* code lines */}
      <pre className="font-mono text-[11px] leading-[1.7] text-[#94a3b8] overflow-hidden">
        {CODE_SNIPPET.split("\n").map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + i * 0.07, duration: 0.3 }}
          >
            {line.startsWith("#") ? (
              <span className="text-emerald-400/80">{line}</span>
            ) : line.includes("=") ? (
              <>
                <span className="text-indigo-300">{line.split("=")[0]}</span>
                <span className="text-[#94a3b8]">= </span>
                <span className="text-amber-300/90">{line.split("=").slice(1).join("=")}</span>
              </>
            ) : (
              line
            )}
          </motion.div>
        ))}
      </pre>

      {/* glow */}
      <div className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}

/* ─── Role tag cycler ─────────────────────────────────────────────────────── */
function RoleCycler() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % ROLES.length);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(advance, 2800);
    return () => clearInterval(id);
  }, [advance, reduced]);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom w-full sm:w-auto justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%",   opacity: 1 }}
          exit={{    y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="gradient-text absolute whitespace-nowrap"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Scroll cue ──────────────────────────────────────────────────────────── */
function ScrollCue() {
  return (
    <motion.div
      variants={fadeIn}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#475569]">
        scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="text-[#475569]"
      >
        <ArrowDown size={14} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-12"
    >
      {/* Radial spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Floating code card (decorative) */}
      <FloatingCodeCard />

      {/* Main content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={reduced ? "show" : "show"}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl xl:max-w-3xl"
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5",
            "border-emerald-500/20 bg-emerald-500/8 text-emerald-300 text-xs font-medium"
          )}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-bold tracking-tight text-[#f0f2ff] sm:text-6xl lg:text-7xl mb-4 leading-[1.1]"
        >
          Building{" "}
          <span className="gradient-text">Intelligent&nbsp;Systems</span>
          <br />
          &amp; Exceptional Interfaces
        </motion.h1>

        {/* Role cycler */}
        <motion.p
          variants={fadeUp}
          className="mt-4 flex flex-col sm:flex-row items-center gap-2 text-lg sm:text-xl text-[#94a3b8] font-light"
        >
          <span className="flex items-center gap-2">
            <Brain size={16} className="text-indigo-400 shrink-0" aria-hidden />
            <span>Seyedsina Seyedhashemi</span>
          </span>
          <span className="hidden sm:inline text-[#475569]">·</span>
          <RoleCycler />
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl text-sm sm:text-base leading-7 text-[#94a3b8]"
        >
          Computer Engineering student at{" "}
          <span className="text-[#f0f2ff] font-medium">DEU</span>, engineering the intersection
          of machine learning and modern web — from neural network architectures to
          pixel-perfect user experiences.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group inline-flex h-11 items-center gap-2.5 rounded-xl px-6",
              "bg-indigo-500 text-white text-sm font-semibold",
              "shadow-[0_0_28px_rgba(99,102,241,0.38)]",
              "transition-all duration-200",
              "hover:bg-indigo-400 hover:shadow-[0_0_36px_rgba(99,102,241,0.55)] hover:-translate-y-0.5",
              "active:translate-y-0"
            )}
          >
            {/* GitHub SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub
            <ExternalLink size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden />
          </a>

          <Link
            href="#projects"
            className={cn(
              "inline-flex h-11 items-center gap-2.5 rounded-xl px-6",
              "border border-white/10 bg-white/[0.04] text-[#f0f2ff] text-sm font-semibold",
              "transition-all duration-200",
              "hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5",
              "active:translate-y-0"
            )}
          >
            <Code2 size={15} className="text-[#94a3b8]" aria-hidden />
            See Projects
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          className="mt-14 flex items-center gap-6 sm:gap-10"
        >
          {STATS.map(({ value, label }, i) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-[#f0f2ff] tabular-nums">{value}</span>
              <span className="text-xs text-[#475569]">{label}</span>
              {i < STATS.length - 1 && (
                <span aria-hidden className="absolute" />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#475569]">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-[#475569]"
        >
          <ArrowDown size={14} aria-hidden />
        </motion.div>
      </motion.div>
    </section>
  );
}
