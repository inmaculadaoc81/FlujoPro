"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

type Etiqueta = "div" | "article" | "li" | "section";
const EASE = [0.21, 0.6, 0.35, 1] as const;

/** Aparece al entrar en pantalla: sube y se aclara (o se escala). Una sola vez. */
export function Reveal({
  children, delay = 0, y = 28, x = 0, scale = 1, blur = false, className, as = "div", amount = 0.15,
}: {
  children: ReactNode; delay?: number; y?: number; x?: number; scale?: number; blur?: boolean; className?: string; as?: Etiqueta; amount?: number;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x, scale, ...(blur ? { filter: "blur(8px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={{ once: true, amount, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Se mueve más despacio que el scroll (efecto de profundidad). */
export function Parallax({ children, from = 0, to = -70, className }: { children: ReactNode; from?: number; to?: number; className?: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [from, to]);
  return <motion.div style={{ y }} className={className}>{children}</motion.div>;
}

/** Franja diagonal que se «abre» desde el centro al aparecer. */
export function HatchBand() {
  return (
    <motion.div
      className="fp-hatch"
      initial={{ clipPath: "inset(0 50% 0 50%)", opacity: 0.3 }}
      whileInView={{ clipPath: "inset(0 0% 0 0%)", opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}
