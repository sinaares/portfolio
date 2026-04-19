"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Mail, MapPin, ExternalLink, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── SVG brand icons ─────────────────────────────────────────────────────── */
function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28, filter: "blur(3px)" },
  show: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/* ─── Contact card ────────────────────────────────────────────────────────── */
function ContactCard({
  icon,
  label,
  value,
  href,
  accent,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string | null;
  accent: string;
  bg: string;
}) {
  const inner = (
    <>
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5", accent)}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-[#475569]">{label}</p>
        <p className="text-sm font-medium text-[#f0f2ff] truncate">{value}</p>
      </div>
      {href && (
        <ExternalLink size={13} className="ml-auto shrink-0 opacity-30 group-hover:opacity-70 transition-opacity" aria-hidden />
      )}
    </>
  );

  const base = cn(
    "flex items-center gap-4 rounded-2xl border p-4",
    "transition-all duration-300",
    bg
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(base, "group hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]")}
    >
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}

/* ─── Contact ─────────────────────────────────────────────────────────────── */
export function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body    = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:maghazada89@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact"
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
        Get in touch
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

        {/* Left — info */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-8"
        >
          <motion.h2
            variants={fadeLeft}
            className="text-3xl font-bold tracking-tight text-[#f0f2ff] sm:text-4xl leading-[1.15]"
          >
            Let&apos;s{" "}
            <span className="gradient-text">work together</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-sm leading-7 text-[#94a3b8] max-w-md">
            I&apos;m open to internships, freelance projects, and full-time opportunities.
            Whether you have a project in mind or just want to say hello — my inbox is always open.
          </motion.p>

          <motion.div variants={container} className="flex flex-col gap-3">
            <motion.div variants={fadeUp}>
              <ContactCard
                icon={<Mail size={18} />}
                label="Email"
                value="maghazada89@gmail.com"
                href="mailto:maghazada89@gmail.com"
                accent="text-indigo-400"
                bg="bg-indigo-500/8 border-indigo-500/15"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ContactCard
                icon={<GitHubIcon />}
                label="GitHub"
                value="github.com/sinaares"
                href="https://github.com/sinaares"
                accent="text-emerald-400"
                bg="bg-emerald-500/8 border-emerald-500/15"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ContactCard
                icon={<LinkedInIcon />}
                label="LinkedIn"
                value="seyedsina-seyedhashemi"
                href="https://www.linkedin.com/in/seyedsina-seyedhashemi-07372b289/"
                accent="text-sky-400"
                bg="bg-sky-500/8 border-sky-500/15"
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ContactCard
                icon={<MapPin size={18} />}
                label="Location"
                value="Izmir, Turkey"
                href={null}
                accent="text-amber-400"
                bg="bg-amber-500/8 border-amber-500/15"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 sm:p-8 space-y-5"
          >
            <p className="text-sm font-semibold text-[#f0f2ff]">Send a message</p>

            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-xs text-[#475569] uppercase tracking-widest">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                className={cn(
                  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04]",
                  "px-4 py-2.5 text-sm text-[#f0f2ff] placeholder:text-[#475569]",
                  "outline-none transition-colors duration-150",
                  "focus:border-indigo-500/50 focus:bg-white/[0.06]"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-xs text-[#475569] uppercase tracking-widest">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                className={cn(
                  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04]",
                  "px-4 py-2.5 text-sm text-[#f0f2ff] placeholder:text-[#475569]",
                  "outline-none transition-colors duration-150",
                  "focus:border-indigo-500/50 focus:bg-white/[0.06]"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs text-[#475569] uppercase tracking-widest">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                className={cn(
                  "w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04]",
                  "px-4 py-2.5 text-sm text-[#f0f2ff] placeholder:text-[#475569]",
                  "outline-none transition-colors duration-150",
                  "focus:border-indigo-500/50 focus:bg-white/[0.06]"
                )}
              />
            </div>

            <button
              type="submit"
              className={cn(
                "group w-full inline-flex h-11 items-center justify-center gap-2.5 rounded-xl",
                "bg-indigo-500 text-white text-sm font-semibold",
                "shadow-[0_0_28px_rgba(99,102,241,0.38)]",
                "transition-all duration-200",
                "hover:bg-indigo-400 hover:shadow-[0_0_36px_rgba(99,102,241,0.55)] hover:-translate-y-0.5",
                "active:translate-y-0"
              )}
            >
              {sent ? "Opening your email client…" : (
                <>
                  <Send size={14} aria-hidden />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </motion.div>
      </div>

      {/* Decorative orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </section>
  );
}
