// Live GitHub data for the portfolio's "repos" and "recent commits" sections.
// Fetched server-side with hourly caching (Next.js revalidate). If the GitHub
// API is unavailable or rate-limited, we fall back to a static snapshot so the
// page never breaks.

const USER = "Ez3ro";
const REVALIDATE_SECONDS = 3600; // re-fetch at most once per hour

export interface Repo {
  name: string;
  lang: string;
  updated: string; // YYYY-MM-DD
  url: string;
}

export interface Commit {
  repo: string;
  sha: string;
  date: string; // YYYY-MM-DD
  msg: string;
}

export interface LangSlice {
  name: string;
  pct: number;   // share of repos, 0–100
  color: string;
}

export interface GitHubStats {
  repoCount: number;
  langCount: number;
  sinceYear: string;
  latestPush: string;  // YYYY-MM-DD
  languages: LangSlice[];
}

// ── Fallback snapshot (used only if the live fetch fails) ──
const FALLBACK_REPOS: Repo[] = [
  { name: "pahirap",                    lang: "JavaScript", updated: "2026-06-20", url: `https://github.com/${USER}/pahirap` },
  { name: "Portfolio_app",              lang: "TypeScript", updated: "2026-06-20", url: `https://github.com/${USER}/Portfolio_app` },
  { name: "teamnicoleandderek2",        lang: "TypeScript", updated: "2025-05-18", url: `https://github.com/${USER}/teamnicoleandderek2` },
  { name: "example-app",                lang: "CSS",        updated: "2023-05-22", url: `https://github.com/${USER}/example-app` },
  { name: "NacomexLive",                lang: "HTML",       updated: "2023-05-07", url: `https://github.com/${USER}/NacomexLive` },
  { name: "ServerLivestream",           lang: "HTML",       updated: "2023-05-04", url: `https://github.com/${USER}/ServerLivestream` },
  { name: "ProjectVehicularDataBank-1", lang: "Python",     updated: "2022-05-25", url: `https://github.com/${USER}/ProjectVehicularDataBank-1` },
];

const FALLBACK_COMMITS: Commit[] = [
  { repo: "Portfolio_app", sha: "7c4e157", date: "2026-06-20", msg: "Update" },
  { repo: "pahirap",       sha: "4016bc3", date: "2026-06-20", msg: "update" },
  { repo: "pahirap",       sha: "ce19575", date: "2026-06-20", msg: "additional update + bug fixes + new features" },
  { repo: "example-app",   sha: "198ef2b", date: "2023-05-21", msg: "Merge pull request #1 from Ez3ro/develop" },
  { repo: "NacomexLive",   sha: "a03ed88", date: "2023-05-07", msg: "Test" },
];

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "ezekhiel-portfolio",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ghFetch(path: string): Promise<any | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Public repos, most recently pushed first, excluding forks and profile repo. */
export async function getRepos(limit = 7): Promise<Repo[]> {
  const data = await ghFetch(`/users/${USER}/repos?per_page=100&sort=pushed`);
  if (!Array.isArray(data)) return FALLBACK_REPOS;

  const repos: Repo[] = data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((r: any) => !r.fork && r.name.toLowerCase() !== USER.toLowerCase())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((r: any) => ({
      name: r.name,
      lang: r.language || "Other",
      updated: (r.pushed_at || r.updated_at || "").slice(0, 10),
      url: r.html_url,
    }))
    .slice(0, limit);

  return repos.length ? repos : FALLBACK_REPOS;
}

/** Latest commit from each of the top recent repos, newest first. */
export async function getCommits(limit = 6): Promise<Commit[]> {
  const repos = await getRepos(limit + 2);
  if (repos === FALLBACK_REPOS) return FALLBACK_COMMITS;

  const results = await Promise.all(
    repos.map(async (repo): Promise<Commit | null> => {
      const data = await ghFetch(`/repos/${USER}/${repo.name}/commits?per_page=1`);
      if (!Array.isArray(data) || !data[0]) return null;
      const c = data[0];
      return {
        repo: repo.name,
        sha: (c.sha || "").slice(0, 7),
        date: (c.commit?.author?.date || "").slice(0, 10),
        msg: (c.commit?.message || "").split("\n")[0].slice(0, 70),
      };
    })
  );

  const commits = results
    .filter((c): c is Commit => c !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);

  return commits.length ? commits : FALLBACK_COMMITS;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python:     "#3572A5",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  PHP:        "#4F5D95",
  Vue:        "#41b883",
  Other:      "#8b949e",
};

const FALLBACK_STATS: GitHubStats = {
  repoCount: 9,
  langCount: 5,
  sinceYear: "2017",
  latestPush: "2026-06-20",
  languages: [
    { name: "TypeScript", pct: 30, color: LANG_COLORS.TypeScript },
    { name: "JavaScript", pct: 25, color: LANG_COLORS.JavaScript },
    { name: "Python",     pct: 20, color: LANG_COLORS.Python },
    { name: "HTML",       pct: 15, color: LANG_COLORS.HTML },
    { name: "CSS",        pct: 10, color: LANG_COLORS.CSS },
  ],
};

/**
 * Aggregate GitHub stats: repo count, distinct languages, account age,
 * latest push, and a language breakdown by repo. Computed from the public
 * repos + profile endpoints. Falls back to a sensible snapshot on failure.
 */
export async function getStats(): Promise<GitHubStats> {
  const [reposData, profile] = await Promise.all([
    ghFetch(`/users/${USER}/repos?per_page=100&sort=pushed`),
    ghFetch(`/users/${USER}`),
  ]);

  if (!Array.isArray(reposData)) return FALLBACK_STATS;

  const repos = reposData.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (r: any) => !r.fork && r.name.toLowerCase() !== USER.toLowerCase()
  );
  if (!repos.length) return FALLBACK_STATS;

  // Count primary language across repos
  const counts: Record<string, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const r of repos) {
    const l = r.language;
    if (l) counts[l] = (counts[l] || 0) + 1;
  }
  const totalLang = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const languages: LangSlice[] = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, n]) => ({
      name,
      pct: Math.round((n / totalLang) * 100),
      color: LANG_COLORS[name] || LANG_COLORS.Other,
    }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const latestPush = repos
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((r: any) => r.pushed_at || "")
    .sort()
    .reverse()[0]
    ?.slice(0, 10) || FALLBACK_STATS.latestPush;

  return {
    repoCount: repos.length,
    langCount: languages.length,
    sinceYear: (profile?.created_at || "2017").slice(0, 4),
    latestPush,
    languages,
  };
}
