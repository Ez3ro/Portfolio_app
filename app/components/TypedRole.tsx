"use client";
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

/*
  Tiny client island — the ONLY interactive bit of the hero.
  Keeping this isolated lets the rest of the page render as a
  server component (static HTML, no client JS).

  Typed.js requires an EMPTY target element, so the SSR fallback
  text lives in a separate <span> that is removed once mounted.
*/
const ROLES = [
  "Full Stack Developer",
  "Backend Engineer",
  "System Integration Engineer",
  "Python & Django Developer",
  "Laravel Developer",
  "API & Integrations Engineer",
  "Cloud & DevOps Engineer",
];

const TypedRole: React.FC = () => {
  const el = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!el.current) return;
    setMounted(true);
    const typed = new Typed(el.current, {
      strings: ROLES,
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1800,
      startDelay: 400,
      cursorChar: "|",
      smartBackspace: false,
      loop: true,
      showCursor: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <span className="code-line code-role" style={{ paddingLeft: "2ch" }}>
      <span className="c-prop">role</span>
      <span className="c-dim">: </span>
      <span className="c-str2">&quot;</span>
      {/* Empty target Typed.js writes into */}
      <span ref={el} className="c-str2" />
      {/* SSR fallback shown only before the animation starts */}
      {!mounted && <span className="c-str2">{ROLES[0]}</span>}
      <span className="c-str2">&quot;</span>
      <span className="c-dim">,</span>
    </span>
  );
};

export default TypedRole;
