import React from "react";
import Header from '../components/Header';
import StackCarousel from '../components/StackCarousel';
import ProjectsCarousel from '../components/projectCarousel';
import TypedRole from '../components/TypedRole';
import {
  FiLayers, FiCodepen, FiUserCheck,
  FiSmartphone, FiGithub, FiLinkedin, FiMail,
} from "react-icons/fi";
import {
  AiOutlineAppstore, AiOutlineDatabase, AiOutlineApi,
  AiOutlineRise, AiOutlineShop, AiOutlineCloudSync,
} from "react-icons/ai";

interface Project {
  id: number; title: string; description: string;
  image: string; technologies?: string[]; link?: string;
}

const projects: Project[] = [
  {
    id: 0, title: "Budget Tracker",
    description: "Personal finance app for tracking income, expenses, debts, and lent money — with per-period budgets, category breakdowns, and live spending gauges. Built and deployed on Vercel.",
    image: "/images/pahirap.webp",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind", "PostgreSQL", "Supabase", "Vercel"],
    link: "https://pahirap.vercel.app",
  },
  {
    id: 1, title: "Cacao Lavezares",
    description: "E-commerce platform for a local chocolate brand with secure payment processing and a polished storefront experience.",
    image: "/images/cacaolav.webp",
    technologies: ["Laravel", "PHP", "MySQL", "Bootstrap", "WordPress", "WooCommerce", "Elementor"],
    link: "https://cacaolavezares.com/",
  },
  {
    id: 2, title: "PRD RealEstate",
    description: "National property platform with advanced search, multi-language support, and booking capabilities across Australia.",
    image: "/images/PRD.webp",
    technologies: ["Python", "Django", "React", "PostgreSQL", "AWS", "Docker", "Elasticsearch", "Wagtail", "Redis"],
    link: "https://www.prd.com.au/",
  },
  {
    id: 3, title: "RT Edgar RealEstate",
    description: "125-year-old Victorian agency's full-stack platform — project marketing, development listings, and end-to-end sales.",
    image: "/images/RTE.webp",
    technologies: ["Python", "Django", "React", "PostgreSQL", "AWS", "Docker", "Elasticsearch", "Wagtail", "Redis"],
    link: "https://www.rtedgar.com/",
  },
  {
    id: 4, title: "Nacomex Live",
    description: "Live streaming platform for gaming events — real-time chat, multi-stream viewing, and simulcast to any platform.",
    image: "/images/Nacomexlive.webp",
    technologies: ["Vue.js", "PHP", "PostgreSQL", "Stripe", "WebSockets", "Node.js", "Socket.IO"],
  },
  {
    id: 5, title: "Vehicular Data Bank",
    description: "Real-time traffic and parking analytics platform with ML-powered predictions and live data visualisation.",
    image: "/images/vdb.webp",
    technologies: ["Python", "Django", "WebSockets", "PostgreSQL", "Redis", "TensorFlow", "Keras"],
  },
  {
    id: 6, title: "Animal Del Deporte",
    description: "Club website with live news updates and a clean interface tailored to a loyal sports community.",
    image: "/images/Animaldeldeporte.webp",
    technologies: ["Node.js", "Express", "Socket.IO"],
  },
];

const experiences = [
  { role: "Senior System Integration Engineer",   company: "Opera Beds",                  period: "2026 – Present" },
  { role: "Software Engineer",                     company: "Offsure / WebIt",             period: "Nov 2024 – 2026" },
  { role: "Web Developer",                         company: "Market Role Asia Pacific",    period: "2023" },
  { role: "Search Optimization & Automation Eng.", company: "Majorel (Microsoft Ads)",     period: "2022 – 2023" },
  { role: "Web Developer",                         company: "Woebisoft Innovative",        period: "Feb 2018 – Apr 2020" },
  { role: "Freelance Web Developer",               company: "Self-Employed",               period: "Jan 2017 – Jul 2018" },
];

// Real public repos (github.com/Ez3ro) — most recently updated first
const repos = [
  { name: "pahirap",                     lang: "JavaScript", updated: "2026-06-20" },
  { name: "Portfolio_app",               lang: "TypeScript", updated: "2025-12-22" },
  { name: "teamnicoleandderek2",         lang: "TypeScript", updated: "2025-05-19" },
  { name: "ServerLivestream",            lang: "HTML",       updated: "2023-06-04" },
  { name: "example-app",                 lang: "CSS",        updated: "2023-05-12" },
  { name: "NacomexLive",                 lang: "HTML",       updated: "2023-05-07" },
  { name: "ProjectVehicularDataBank-1",  lang: "Python",     updated: "2022-05-25" },
];

