"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled,   setScrolled]     = useState(false);
  const [activeLink, setActiveLink]   = useState<string | null>(null);
  const { scrollY } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-strong border-b border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:px-12"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="#hero"
            onClick={() => handleNavClick("#hero")}
            className="group flex items-center gap-2 outline-none"
            aria-label="Go to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors duration-200">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 12L7 2L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 8.5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight text-[#f0f2ff]">
              Sina<span className="text-indigo-400">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <NavLink
                  href={href}
                  active={activeLink === href}
                  onClick={() => handleNavClick(href)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-xl border border-indigo-500/40",
                "bg-indigo-500/8 px-4 text-xs font-semibold text-indigo-300",
                "transition-all duration-200 hover:bg-indigo-500/15 hover:border-indigo-500/60",
                "hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
              )}
            >
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              "md:hidden flex h-9 w-9 items-center justify-center rounded-lg",
              "text-[#94a3b8] hover:text-[#f0f2ff] hover:bg-white/5",
              "transition-colors duration-150 outline-none"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 z-50 h-full w-72 glass-strong border-l border-white/[0.07] flex flex-col md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex h-16 items-center justify-between px-5 border-b border-white/[0.06]">
                <span className="text-sm font-semibold text-[#f0f2ff]">
                  Sina<span className="text-indigo-400">.</span>
                </span>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94a3b8] hover:text-[#f0f2ff] hover:bg-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation links">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={href}
                      onClick={() => handleNavClick(href)}
                      className={cn(
                        "flex items-center rounded-xl px-4 py-3 text-sm font-medium",
                        "transition-colors duration-150",
                        activeLink === href
                          ? "bg-indigo-500/10 text-indigo-300"
                          : "text-[#94a3b8] hover:bg-white/5 hover:text-[#f0f2ff]"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="mt-auto p-5 border-t border-white/[0.06]">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex w-full h-10 items-center justify-center gap-2 rounded-xl",
                    "border border-indigo-500/40 bg-indigo-500/8",
                    "text-xs font-semibold text-indigo-300",
                    "transition-all duration-200 hover:bg-indigo-500/15"
                  )}
                >
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── NavLink sub-component ───────────────────────────────────────────────── */
interface NavLinkProps {
  href: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

function NavLink({ href, active, onClick, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-medium",
        "transition-colors duration-150 outline-none",
        active
          ? "text-[#f0f2ff]"
          : "text-[#94a3b8] hover:text-[#f0f2ff] hover:bg-white/5"
      )}
    >
      {children}
      {active && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute inset-0 rounded-lg bg-white/6"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}
