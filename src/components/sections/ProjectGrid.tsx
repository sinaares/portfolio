"use client";

import { motion } from "framer-motion";
import { RefreshCw, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import type { GithubRepo } from "@/lib/github";

/* ─── Error state ─────────────────────────────────────────────────────────── */
const ERROR_ICONS = {
  rate_limited:  "⏱",
  not_found:     "🔍",
  network_error: "📡",
} as const;

interface ErrorStateProps {
  error: "rate_limited" | "not_found" | "network_error";
  message: string;
  username: string;
}

function ErrorState({ error, message, username }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center gap-4 rounded-2xl border border-amber-500/20",
        "bg-amber-500/5 px-8 py-12 text-center max-w-lg mx-auto"
      )}
      role="alert"
    >
      <span className="text-4xl leading-none" aria-hidden>{ERROR_ICONS[error]}</span>
      <div>
        <p className="text-sm font-semibold text-amber-300 mb-1">
          {error === "rate_limited"  && "GitHub API Rate Limit"}
          {error === "not_found"     && "Profile Not Found"}
          {error === "network_error" && "Network Error"}
        </p>
        <p className="text-xs text-[#94a3b8] leading-5">{message}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-white/10",
            "bg-white/[0.04] px-4 h-9 text-xs font-medium text-[#94a3b8]",
            "hover:bg-white/[0.08] hover:text-[#f0f2ff] transition-colors"
          )}
        >
          <RefreshCw size={13} aria-hidden />
          Retry
        </button>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-white/10",
            "bg-white/[0.04] px-4 h-9 text-xs font-medium text-[#94a3b8]",
            "hover:bg-white/[0.08] hover:text-[#f0f2ff] transition-colors"
          )}
        >
          <ExternalLink size={13} aria-hidden />
          Open GitHub
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Empty state ─────────────────────────────────────────────────────────── */
function EmptyState({ username }: { username: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-sm text-[#475569]">No public repositories found for</p>
      <code className="text-xs text-[#94a3b8] bg-white/5 px-2.5 py-1 rounded-lg border border-white/8">
        @{username}
      </code>
    </div>
  );
}

/* ─── Animated grid ───────────────────────────────────────────────────────── */
interface ProjectGridProps {
  repos:    GithubRepo[] | null;
  error:    { kind: "rate_limited" | "not_found" | "network_error"; message: string } | null;
  username: string;
}

export function ProjectGrid({ repos, error, username }: ProjectGridProps) {
  if (error) {
    return <ErrorState error={error.kind} message={error.message} username={username} />;
  }

  if (!repos || repos.length === 0) {
    return <EmptyState username={username} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {repos.map((repo, i) => (
        <ProjectCard key={repo.id} repo={repo} index={i} />
      ))}
    </div>
  );
}
