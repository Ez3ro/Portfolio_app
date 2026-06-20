"use client";
import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { label: 'about()',      href: '#about' },
  { label: 'experience()', href: '#experience' },
  { label: 'skills()',     href: '#skills' },
  { label: 'projects()',   href: '#projects' },
  { label: 'contact()',    href: '#contact' },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, []);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#about" className="nav-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-name">EP</span>
          <span className="logo-bracket">]</span>
          <span style={{ color: 'var(--muted)', fontWeight: 300 }}>.dev</span>
        </a>

        <nav aria-label="Main">
          <ul className="nav-links">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">
            resume.pdf ↗
          </a>
          <button
            className="nav-menu-btn"
            style={{ display: 'none' }}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                color: 'var(--muted)',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
