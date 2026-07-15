"use client";
import React, { useEffect, useRef, useState } from "react";

/** Curseur custom subtil — desktop only (auto-off en pointer coarse) */
export default function CursorLite() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on fine-pointer devices (desktop)
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;
    // Respect reduced motion
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    setEnabled(true);
    const cursor = cursorRef.current;
    if (!cursor) return;

    let raf = 0;
    let mx = 0, my = 0, cx = 0, cy = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const down = () => cursor.classList.add("click");
    const up = () => cursor.classList.remove("click");
    const enter = () => cursor.classList.add("visible");
    const leave = () => cursor.classList.remove("visible");

    const tick = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    // Hover state for links / buttons
    const targetSelector = "a, button, [role='button'], [role='tab'], input, textarea, [data-cursor='hover']";
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(targetSelector)) cursor.classList.add("hover");
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(targetSelector)) cursor.classList.remove("hover");
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    raf = requestAnimationFrame(tick);
    // Show cursor after first move
    const showOnce = () => { cursor.classList.add("visible"); document.removeEventListener("mousemove", showOnce); };
    document.addEventListener("mousemove", showOnce, { once: true });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
