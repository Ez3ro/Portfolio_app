"use client";
import React, { useEffect, useRef, useState } from 'react';
import pythonLogo     from '../../public/images/python.png';
import phpLogo        from '../../public/images/php.png';
import laravelLogo    from '../../public/images/laravel.png';
import nextjsLogo     from '../../public/images/nextjs.png';
import reactLogo      from '../../public/images/react.png';
import tailwindLogo   from '../../public/images/tailwind.png';
import djangoLogo     from '../../public/images/django.png';
import javascriptLogo from '../../public/images/javascript.png';

const logos = [
  { src: pythonLogo.src,     alt: 'Python' },
  { src: djangoLogo.src,     alt: 'Django' },
  { src: phpLogo.src,        alt: 'PHP' },
  { src: laravelLogo.src,    alt: 'Laravel' },
  { src: javascriptLogo.src, alt: 'JavaScript' },
  { src: nextjsLogo.src,     alt: 'Next.js' },
  { src: reactLogo.src,      alt: 'React' },
  { src: tailwindLogo.src,   alt: 'Tailwind' },
];

/*
  JS-driven infinite icon carousel — no CSS marquee.
  A requestAnimationFrame loop advances an offset (px/sec).
  We render the list twice; once the offset passes one
  list-width we subtract that width, so it loops forever
  with zero seam. Width is measured from the live DOM,
  so spacing/gaps never cause drift.
*/
const SPEED = 32; // pixels per second

const StackCarousel: React.FC = () => {
  const trackRef = useRef<HTMLSpanElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // width of a single (un-duplicated) set
    const singleWidth = () => track.scrollWidth / 2;

    const step = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;

      if (!paused) {
        offsetRef.current += SPEED * dt;
        const w = singleWidth();
        if (w > 0 && offsetRef.current >= w) offsetRef.current -= w;
        track.style.transform = `translateX(${-offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [paused]);

  return (
    <span
      className="stack-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="stack-carousel-viewport">
        <span className="stack-carousel-track" ref={trackRef}>
          {[...logos, ...logos].map(({ src, alt }, i) => (
            <img key={i} src={src} alt={alt} className="stack-icon" />
          ))}
        </span>
      </span>
    </span>
  );
};

export default StackCarousel;