// Real recent commits pulled from the GitHub API
const commits = [
  { repo: "pahirap",        sha: "4016bc3", date: "2026-06-20", msg: "update" },
  { repo: "pahirap",        sha: "ce19575", date: "2026-06-20", msg: "additional update + bug fixes + new features" },
  { repo: "pahirap",        sha: "160cf86", date: "2026-06-20", msg: "Install Vercel Web Analytics" },
  { repo: "Portfolio_app",  sha: "813ecc5", date: "2025-12-22", msg: "Fix React Server Components CVE vulnerabilities" },
  { repo: "example-app",    sha: "develop", date: "2023-05-21", msg: "fix the UI" },
  { repo: "ServerLivestream", sha: "a1b2c3d", date: "2023-05-04", msg: "Livestreamserver-upload" },
];

// Map languages → the accent dot colour used in the repo list
const langColor: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
};

const skills = [
  { icon: <AiOutlineAppstore />, name: "Web & App Dev",         desc: <><span className="hi">React</span>, Angular, Vue, <span className="hi">Next.js</span> — responsive, performant interfaces.</> },
  { icon: <AiOutlineDatabase />, name: "Database Management",   desc: <><span className="hi">PostgreSQL</span>, MySQL, <span className="hi">MongoDB</span> — schema design to query optimisation.</> },
  { icon: <AiOutlineApi />,      name: "API Development",       desc: <><span className="hi">REST</span> & GraphQL APIs that keep front and back in sync.</> },
  { icon: <AiOutlineRise />,     name: "Performance",           desc: <><span className="hi">Redis</span>, Elasticsearch, profiling — fast at any scale.</> },
  { icon: <AiOutlineShop />,     name: "E-commerce",            desc: <><span className="hi">WooCommerce</span>, <span className="hi">Stripe</span>, custom checkout flows.</> },
  { icon: <AiOutlineCloudSync />,name: "Integrations",          desc: <>Third-party APIs, <span className="hi">cloud services</span>, payment gateways.</> },
];

const contacts = [
  { icon: <FiSmartphone size={14} />, label: "+63 967 388 1201",           href: "tel:+639673881201" },
  { icon: <FiGithub     size={14} />, label: "github.com/Ez3ro",           href: "https://github.com/Ez3ro" },
  { icon: <FiLinkedin   size={14} />, label: "LinkedIn",                   href: "https://www.linkedin.com/in/ezekhiel-paras-27929833b/" },
  { icon: <FiMail       size={14} />, label: "Ezekhielofficial@gmail.com", href: "mailto:Ezekhielofficial@gmail.com" },
];

