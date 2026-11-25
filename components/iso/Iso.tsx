"use client";
// Ilustraciones isométricas (SVG) del diseño oscuro de FlujoPro, animadas con framer-motion.
// Todo se dibuja con una proyección isométrica sencilla: P(x, y, z) -> pantalla.
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const C = 0.866;
export const S = 0.5;
type P = [number, number];
export const pts = (a: P[]) => a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
export const proj = (cx: number, cy: number) => (x: number, y: number, z = 0): P => [cx + (x - y) * C, cy + (x + y) * S - z];
export const planeM = (tx: number, ty: number) => `matrix(${C} ${S} ${-C} ${S} ${tx} ${ty})`; // suelo
const wallM = (tx: number, ty: number) => `matrix(${-C} ${S} 0 -1 ${tx} ${ty})`; // pared (plano x = cte)

/* ───────── degradados ───────── */
const TONES: Record<string, [string, string, string, string, string, string]> = {
  // [cara superior 1, 2, lado izquierdo 1, 2, lado derecho 1, 2]
  teal: ["#d3dfb4", "#869c55", "#a1b673", "#5c7036", "#95ab64", "#6b8042"],
  blue: ["#b7ae96", "#676049", "#827a60", "#403a2a", "#756d54", "#4f4833"],
  violet: ["#fdbb78", "#e8531d", "#fb8a3c", "#9a3412", "#f5701f", "#c2440f"],
  amber: ["#fdeab4", "#e2a63a", "#efc05a", "#a5711b", "#e9b54e", "#bb8324"],
  rose: ["#fbbcae", "#dc513c", "#ee7c66", "#a3301f", "#e96b54", "#bd3e2a"],
  green: ["#c2e0a6", "#5f9843", "#80b461", "#3f6c2a", "#72a753", "#4d7f35"],
  paper: ["#ffffff", "#f6f2e8", "#e4ddcb", "#cfc6ae", "#ece6d6", "#dcd3bd"],
  plano: ["#fffdf7", "#f5ecd8", "#e8dcc0", "#d5c49e", "#efe5cd", "#decfab"],
};
export function Defs({ id }: { id: string }) {
  return (
    <defs>
      {Object.entries(TONES).map(([k, c]) => (
        <g key={k}>
          <linearGradient id={`${id}-${k}-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c[0]} /><stop offset="1" stopColor={c[1]} /></linearGradient>
          <linearGradient id={`${id}-${k}-left`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c[2]} /><stop offset="1" stopColor={c[3]} /></linearGradient>
          <linearGradient id={`${id}-${k}-right`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c[4]} /><stop offset="1" stopColor={c[5]} /></linearGradient>
          <linearGradient id={`${id}-card-${k}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c[0]} stopOpacity=".95" /><stop offset="1" stopColor={c[1]} stopOpacity=".85" /></linearGradient>
        </g>
      ))}
      <linearGradient id={`${id}-card`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6ef2c6" stopOpacity=".95" /><stop offset="1" stopColor="#2a86e8" stopOpacity=".85" /></linearGradient>
      <linearGradient id={`${id}-dark-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#443e2d" /><stop offset="1" stopColor="#221f15" /></linearGradient>
      <linearGradient id={`${id}-dark-left`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c281b" /><stop offset="1" stopColor="#17150e" /></linearGradient>
      <linearGradient id={`${id}-dark-right`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#363123" /><stop offset="1" stopColor="#1d1a11" /></linearGradient>
      <linearGradient id={`${id}-glass-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a8a08a" stopOpacity=".34" /><stop offset="1" stopColor="#fbbf6b" stopOpacity=".12" /></linearGradient>
      <linearGradient id={`${id}-glass-left`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a8a08a" stopOpacity=".26" /><stop offset="1" stopColor="#a8a08a" stopOpacity=".08" /></linearGradient>
      <linearGradient id={`${id}-glass-right`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a8a08a" stopOpacity=".3" /><stop offset="1" stopColor="#a8a08a" stopOpacity=".08" /></linearGradient>
      <linearGradient id={`${id}-beam`} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#f59e3b" stopOpacity=".38" /><stop offset="1" stopColor="#f59e3b" stopOpacity="0" /></linearGradient>
      <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14" /></filter>
      <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" /></filter>
    </defs>
  );
}


/* ───────── animaciones ───────── */
// Flota arriba y abajo.
function Float({ children, dy = 8, dur = 6, delay = 0 }: { children: ReactNode; dy?: number; dur?: number; delay?: number }) {
  return (
    <motion.g animate={{ y: [0, -dy, 0] }} transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.g>
  );
}
// Respira (cambia de opacidad).
function Glow({ children, from = 0.5, dur = 3, delay = 0 }: { children: ReactNode; from?: number; dur?: number; delay?: number }) {
  return (
    <motion.g animate={{ opacity: [from, 1, from] }} transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.g>
  );
}
const polyD = (s: string) => "M" + s.trim().split(/\s+/).join(" L");
// Línea de puntos por la que «circula» el flujo.
export function Wire({ d, color = "rgba(251,191,107,.55)", dash = "4 7", w = 1, speed = 1.6 }: { d: string; color?: string; dash?: string; w?: number; speed?: number }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} className="fp-dashflow" style={{ animationDuration: `${speed}s` }} />;
}
// Punto luminoso que recorre una línea.
export function Packet({ d, dur = 4, delay = 0, color = "#ffd9a0" }: { d: string; dur?: number; delay?: number; color?: string }) {
  return (
    <g>
      <circle r="6" fill={color} opacity=".25"><animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} /></circle>
      <circle r="2.6" fill={color}><animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} /></circle>
    </g>
  );
}

type Tone = "teal" | "dark" | "glass" | "blue" | "violet" | "amber" | "rose" | "green" | "paper" | "plano";

/* ───────── caja isométrica ───────── */
export function Slab({ id, cx, cy, w, d, h, tone = "teal", opacity = 1, children, edge }: {
  id: string; cx: number; cy: number; w: number; d: number; h: number; tone?: Tone; opacity?: number; children?: ReactNode; edge?: string;
}) {
  const p = proj(cx, cy);
  const top = [p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)];
  const left = [p(0, d, 0), p(w, d, 0), p(w, d, h), p(0, d, h)];
  const right = [p(w, 0, 0), p(w, d, 0), p(w, d, h), p(w, 0, h)];
  const [tx, ty] = p(w / 2, d / 2, h);
  const stroke = edge ?? (tone === "paper" ? "rgba(130,118,88,.55)" : tone === "dark" ? "rgba(251,191,107,.30)" : tone === "glass" ? "rgba(130,118,88,.55)" : "rgba(255,255,255,.45)");
  return (
    <g opacity={opacity}>
      <polygon points={pts(left)} fill={`url(#${id}-${tone}-left)`} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      <polygon points={pts(right)} fill={`url(#${id}-${tone}-right)`} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      <polygon points={pts(top)} fill={`url(#${id}-${tone}-top)`} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      {children ? <g transform={planeM(tx, ty)}>{children}</g> : null}
    </g>
  );
}

