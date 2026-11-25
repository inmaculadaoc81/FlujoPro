"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/** Transición entre secciones: cada una entra subiendo y creciendo al ritmo del scroll. */
export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const quieto = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.55"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const y = useTransform(p, [0, 1], [90, 0]);
  const scale = useTransform(p, [0, 1], [0.94, 1]);
  const opacity = useTransform(p, [0, 0.75], [0.15, 1]);
  return (
    <section id={id} ref={ref} className={`relative px-4 ${className}`}>
      <motion.div style={quieto ? undefined : { y, scale, opacity }}>{children}</motion.div>
    </section>
  );
}
