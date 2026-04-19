/* ─── Projects section — SERVER COMPONENT ────────────────────────────────────
   Fetches GitHub repos at build / revalidation time (ISR: 1 h).
   Passes data down to the client-side animated grid.
   ─────────────────────────────────────────────────────────────────────────── */

import { ExternalLink } from "lucide-react";
import { fetchRepos, GITHUB_USERNAME } from "@/lib/github";
import { ProjectGrid } from "./ProjectGrid";
import { cn } from "@/lib/utils";

export async function Projects() {
  const result = await fetchRepos();

  const repos = result.ok ? result.repos : null;
  const error = result.ok
    ? null
    : { kind: result.error, message: result.message };

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-28 md:py-36"
    >
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Open source
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#f0f2ff] sm:text-4xl leading-[1.15]">
            Things I&apos;ve{" "}
            <span className="gradient-text">built &amp; shipped</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#94a3b8]">
            A live feed of my public GitHub repositories — sorted by activity and stars.
          </p>
        </div>

        {/* GitHub profile link */}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex-shrink-0 inline-flex items-center gap-2.5 rounded-xl border px-5 h-10",
            "border-white/10 bg-white/[0.04] text-sm font-medium text-[#94a3b8]",
            "transition-all duration-200",
            "hover:bg-white/[0.08] hover:border-white/20 hover:text-[#f0f2ff]",
            "self-start sm:self-auto"
          )}
        >
          <GithubIcon />
          @{GITHUB_USERNAME}
          <ExternalLink size={12} className="opacity-50" aria-hidden />
        </a>
      </div>

      {/* Card grid or error state */}
      <ProjectGrid repos={repos} error={error} username={GITHUB_USERNAME} />

      {/* "More on GitHub" footer link */}
      {repos && repos.length > 0 && (
        <div className="mt-10 flex justify-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 text-xs text-[#475569]",
              "transition-colors duration-150 hover:text-[#94a3b8]"
            )}
          >
            <span className="h-px w-8 bg-white/10" aria-hidden />
            View all repositories on GitHub
            <span className="h-px w-8 bg-white/10" aria-hidden />
          </a>
        </div>
      )}

      {/* Decorative gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