/* ───────── símbolos planos (se dibujan sobre la cara de una pieza) ───────── */
const ST = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;
function GFlow({ c = "#eafffb", w = 3 }: { c?: string; w?: number }) {
  return (
    <g {...ST} stroke={c} strokeWidth={w}>
      <circle cx="-15" cy="-11" r="7" /><circle cx="15" cy="11" r="7" />
      <path d="M-8 -11 H 4 a 9 9 0 0 1 9 9 V 3" />
    </g>
  );
}
function GDoc({ c = "#eafffb", w = 3 }: { c?: string; w?: number }) {
  return (
    <g {...ST} stroke={c} strokeWidth={w}>
      <rect x="-14" y="-18" width="28" height="36" rx="4" /><path d="M-7 -6 H7 M-7 1 H7 M-7 8 H2" />
    </g>
  );
}
function GLink({ c = "#eafffb", w = 3 }: { c?: string; w?: number }) {
  return (
    <g {...ST} stroke={c} strokeWidth={w}>
      <rect x="-20" y="-7" width="24" height="14" rx="7" /><rect x="-4" y="-7" width="24" height="14" rx="7" />
    </g>
  );
}
function GArrows({ c = "#eafffb", w = 3 }: { c?: string; w?: number }) {
  return (
    <g {...ST} stroke={c} strokeWidth={w}>
      <path d="M-16 -6 H10 M4 -13 L11 -6 L4 1" /><path d="M16 8 H-10 M-4 1 L-11 8 L-4 15" />
    </g>
  );
}
function GCheck({ c = "#eafffb", w = 3 }: { c?: string; w?: number }) {
  return (
    <g {...ST} stroke={c} strokeWidth={w}>
      <circle cx="0" cy="0" r="17" /><path d="M-8 1 L-2 7 L9 -6" />
    </g>
  );
}
function GClock({ c = "#eafffb", w = 3 }: { c?: string; w?: number }) {
  return (
    <g {...ST} stroke={c} strokeWidth={w}>
      <circle cx="0" cy="0" r="17" /><path d="M0 -9 V0 L7 5" />
    </g>
  );
}
function GBell({ c = "#eafffb", w = 3 }: { c?: string; w?: number }) {
  return (
    <g {...ST} stroke={c} strokeWidth={w}>
      <path d="M-12 8 V-2 a12 12 0 0 1 24 0 V8 Z M-4 14 a4 4 0 0 0 8 0" />
    </g>
  );
}

