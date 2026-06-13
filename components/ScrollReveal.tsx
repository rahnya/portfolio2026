"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "left" | "right" | "fade" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  /** Distance en pixels du décalage initial (par défaut 30) */
  distance?: number;
  /** Si true, l'animation se déclenche uniquement à la première vue (par défaut true) */
  once?: boolean;
  /** Marge négative pour déclencher l'animation un peu avant l'arrivée à l'écran */
  rootMargin?: string;
  as?: keyof JSX.IntrinsicElements;
}

const directionMap = (dir: Direction, d: number) => {
  switch (dir) {
    case "up":    return { y: d, x: 0, scale: 1, opacity: 0 };
    case "left":  return { x: -d, y: 0, scale: 1, opacity: 0 };
    case "right": return { x: d, y: 0, scale: 1, opacity: 0 };
    case "scale": return { x: 0, y: 0, scale: 0.94, opacity: 0 };
    default:      return { x: 0, y: 0, scale: 1, opacity: 0 };
  }
};

/**
 * ScrollReveal — wraps any block of content and animates it into view on scroll.
 * Honours `prefers-reduced-motion`: when the user prefers reduced motion, content
 * is shown statically with no movement.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className,
  distance = 30,
  once = true,
  rootMargin = "-60px",
  as = "div",
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"] as typeof motion.div;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionTag
      className={className}
      initial={directionMap(direction, distance)}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth ease-out
      }}
      viewport={{ once, margin: rootMargin }}
    >
      {children}
    </MotionTag>
  );
}
