"use client";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

/*
  Tiny client island — the ONLY interactive bit of the hero.
  Keeping this isolated lets the rest of the page render as a
  server component (static HTML, no client JS).
  Renders a sensible default role on the server so there's no
  empty flash before hydration.
*/
const TypedRole: React.FC = () => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current) return;
    const typed = new Typed(el.current, {
      strings: ["Full Stack Engineer", "Problem Solver", "Web & App Developer"],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      cursorChar: "|",
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
      {/* Typed.js writes here; default text shows pre-hydration */}
      <span ref={el} className="c-str2">Full Stack Engineer</span>
      <span className="c-str2">&quot;</span>
      <span className="c-dim">,</span>
    </span>
  );
};

export default TypedRole;