/* ───────── pieza de menor tamaño con LEDs ───────── */
function Leds({ cx, cy, w, d, n = 6, c = "#fbbf6b" }: { cx: number; cy: number; w: number; d: number; n?: number; c?: string }) {
  const p = proj(cx, cy);
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const [x, y] = p(10 + (i * (w - 20)) / (n - 1), d, 7);
        return <motion.circle key={i} cx={x} cy={y} r="1.7" fill={c} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.6, delay: i * 0.22, repeat: Infinity, ease: "easeInOut" }} />;
      })}
    </g>
  );
}

/* ═════════════ 1. PORTADA ═════════════ */
export function HeroArt() {
  const id = "ha";
  return (
    <svg viewBox="0 0 1000 560" className="h-auto w-full" role="img" aria-label="Flujos de trabajo conectados">
      <Defs id={id} />
      {/* rayo de luz */}
      <Glow from={0.55} dur={4}><polygon points="395,0 605,0 690,225 310,225" fill={`url(#${id}-beam)`} /></Glow>
      {/* líneas de conexión */}
      <Wire d={polyD("150,470 300,470 372,428 262,360 345,300")} color="rgba(245,158,11,.75)" />
      <Wire d={polyD("640,262 730,300 880,335 700,455 560,432")} color="rgba(139,92,246,.7)" />
      <Wire d={polyD("610,205 700,160 905,262")} color="rgba(134,156,85,.7)" />
      <Packet d={polyD("150,470 300,470 372,428 262,360 345,300")} dur={5} color="#f59e0b" />
      <Packet d={polyD("640,262 730,300 880,335 700,455 560,432")} dur={6} delay={1.5} color="#f97316" />
      <Packet d={polyD("610,205 700,160 905,262")} dur={4} delay={0.8} />
      {/* piezas pequeñas */}
      <Float dy={7} dur={6} delay={0.4}><Slab id={id} cx={235} cy={375} w={110} d={110} h={26} tone="dark">
        <circle r="32" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" /><g transform="scale(.7)"><GDoc c="#9aa3a6" /></g>
      </Slab>
      <Leds cx={235} cy={375} w={110} d={110} c="#f59e0b" /></Float>
      <Float dy={6} dur={7} delay={0.9}><Slab id={id} cx={800} cy={215} w={110} d={110} h={26} tone="dark">
        <circle r="32" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" /><g transform="scale(.7)"><GClock c="#9aa3a6" /></g>
      </Slab>
      <Leds cx={800} cy={215} w={110} d={110} c="#fdba74" /></Float>
      <Float dy={5} dur={8} delay={1.4}><Slab id={id} cx={925} cy={395} w={110} d={110} h={24} tone="dark" opacity={0.45}><circle r="30" fill="none" stroke="rgba(255,255,255,.15)" /></Slab></Float>
      <Float dy={5} dur={7.5} delay={0.2}><Slab id={id} cx={125} cy={440} w={100} d={100} h={22} tone="dark" opacity={0.35}><circle r="28" fill="none" stroke="rgba(255,255,255,.15)" /></Slab></Float>
      {/* pieza central */}
      <Float dy={5} dur={7}><Slab id={id} cx={500} cy={180} w={230} d={230} h={70} tone="dark">
        <motion.circle r="92" fill="rgba(251,191,107,.07)" stroke="#fbbf6b" strokeWidth="1.4" animate={{ strokeOpacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <circle r="78" fill="none" stroke="rgba(251,191,107,.25)" />
        <g transform="scale(2.1)" filter={`url(#${id}-soft)`} opacity=".55"><GFlow c="#fbbf6b" w={3.5} /></g>
        <g transform="scale(2.1)"><GFlow c="#ffd9a0" w={3.5} /></g>
      </Slab></Float>
      {/* documento */}
      <Float dy={6} dur={6.5} delay={1.2}><g transform={planeM(690, 478)}>
        <rect x="-62" y="-40" width="124" height="80" rx="6" fill="#ffffff" stroke="rgba(110,100,74,.4)" />
        <g strokeWidth="5" strokeLinecap="round"><path d="M-40 -16 H40" stroke="#f59e3b" /><path d="M-40 0 H34" stroke="rgba(110,100,74,.4)" /><path d="M-40 16 H12" stroke="rgba(110,100,74,.4)" /></g>
      </g></Float>
    </svg>
  );
}

/* ═════════════ 2. PASOS ═════════════ */
export function StepArt1() {
  const id = "s1";
  const p = proj(190, 165);
  const wall = (x: number, op: number) => (
    <polygon points={pts([p(x, 0, 18), p(x, 110, 18), p(x, 110, 128), p(x, 0, 128)])} fill={`url(#${id}-card)`} opacity={op} stroke="rgba(255,255,255,.3)" />
  );
  const [gx, gy] = p(58, 55, 78);
  return (
    <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-label="Entendemos tu proceso">
      <Defs id={id} />
      <g stroke="rgba(110,100,74,.28)" fill="none">
        <polyline points="30,200 190,290 350,200" /><polyline points="60,175 190,250 320,175" />
      </g>
      <Slab id={id} cx={190} cy={165} w={130} d={130} h={14} tone="dark" />
      <Float dy={5} dur={5} delay={0.6}>{wall(10, 0.55)}</Float><Float dy={7} dur={5.4} delay={0.3}>{wall(30, 0.75)}</Float>
      <Float dy={9} dur={5.8}><polygon points={pts([p(52, 0, 18), p(52, 110, 18), p(52, 110, 128), p(52, 0, 128)])} fill={`url(#${id}-card)`} stroke="rgba(255,255,255,.35)" />
      <g transform={wallM(gx, gy)}><g transform="scale(1.15)"><GDoc c="#06231f" w={3.2} /></g></g></Float>
    </svg>
  );
}
export function StepArt2() {
  const id = "s2";
  return (
    <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-label="Diseñamos el flujo">
      <Defs id={id} />
      <Wire d={polyD("135,120 190,150 250,118")} color="rgba(232,89,29,.65)" />
      <Wire d={polyD("135,120 105,138")} color="rgba(232,89,29,.65)" />
      <Packet d={polyD("105,138 135,120 190,150 250,118")} dur={3.6} color="#e8591d" />
      <Float dy={5} dur={5.2} delay={0.2}><g transform={planeM(110, 128)} opacity=".95">
        <rect x="-44" y="-30" width="88" height="60" rx="5" fill="#15181b" stroke="rgba(255,255,255,.18)" />
        <g stroke="rgba(255,255,255,.28)" strokeWidth="4" strokeLinecap="round"><path d="M-28 -12 H28" /><path d="M-28 0 H20" /><path d="M-28 12 H4" /></g>
      </g></Float>
      <Float dy={5} dur={6} delay={1}><g transform={planeM(272, 118)} opacity=".95">
        <rect x="-44" y="-30" width="88" height="60" rx="5" fill="#15181b" stroke="rgba(255,255,255,.18)" />
        <g stroke="rgba(255,255,255,.28)" strokeWidth="4" strokeLinecap="round"><path d="M-28 -12 H28" /><path d="M-28 0 H20" /><path d="M-28 12 H4" /></g>
      </g></Float>
      <Float dy={8} dur={5.5}><Slab id={id} cx={190} cy={168} w={112} d={112} h={16} tone="violet"><g transform="scale(1.1)"><GArrows c="#ffffff" /></g></Slab></Float>
    </svg>
  );
}
export function StepArt3() {
  const id = "s3";
  const wire = (cx: number, cy: number, w: number, d: number, h: number) => {
    const p = proj(cx, cy);
    return (
      <g fill="none" stroke="rgba(110,100,74,0.60)" strokeDasharray="3 4">
        <polygon points={pts([p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)])} />
        <polyline points={pts([p(0, d, 0), p(w, d, 0), p(w, 0, 0)])} />
        <polyline points={pts([p(0, d, h), p(0, d, 0)])} /><polyline points={pts([p(w, d, h), p(w, d, 0)])} /><polyline points={pts([p(w, 0, h), p(w, 0, 0)])} />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-label="Lo ponemos en marcha">
      <Defs id={id} />
      <Glow from={0.35} dur={3.4}>{wire(100, 195, 90, 90, 60)}{wire(300, 150, 80, 80, 60)}</Glow>
      <Slab id={id} cx={190} cy={150} w={86} d={86} h={14} tone="dark" opacity={0.7} />
      <Float dy={10} dur={5}><Slab id={id} cx={190} cy={118} w={100} d={100} h={16} tone="amber"><g transform="scale(1.15)"><GLink c="#4a2a00" /></g></Slab></Float>
      <Float dy={5} dur={6.2} delay={0.5}><Slab id={id} cx={228} cy={232} w={40} d={40} h={10} tone="dark" opacity={0.6} /></Float>
      <Float dy={4} dur={7} delay={1.1}><Slab id={id} cx={290} cy={214} w={34} d={34} h={9} tone="dark" opacity={0.5} /></Float>
    </svg>
  );
}

/* ═════════════ 3. FUNCIONES ═════════════ */
export function FeatArtBig() {
  const id = "fb";
  const p = proj(190, 345);
  const stack = (cx: number, cy: number, glyph: ReactNode, tn: Tone = "teal") => {
    const q = proj(cx, cy);
    const wall = (x: number, op: number) => <polygon points={pts([q(x, 0, 0), q(x, 64, 0), q(x, 64, 74), q(x, 0, 74)])} fill={`url(#${id}-card-${tn})`} opacity={op} stroke="rgba(255,255,255,.25)" />;
    const [gx, gy] = q(26, 32, 37);
    return <g>{wall(0, 0.4)}{wall(13, 0.6)}{wall(26, 0.95)}<g transform={wallM(gx, gy)}>{glyph}</g></g>;
  };
  return (
    <svg viewBox="0 0 380 560" className="h-auto w-full" role="img" aria-label="Flujos que conectan pasos">
      <Defs id={id} />
      <g fill="none" stroke="rgba(110,100,74,0.66)" strokeDasharray="2 5" className="fp-dashflow"><line x1="86" y1="272" x2="86" y2="360" /><line x1="190" y1="170" x2="190" y2="335" /><line x1="296" y1="266" x2="296" y2="370" /></g>
      <Glow from={0.15} dur={2.2}><g fill="#e2a63a"><rect x="242" y="108" width="5" height="5" /><rect x="64" y="176" width="5" height="5" /><rect x="52" y="496" width="5" height="5" /></g></Glow>
      <Float dy={8} dur={6}>{stack(60, 222, <g transform="scale(1.1)"><GDoc c="#4c0519" /></g>, "rose")}</Float>
      <Float dy={9} dur={6.6} delay={1.2}>{stack(235, 216, <g transform="scale(1.1)"><GClock c="#4a2a00" /></g>, "amber")}</Float>
      {[110, 178, 246].map((y, i) => (
        <Float key={i} dy={7} dur={4.6 + i * 0.7} delay={i * 0.5}><Slab id={id} cx={190} cy={y - 28} w={34} d={34} h={34} tone={(["teal", "violet", "green"][i]) as Tone} opacity={0.95 - i * 0.08} /></Float>
      ))}
      <Slab id={id} cx={190} cy={345} w={190} d={190} h={20} tone="blue">
        <motion.circle r="64" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.25)" animate={{ fillOpacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} /><g transform="scale(1.5)"><GFlow c="#eafffb" w={3} /></g>
      </Slab>
      
      <circle cx={p(95, 0, 20)[0]} cy={p(95, 0, 20)[1]} r="2.6" fill="#ffd9a0" />
    </svg>
  );
}
export function FeatArtLink() {
  const id = "fl";
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Aplicaciones conectadas">
      <Defs id={id} />
      <g fill="none" stroke="rgba(110,100,74,0.85)" strokeDasharray="3 5" className="fp-dashflow"><path d="M62 150 C 60 50 150 25 195 60" /><path d="M200 58 C 270 20 328 70 320 155" /><path d="M276 100 C 290 140 290 170 288 195" /></g>
      <Slab id={id} cx={190} cy={150} w={116} d={116} h={22} tone="blue">
        {[-30, 0, 30].map((u) => [-30, 0, 30].map((v) => <rect key={`${u}${v}`} x={u - 7} y={v - 7} width="14" height="14" rx="3" fill="rgba(0,40,60,.35)" />))}
      </Slab>
      <Float dy={9} dur={5}><Slab id={id} cx={190} cy={60} w={86} d={86} h={14} tone="violet"><g transform="scale(1.05)"><GLink c="#ffffff" /></g></Slab></Float>
    </svg>
  );
}
export function FeatArtMemory() {
  const id = "fm";
  const layer = (z: number, op: number, bars: boolean) => {
    const p = proj(235, 128);
    const poly = [p(0, 0, z), p(120, 0, z), p(120, 150, z), p(0, 150, z)];
    return (
      <g opacity={op}>
        <polygon points={pts(poly)} fill={`url(#${id}-card-amber)`} stroke="rgba(255,255,255,.45)" />
        {bars ? (
          <g stroke="rgba(255,255,255,.75)" strokeWidth="9" strokeLinecap="round">
            {[30, 60, 90, 120].map((v, i) => { const a = p(18, v - 8 + i * 0, z), b = p(98 - i * 8, v - 8, z); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />; })}
          </g>
        ) : null}
      </g>
    );
  };
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Todo queda registrado">
      <Defs id={id} />
      <Float dy={3} dur={5}>{layer(0, 0.35, false)}</Float><Float dy={6} dur={5} delay={0.25}>{layer(20, 0.6, false)}</Float><Float dy={10} dur={5} delay={0.5}>{layer(44, 1, true)}</Float>
      {[110, 178].map((y, i) => (
        <g key={y}>
          <rect x="54" y={y - 18} width="36" height="36" rx="10" fill={i ? "#fb7185" : "#10b981"} />
          <g transform={`translate(72 ${y}) scale(.5)`}>{i ? <GDoc c="#06231f" /> : <GCheck c="#06231f" />}</g>
          <line x1="102" y1={y} x2="148" y2={y} stroke="rgba(110,100,74,0.80)" strokeDasharray="3 5" className="fp-dashflow" /><circle cx="150" cy={y} r="3" fill="#aeb4b8" />
        </g>
      ))}
    </svg>
  );
}
export function FeatArtShield() {
  const id = "fs";
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Pasos controlados">
      <Defs id={id} />
      <g stroke="rgba(110,100,74,0.63)" strokeDasharray="2 5" className="fp-dashflow"><line x1="180" y1="30" x2="180" y2="120" /><line x1="295" y1="48" x2="295" y2="140" /><line x1="95" y1="75" x2="95" y2="165" /></g>
      <Float dy={8} dur={5.5}><g transform={planeM(190, 175)}>
        <path d="M-82 -52 Q 0 -112 90 -40 Q 118 24 52 66 Q -16 106 -82 50 Z" fill={`url(#${id}-green-top)`} stroke="rgba(255,255,255,.5)" />
        <rect x="-34" y="-34" width="68" height="68" rx="3" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.55)" transform="rotate(8)" />
        <g transform="scale(.9) rotate(8)"><GCheck c="#eafffb" w={3} /></g>
      </g></Float>
      <Glow from={0.2} dur={2}><g fill="#ffd9a0"><circle cx="95" cy="165" r="3" /><circle cx="295" cy="140" r="3" /><circle cx="180" cy="118" r="3" /></g></Glow>
    </svg>
  );
}
export function FeatArtCube() {
  const id = "fc";
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Tú decides">
      <Defs id={id} />
      <g fill="none" stroke="rgba(110,100,74,0.63)" strokeDasharray="3 5" className="fp-dashflow"><path d="M30 120 Q 90 110 130 140" /><path d="M350 120 Q 290 110 250 140" /><path d="M130 200 L 175 175" /><path d="M250 200 L 205 175" /></g>
      <rect x="130" y="118" width="6" height="6" fill="#e2a63a" opacity="0" /><rect x="96" y="102" width="6" height="6" fill="#e2a63a" /><rect x="296" y="124" width="6" height="6" fill="#e2a63a" />
      <Float dy={8} dur={5.5}><Slab id={id} cx={190} cy={118} w={92} d={92} h={92} tone="rose"><g transform="scale(1.1)"><GCheck c="#eafffb" /></g></Slab></Float>
      <Glow from={0.2} dur={2}><circle cx="132" cy="188" r="3" fill="#ffd9a0" /><circle cx="248" cy="196" r="3" fill="#ffd9a0" /></Glow>
    </svg>
  );
}
export function FeatArtBars() {
  const id = "fr";
  const p = proj(190, 122);
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Seguimiento en tiempo real">
      <Defs id={id} />
      <Glow from={0.7} dur={3}><polygon points={pts([p(-10, -10, 0), p(150, -10, 0), p(150, 150, 0), p(-10, 150, 0)])} fill="rgba(234,88,12,.16)" stroke="rgba(110,100,74,.4)" /></Glow>
      
      {[[20, 90, 34], [48, 62, 56], [76, 34, 82], [104, 6, 124]].map(([x, y, h], i) => {
        const px = p(x, y, 0);
        return (
          <motion.g key={`b${i}`} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} animate={{ scaleY: [0.55, 1, 0.55] }} transition={{ duration: 3.4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}>
            <Slab id={id} cx={px[0]} cy={px[1]} w={24} d={24} h={h} tone={(["violet", "blue", "teal", "green"][i]) as Tone} />
          </motion.g>
        );
      })}
      <polyline points="296,60 308,36 320,64 332,30 344,50" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" strokeDasharray="5 4" className="fp-dashflow" />
    </svg>
  );
}

