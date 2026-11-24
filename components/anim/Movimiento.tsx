"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Respeta la preferencia «reducir movimiento» del sistema.
export default function Movimiento({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
