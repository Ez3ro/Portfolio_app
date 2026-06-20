import React from 'react';
import { FiFolder, FiCode, FiClock, FiGitCommit } from 'react-icons/fi';
import type { GitHubStats as Stats } from '../lib/github';

/*
  GitHub stats strip + language breakdown bar. Pure server component
  (data fetched server-side). Replaces the sparse contribution heatmap
  with a denser, on-theme summary that emphasises breadth and recency.
*/

function timeAgo(dateStr: string): string {
  if (!dateStr) return '—';
  const then = new Date(dateStr + 'T00:00:00').getTime();
  const days = Math.floor((Date.now() - then) / 86400000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

const GitHubStats: React.FC<{ stats: Stats; latestPush: string }> = ({ stats, latestPush }) => {
  const cards = [
    { icon: <FiFolder size={16} />,    value: stats.repoCount,            label: 'Public repos' },
    { icon: <FiCode size={16} />,      value: stats.langCount,            label: 'Languages' },
    { icon: <FiGitCommit size={16} />, value: stats.sinceYear,            label: 'Coding since' },
    { icon: <FiClock size={16} />,     value: timeAgo(latestPush),        label: 'Last commit' },
  ];

  return (
    <div className="gh-stats">
      <div className="gh-stats-head">
        <p className="section-eyebrow">Activity</p>
        <h2 className="section-title">
          GitHub <span className="dim">at a glance</span>
        </h2>
      </div>

      {/* Stat cards */}
      <div className="gh-stat-cards">
        {cards.map(({ icon, value, label }) => (
          <div key={label} className="gh-stat-card">
            <span className="gh-stat-icon">{icon}</span>
            <span className="gh-stat-value">{value}</span>
            <span className="gh-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Language breakdown bar */}
      {stats.languages.length > 0 && (
        <div className="gh-lang">
          <div className="gh-lang-bar">
            {stats.languages.map((l) => (
              <span
                key={l.name}
                className="gh-lang-seg"
                style={{ width: `${l.pct}%`, background: l.color }}
                title={`${l.name} ${l.pct}%`}
              />
            ))}
          </div>
          <div className="gh-lang-legend">
            {stats.languages.map((l) => (
              <span key={l.name} className="gh-lang-item">
                <span className="gh-lang-dot" style={{ background: l.color }} />
                {l.name} <span className="gh-lang-pct">{l.pct}%</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubStats;