/* ═════════════ 4. POR QUÉ (antes «seguridad») ═════════════ */
export function SecurityArt() {
  const id = "sa";
  return (
    <svg viewBox="0 0 500 430" className="h-auto w-full" role="img" aria-label="Capas del flujo">
      <Defs id={id} />
      <g fill="rgba(110,100,74,.3)">{Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={300 + (i % 10) * 20} cy={30 + Math.floor(i / 10) * 26} r="1.2" opacity={0.2 + ((i * 7) % 10) / 14} />)}</g>
      <Slab id={id} cx={250} cy={225} w={190} d={190} h={8} tone="blue" />
      <Glow from={0.4} dur={3.4}><ellipse cx="250" cy="395" rx="170" ry="30" fill="rgba(232,89,29,.32)" filter={`url(#${id}-blur)`} /></Glow>
      <Float dy={4} dur={5}><Slab id={id} cx={250} cy={186} w={190} d={190} h={8} tone="glass" opacity={0.9} /></Float>
      <g stroke="rgba(110,100,74,0.43)" strokeDasharray="2 5" className="fp-dashflow"><line x1="156" y1="168" x2="156" y2="248" /><line x1="318" y1="200" x2="318" y2="272" /></g>
      <Float dy={10} dur={5.5}><Slab id={id} cx={190} cy={78} w={82} d={82} h={46} tone="dark" edge="rgba(255,255,255,.2)"><g transform="scale(1.2)"><GClock c="#e5e7eb" w={2.6} /></g></Slab></Float>
      <Float dy={8} dur={6.4} delay={1}><Slab id={id} cx={335} cy={134} w={74} d={74} h={40} tone="dark" edge="rgba(255,255,255,.2)"><g transform="scale(1.1)"><GLink c="#e5e7eb" w={2.6} /></g></Slab></Float>
    </svg>
  );
}

