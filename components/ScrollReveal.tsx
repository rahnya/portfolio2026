"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "left" | "right" | "fade" | "scale";
interface Props {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  className?: string;
  distance?: number;
  once?: boolean;
  rootMargin?: string;
}

const init = (dir: Direction, d: number) => {
  switch (dir) {
    case "up":    return { y: d, x: 0, scale: 1, opacity: 0 };
    case "left":  return { x: -d, y: 0, scale: 1, opacity: 0 };
    case "right": return { x: d, y: 0, scale: 1, opacity: 0 };
    case "scale": return { x: 0, y: 0, scale: 0.94, opacity: 0 };
    default:      return { x: 0, y: 0, scale: 1, opacity: 0 };
  }
};

export default function ScrollReveal({
  children, delay = 0, duration = 0.7, direction = "up",
  className, distance = 24, once = true, rootMargin = "-60px",
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={init(direction, distance)}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once, margin: rootMargin }}
    >
      {children}
    </motion.div>
  );
}