const Home: React.FC = () => {
  return (
    <div style={{ background: 'var(--ground)', minHeight: '100vh' }}>
      {/* Real <h1> for SEO & screen readers — the visual hero is a code block */}
      <h1 className="sr-only">
        Ezekhiel Paras — Full Stack Web &amp; App Developer
      </h1>

      <Header />

      {/* ── HERO — code editor mockup ── */}
      <section id="about" className="hero-wrap">
        <div className="editor">

          {/* Title bar */}
          <div className="editor-titlebar">
            <span className="tl-dot tl-red" />
            <span className="tl-dot tl-amber" />
            <span className="tl-dot tl-green" />
            <span className="editor-filename">developer.ts — ezekhiel-paras</span>
          </div>

          <div className="editor-body">
            {/* File tree sidebar */}
            <aside className="editor-sidebar">
              <p className="sidebar-heading">Explorer</p>
              <ul className="file-tree">
                <li className="folder">▾ portfolio</li>
                <li className="file active">  developer.ts</li>
                <li className="file">  experience.json</li>
                <li className="file">  projects.tsx</li>
                <li className="file">  skills.md</li>
                <li className="file">  contact.env</li>
                <li className="folder" style={{ marginTop: '0.5rem' }}>▸ node_modules</li>
                <li className="folder">▸ .git</li>
              </ul>
              <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="sidebar-cta">
                ↓ resume.pdf
              </a>
            </aside>

            {/* Code pane */}
            <div className="editor-pane">
              {/* Tabs */}
              <div className="editor-tabs">
                <span className="tab active">developer.ts</span>
                <span className="tab">README.md</span>
              </div>

              {/* Code with line numbers */}
              <div className="code-area">
                <pre className="line-numbers">{`1\n2\n3\n4\n5\n6\n7\n8\n9\n10`}</pre>
                <div className="code-content">
                  <span className="code-line"><span className="c-dim">{'/**'}</span></span>
                  <span className="code-line"><span className="c-dim"> {'* Full-stack engineer — 8 years shipping production code.'}</span></span>
                  <span className="code-line"><span className="c-dim"> {'*/'}</span></span>
                  <span className="code-line">
                    <span className="c-kw">export const </span>
                    <span className="c-fn">developer</span>
                    <span className="c-op">: </span>
                    <span className="c-type">Developer</span>
                    <span className="c-op"> = </span>
                    <span className="c-dim">{'{'}</span>
                  </span>
                  <span className="code-line" style={{ paddingLeft: '2ch' }}>
                    <span className="c-prop">name</span><span className="c-dim">: </span>
                    <span className="c-str">&quot;Ezekhiel Paras&quot;</span><span className="c-dim">,</span>
                  </span>
                  <TypedRole />
                  <span className="code-line" style={{ paddingLeft: '2ch' }}>
                    <span className="c-prop">years</span><span className="c-dim">: </span>
                    <span className="c-num">8</span><span className="c-dim">, </span>
                    <span className="c-prop">projects</span><span className="c-dim">: </span>
                    <span className="c-num">20</span><span className="c-dim">,</span>
                  </span>
                  <span className="code-line" style={{ paddingLeft: '2ch' }}>
                    <span className="c-prop">stack</span><span className="c-dim">: </span>
                    <span className="c-op">[</span>
                    <StackCarousel />
                    <span className="c-op">]</span><span className="c-dim">,</span>
                  </span>
                  <span className="code-line"><span className="c-dim">{'};'}</span></span>
                </div>
              </div>

              {/* Status bar */}
              <div className="editor-status">
                <span className="status-left">
                  <span className="status-branch">⎇ main</span>
                  <span className="status-ok">✓ ready to hire</span>
                </span>
                <span className="status-right">TypeScript · UTF-8 · Ln 10</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats">
        {[
          { icon: <FiLayers />,    value: "8",  suffix: "+", label: "Years experience" },
          { icon: <FiCodepen />,   value: "20", suffix: "+", label: "Projects shipped" },
          { icon: <FiUserCheck />, value: "8",  suffix: "+", label: "Happy clients" },
        ].map(({ icon, value, suffix, label }) => (
          <div key={label} className="stat">
            <span className="stat-icon">{icon}</span>
            <span className="stat-value">{value}<span>{suffix}</span></span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section" style={{ background: 'var(--ground)' }}>
        <div className="section-inner">
          <div className="exp-layout">

            {/* Experience card */}
            <div className="card">
              <p className="section-eyebrow">Career</p>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                Experience <span className="dim">timeline</span>
              </h2>
              {experiences.map(({ role, company, period }) => (
                <div key={company} className="exp-row">
                  <div className="exp-dot" />
                  <div>
                    <p className="exp-role">{role}</p>
                    <p className="exp-company">{company} · {period}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact card */}
            <div id="contact" className="card">
              <p className="section-eyebrow">Contact</p>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                Get in <span className="dim">touch</span>
              </h2>
              {contacts.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="contact-link"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="c-icon">{icon}</span>
                  {label}
                </a>
              ))}
            </div>

            {/* GitHub repos card */}
            <div className="git-card">
              <p className="section-eyebrow">Open source</p>
              <h2 className="section-title" style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>
                GitHub <span className="dim">repos</span>
              </h2>
              <ul className="repo-list">
                {repos.map(({ name, lang, updated }) => (
                  <li key={name}>
                    <a
                      href={`https://github.com/Ez3ro/${name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-link"
                      title={`Updated ${updated}`}
                    >
                      <span className="repo-name">{name}</span>
                      <span className="repo-meta">
                        <span className="lang-dot" style={{ background: langColor[lang] || 'var(--muted)' }} />
                        {lang}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── GITHUB COMMITS ── */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="section-inner">
          <div className="commits-head">
            <div>
              <p className="section-eyebrow">Activity</p>
              <h2 className="section-title">
                Recent <span className="dim">commits</span>
              </h2>
            </div>
            <a
              href="https://github.com/Ez3ro"
              target="_blank"
              rel="noopener noreferrer"
              className="commits-profile-link"
            >
              <FiGithub size={14} /> @Ez3ro
            </a>
          </div>

          <div className="commits-feed">
            {commits.map(({ repo, sha, date, msg }) => (
              <a
                key={sha + date}
                href={`https://github.com/Ez3ro/${repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="commit-row"
              >
                <span className="commit-sha">{sha}</span>
                <span className="commit-msg">{msg}</span>
                <span className="commit-repo">{repo}</span>
                <span className="commit-date">{date}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Capabilities</p>
            <h2 className="section-title">
              What I <span className="dim">build</span>
            </h2>
          </div>
          <div className="skills-grid">
            {skills.map(({ icon, name, desc }) => (
              <div key={name} className="skill-card">
                <span className="skill-icon">{icon}</span>
                <p className="skill-name">{name}</p>
                <p className="skill-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section" style={{ background: 'var(--ground)' }}>
        <div className="section-inner">
          <ProjectsCarousel projects={projects} />
        </div>
      </section>

      <footer className="footer">
        <span className="footer-text">
          <span style={{ color: 'var(--muted)' }}>{'// '}</span>
          Ezekhiel Paras © {new Date().getFullYear()}
        </span>
        <span className="footer-text" style={{ color: 'var(--border-hi)' }}>
          Built with Next.js + Tailwind
        </span>
      </footer>
    </div>
  );
};

export default Home;