/* ═════════════ 5. CASOS DE USO ═════════════ */
export function UseCaseArt({ glyph = "flow" }: { glyph?: "flow" | "doc" | "bell" }) {
  const id = "uc";
  const G = glyph === "doc" ? GDoc : glyph === "bell" ? GBell : GFlow;
  return (
    <svg viewBox="0 0 900 440" className="h-auto w-full" role="img" aria-label="Ejemplo de flujo">
      <Defs id={id} />
      <Wire d={polyD("205,255 300,210 350,238 430,196")} />
      <Wire d={polyD("330,300 450,235 510,270 650,200 700,225")} />
      <Wire d={polyD("360,330 470,395 630,310 690,345 730,300")} />
      <Packet d={polyD("205,255 300,210 350,238 430,196")} dur={4.5} />
      <Packet d={polyD("330,300 450,235 510,270 650,200 700,225")} dur={6} delay={1.2} />
      <Packet d={polyD("360,330 470,395 630,310 690,345 730,300")} dur={5.5} delay={0.6} />
      <g fill="none" stroke="rgba(110,100,74,0.43)"><polyline points="190,260 280,205" /><polyline points="560,360 640,310 690,340" /></g>
      <Float dy={9} dur={6}><g transform={planeM(300, 305)}>
        <rect x="-70" y="-46" width="140" height="92" rx="6" fill={`url(#${id}-teal-top)`} stroke="rgba(255,255,255,.4)" />
        <g stroke="rgba(255,255,255,.7)" strokeWidth="8" strokeLinecap="round"><path d="M-44 -18 H44" /><path d="M-44 2 H34" /><path d="M-44 22 H12" /></g>
      </g></Float>
      <Float dy={6} dur={5}><Slab id={id} cx={450} cy={190} w={120} d={120} h={22} tone="blue"><circle r="42" fill="rgba(0,40,80,.35)" /><g transform="scale(1.1)"><G c="#e8fffb" /></g></Slab></Float>
      <Float dy={10} dur={4.4} delay={0.6}><Slab id={id} cx={375} cy={150} w={52} d={52} h={14} tone="teal"><g transform="scale(.7)"><GCheck c="#eafffb" /></g></Slab></Float>
      <Float dy={8} dur={5.6} delay={1.4}><Slab id={id} cx={850} cy={330} w={46} d={46} h={16} tone="teal" /></Float>
      {/* barra alta tipo calendario */}
      <Float dy={7} dur={5.8} delay={0.3}>
        <Slab id={id} cx={775} cy={190} w={34} d={170} h={150} tone="teal" />
        <g transform={`translate(725 262)`}><circle r="34" fill="url(#uc-teal-right)" stroke="rgba(255,255,255,.4)" /><g transform="scale(.9)"><GCheck c="#06231f" w={3.4} /></g></g>
      </Float>
    </svg>
  );
}

