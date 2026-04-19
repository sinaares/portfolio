"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GithubRepo } from "@/lib/github";
import { langColour } from "@/lib/github";

/* ─── Animated card wrapper ───────────────────────────────────────────────── */
interface ProjectCardProps {
  repo: GithubRepo;
  index: number;
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  const lang = langColour(repo.language);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-white/[0.07]",
        "bg-[#0f1117] p-6",
        "transition-shadow duration-300",
        "hover:border-white/[0.13]",
        "hover:shadow-[0_20px_48px_rgba(0,0,0,0.55),0_0_0_1px_rgba(99,102,241,0.08)]",
      )}
    >
      {/* Top accent line — slides in on hover */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-px rounded-t-2xl",
          "bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/15 text-indigo-400">
            <Code2 size={14} aria-hidden />
          </span>
          <h3 className="text-sm font-semibold text-[#f0f2ff] truncate leading-none">
            {repo.name}
          </h3>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${repo.name} on GitHub`}
          className={cn(
            "flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-lg",
            "text-[#475569] border border-white/[0.06] bg-white/[0.03]",
            "transition-all duration-150",
            "hover:text-[#f0f2ff] hover:border-white/15 hover:bg-white/[0.07]",
            "opacity-0 group-hover:opacity-100"
          )}
        >
          <ExternalLink size={12} aria-hidden />
        </a>
      </div>

      {/* Description */}
      <p className="text-xs leading-5 text-[#94a3b8] mb-4 flex-1 line-clamp-3">
        {repo.description ?? "No description provided."}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-[#475569] font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer row */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.05]">
        {/* Language + stats */}
        <div className="flex items-center gap-3">
          {repo.language && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold border",
                lang.bg,
                lang.text,
                "border-current/20"
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", lang.dot)} aria-hidden />
              {repo.language}
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-[11px] text-[#475569]">
            <Star size={11} aria-hidden />
            {repo.stargazers_count.toLocaleString()}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] text-[#475569]">
            <GitFork size={11} aria-hidden />
            {repo.forks_count.toLocaleString()}
          </span>
        </div>

        {/* View Code button */}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-3 h-7",
            "border-indigo-500/25 bg-indigo-500/8 text-indigo-300 text-[11px] font-semibold",
            "transition-all duration-150",
            "hover:bg-indigo-500/16 hover:border-indigo-500/45",
            "hover:shadow-[0_0_16px_rgba(99,102,241,0.2)]"
          )}
        >
          View Code
          <ExternalLink size={10} aria-hidden />
        </a>
      </div>
    </motion.article>
  );
}
