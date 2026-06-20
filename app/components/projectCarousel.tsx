"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies?: string[];
  link?: string;
}

const ProjectsCarousel: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [idx, setIdx]       = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const prev = useCallback(() => setIdx(i => (i === 0 ? projects.length - 1 : i - 1)), [projects.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % projects.length),                [projects.length]);

  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [mounted, next]);

  if (!mounted) return null;

  return (
    <div>
      {/* Header row */}
      <div className="carousel-header">
        <div>
          <p className="section-eyebrow">Projects</p>
          <h2 className="section-title">
            What I&apos;ve <span className="dim">shipped</span>
          </h2>
        </div>
        <div className="carousel-nav">
          <button className="carousel-btn" onClick={prev} aria-label="Previous project">
            <FiChevronLeft size={16} />
          </button>
          <span className="carousel-counter mono">
            {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button className="carousel-btn" onClick={next} aria-label="Next project">
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="glow-card" style={{ '--glow-r': '10px' } as React.CSSProperties}>
        <div className="carousel-viewport">
          {projects.map((project, i) => {
            const offset = i - idx;
            return (
              <div
                key={project.id}
                className="carousel-slide"
                style={{
                  transform: `translateX(${offset * 100}%)`,
                  opacity: offset === 0 ? 1 : 0,
                  pointerEvents: offset === 0 ? 'auto' : 'none',
                }}
              >
                <div className="slide-img">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      img.parentElement?.classList.add('slide-img-fallback');
                      img.parentElement?.setAttribute('data-title', project.title);
                    }}
                  />
                </div>

                <div className="slide-info">
                  <div>
                    <h3 className="slide-title">{project.title}</h3>
                    <p className="slide-desc">{project.description}</p>

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="slide-stack">
                        <p className="stack-label">Stack</p>
                        <div className="stack-tags">
                          {project.technologies.map(tech => (
                            <span key={tech} className="stack-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="slide-link"
                    >
                      View live <FiExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === idx ? ' active' : ''}`}
            style={{ width: i === idx ? 24 : 8 }}
            onClick={() => setIdx(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