/* ═════════════ 6. INTEGRACIONES (fondo difuminado) ═════════════ */
export function IntegrationsArt() {
  const id = "ia";
  return (
    <svg viewBox="0 0 800 440" className="h-auto w-full" role="img" aria-label="Conexiones entre aplicaciones" style={{ filter: "blur(5px)", opacity: 0.85 }}>
      <Defs id={id} />
      <g stroke="rgba(110,100,74,0.46)" strokeDasharray="2 5" className="fp-dashflow"><line x1="400" y1="110" x2="400" y2="200" /></g>
      <Float dy={12} dur={5.5}><Slab id={id} cx={400} cy={10} w={120} d={120} h={20} tone="violet"><circle r="40" fill="rgba(255,255,255,.25)" /><g transform="scale(1.1)"><GFlow c="#ffffff" /></g></Slab></Float>
      <Slab id={id} cx={400} cy={170} w={210} d={210} h={10} tone="blue" opacity={0.55} />
      <Float dy={5} dur={6}><Slab id={id} cx={400} cy={132} w={210} d={210} h={10} tone="teal" opacity={0.5} /></Float>
      <Slab id={id} cx={160} cy={250} w={70} d={70} h={14} tone="dark" opacity={0.7} />
      <Slab id={id} cx={640} cy={270} w={70} d={70} h={14} tone="dark" opacity={0.7} />
    </svg>
  );
}

/* ═════════════ 7. LLAMADA FINAL ═════════════ */
export function CtaArt() {
  const id = "ct";
  return (
    <svg viewBox="0 0 440 360" className="h-auto w-full" role="img" aria-label="Pon en marcha tu flujo">
      <Defs id={id} />
      <g fill="none" stroke="rgba(110,100,74,0.66)" strokeDasharray="4 6" className="fp-dashflow"><polyline points="10,290 110,232" /><polyline points="360,330 440,270" /></g>
      <rect x="312" y="52" width="9" height="9" fill="#e2a63a" /><rect x="186" y="226" width="9" height="9" fill="#2f8cf0" />
      <Slab id={id} cx={235} cy={196} w={150} d={150} h={8} tone="glass" />
      <Float dy={4} dur={5}><Slab id={id} cx={235} cy={140} w={150} d={150} h={8} tone="glass" opacity={0.7} /></Float>
      <Float dy={11} dur={5.2}><Slab id={id} cx={235} cy={56} w={104} d={104} h={34} tone="violet"><g transform="scale(1.3)"><GFlow c="#ffffff" /></g></Slab></Float>
    </svg>
  );
}
