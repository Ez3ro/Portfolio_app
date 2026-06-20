"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiFolder } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies?: string[];
  link?: string;
}

/*
  "Hero select" coverflow — like a video-game character picker.
  The focused card sits centre-stage (large, lit, full details);
  neighbours flank it smaller, dimmed and pushed back in 3D.
  Auto-advances on a timer, but PAUSES while the pointer is over
  the stage (or the tab is hidden) so it never scrolls past a
  project you're reading. Arrows + clicking a side card also move.
*/
const AUTOPLAY_MS = 4000;

// Card thumbnail — next/image (auto AVIF/responsive) with a graceful
// fallback if the file is missing. priority on the first card so the
// initial LCP image is fetched eagerly.
const Thumb: React.FC<{ project: Project; priority: boolean }> = ({ project, priority }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`hs-thumb${failed ? ' hs-thumb-fallback' : ''}`}
      data-title={failed ? project.title : undefined}
    >
      {!failed && (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 80vw, 460px"
          priority={priority}
          draggable={false}
          style={{ objectFit: 'cover' }}
          onError={() => setFailed(true)}
        />
      )}
      {project.link && <span className="hs-live">● LIVE</span>}
    </div>
  );
};

const ProjectsCarousel: React.FC<{ projects: Project[] }> = ({ projects }) => {
  // active=0 renders identically on server & client → no hydration mismatch,
  // and the first project's image/text is in the initial HTML (good for LCP).
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const n = projects.length;
  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);
  const prev = useCallback(() => setActive((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setActive((i) => (i + 1) % n), [n]);

  // autoplay — paused on hover or when tab not visible
  useEffect(() => {
    if (n <= 1 || paused) return;
    timer.current = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % n);
    }, AUTOPLAY_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [n, paused]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const activeProject = projects[active];

  return (
    <div>
      {/* Header + controls */}
      <div className="projects-head">
        <div>
          <p className="section-eyebrow">Projects</p>
          <h2 className="section-title">
            Select a <span className="dim">build</span>
          </h2>
        </div>
        <div className="projects-nav">
          <button className="proj-btn" onClick={prev} aria-label="Previous project">
            <FiChevronLeft size={16} />
          </button>
          <span className="proj-counter mono">
            {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
          <button className="proj-btn" onClick={next} aria-label="Next project">
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Coverflow stage */}
      <div
        className="hs-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {projects.map((project, i) => {
          // shortest signed distance on the ring (handles wrap-around)
          let offset = i - active;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;

          const abs = Math.abs(offset);
          const isActive = offset === 0;
          // cards more than 2 away are parked off-stage
          const hidden = abs > 2;

          const style: React.CSSProperties = {
            transform: `translateX(${offset * 56}%) scale(${isActive ? 1 : 0.82 - (abs - 1) * 0.06}) rotateY(${offset * -16}deg)`,
            opacity: hidden ? 0 : isActive ? 1 : 0.45,
            zIndex: 10 - abs,
            pointerEvents: hidden ? 'none' : 'auto',
          };

          return (
            <button
              key={project.id}
              className={`hs-card${isActive ? ' is-active' : ''}`}
              style={style}
              onClick={() => (isActive ? null : go(i))}
              tabIndex={isActive ? 0 : -1}
              aria-label={isActive ? project.title : `Show ${project.title}`}
              aria-hidden={hidden}
            >
              <Thumb project={project} priority={i === 0} />
            </button>
          );
        })}
      </div>

      {/* Detail panel for the focused project */}
      <div className="hs-detail" key={activeProject.id}>
        <div className="hs-detail-head">
          <FiFolder className="project-folder" size={16} />
          <h3 className="hs-detail-title">{activeProject.title}</h3>
          {activeProject.link && (
            <a
              href={activeProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hs-detail-link"
            >
              View live <FiExternalLink size={13} />
            </a>
          )}
        </div>
        <p className="hs-detail-desc">{activeProject.description}</p>
        {activeProject.technologies && activeProject.technologies.length > 0 && (
          <div className="hs-detail-tags">
            {activeProject.technologies.map((tech) => (
              <span key={tech} className="project-tag">{tech}</span>
            ))}
          </div>
        )}
      </div>

      {/* Dots */}
      <div className="projects-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`proj-dot${i === active ? ' active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
