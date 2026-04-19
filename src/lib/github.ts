/* ─── GitHub API types & fetch helpers ────────────────────────────────────── */

export interface GithubRepo {
  id:                number;
  name:              string;
  full_name:         string;
  html_url:          string;
  description:       string | null;
  language:          string | null;
  stargazers_count:  number;
  forks_count:       number;
  updated_at:        string;
  pushed_at:         string;
  topics:            string[];
  fork:              boolean;
  private:           boolean;
}

export type FetchResult =
  | { ok: true;  repos: GithubRepo[] }
  | { ok: false; error: "rate_limited" | "not_found" | "network_error"; message: string };

/* GitHub username — override via GITHUB_USERNAME env var */
export const GITHUB_USERNAME =
  process.env.GITHUB_USERNAME ?? "sinaares";

const REPO_LIMIT = 6;

/* Score for ranking: stars carry 10× weight over recency (days since epoch) */
function score(repo: GithubRepo): number {
  const daysSinceEpoch = new Date(repo.pushed_at).getTime() / 86_400_000;
  return repo.stargazers_count * 10 + daysSinceEpoch / 1000;
}

export async function fetchRepos(): Promise<FetchResult> {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

  let res: Response;
  try {
    res = await fetch(url, {
      next: { revalidate: 3600 },          // ISR — re-fetch at most once per hour
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    });
  } catch {
    return {
      ok: false,
      error: "network_error",
      message: "Could not reach the GitHub API. Check your network connection.",
    };
  }

  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("X-RateLimit-Reset");
    const resetTime = reset
      ? new Date(Number(reset) * 1000).toLocaleTimeString()
      : "soon";
    return {
      ok: false,
      error: "rate_limited",
      message: `GitHub API rate limit reached. Resets at ${resetTime}.`,
    };
  }

  if (res.status === 404) {
    return {
      ok: false,
      error: "not_found",
      message: `GitHub user "${GITHUB_USERNAME}" not found.`,
    };
  }

  if (!res.ok) {
    return {
      ok: false,
      error: "network_error",
      message: `GitHub API returned ${res.status}.`,
    };
  }

  const all: GithubRepo[] = await res.json();

  const repos = all
    .filter((r) => !r.fork && !r.private)           // exclude forks & private repos
    .sort((a, b) => score(b) - score(a))             // highest stars + recency first
    .slice(0, REPO_LIMIT);

  return { ok: true, repos };
}

/* ─── Language → badge colour map ────────────────────────────────────────── */
export const LANG_COLOURS: Record<string, { bg: string; text: string; dot: string }> = {
  TypeScript:  { bg: "bg-sky-500/10",    text: "text-sky-300",     dot: "bg-sky-400"      },
  JavaScript:  { bg: "bg-yellow-500/10", text: "text-yellow-300",  dot: "bg-yellow-400"   },
  Python:      { bg: "bg-blue-500/10",   text: "text-blue-300",    dot: "bg-blue-400"     },
  Rust:        { bg: "bg-orange-500/10", text: "text-orange-300",  dot: "bg-orange-400"   },
  Go:          { bg: "bg-cyan-500/10",   text: "text-cyan-300",    dot: "bg-cyan-400"     },
  Java:        { bg: "bg-rose-500/10",   text: "text-rose-300",    dot: "bg-rose-400"     },
  "C++":       { bg: "bg-pink-500/10",   text: "text-pink-300",    dot: "bg-pink-400"     },
  C:           { bg: "bg-purple-500/10", text: "text-purple-300",  dot: "bg-purple-400"   },
  Shell:       { bg: "bg-emerald-500/10",text: "text-emerald-300", dot: "bg-emerald-400"  },
  HTML:        { bg: "bg-orange-500/10", text: "text-orange-300",  dot: "bg-orange-400"   },
  CSS:         { bg: "bg-violet-500/10", text: "text-violet-300",  dot: "bg-violet-400"   },
  Jupyter:     { bg: "bg-amber-500/10",  text: "text-amber-300",   dot: "bg-amber-400"    },
  _default:    { bg: "bg-slate-500/10",  text: "text-slate-300",   dot: "bg-slate-400"    },
};

export function langColour(lang: string | null) {
  if (!lang) return LANG_COLOURS._default;
  return LANG_COLOURS[lang] ?? LANG_COLOURS._default;
}
