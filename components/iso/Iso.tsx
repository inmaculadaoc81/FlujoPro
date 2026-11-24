// Ilustraciones isométricas (SVG) del diseño oscuro de FlujoPro.
// Todo se dibuja con una proyección isométrica sencilla: P(x, y, z) -> pantalla.
import type { ReactNode } from "react";

const C = 0.866;
const S = 0.5;
type P = [number, number];
const pts = (a: P[]) => a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
const proj = (cx: number, cy: number) => (x: number, y: number, z = 0): P => [cx + (x - y) * C, cy + (x + y) * S - z];
const planeM = (tx: number, ty: number) => `matrix(${C} ${S} ${-C} ${S} ${tx} ${ty})`; // suelo
const wallM = (tx: number, ty: number) => `matrix(${-C} ${S} 0 -1 ${tx} ${ty})`; // pared (plano x = cte)

/* ───────── degradados ───────── */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-teal-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6ef2c6" /><stop offset="1" stopColor="#2f93f0" /></linearGradient>
      <linearGradient id={`${id}-teal-left`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#23a9c9" /><stop offset="1" stopColor="#1458b8" /></linearGradient>
      <linearGradient id={`${id}-teal-right`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2cc9a2" /><stop offset="1" stopColor="#1c6ec6" /></linearGradient>
      <linearGradient id={`${id}-dark-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#262a2e" /><stop offset="1" stopColor="#101214" /></linearGradient>
      <linearGradient id={`${id}-dark-left`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#14171a" /><stop offset="1" stopColor="#0a0b0d" /></linearGradient>
      <linearGradient id={`${id}-dark-right`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1b1f22" /><stop offset="1" stopColor="#0c0e10" /></linearGradient>
      <linearGradient id={`${id}-glass-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".16" /><stop offset="1" stopColor="#5eead4" stopOpacity=".05" /></linearGradient>
      <linearGradient id={`${id}-glass-left`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".1" /><stop offset="1" stopColor="#ffffff" stopOpacity=".02" /></linearGradient>
      <linearGradient id={`${id}-glass-right`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".12" /><stop offset="1" stopColor="#ffffff" stopOpacity=".02" /></linearGradient>
      <linearGradient id={`${id}-blue-top`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3ab0ff" /><stop offset="1" stopColor="#1676f0" /></linearGradient>
      <linearGradient id={`${id}-blue-left`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a8fe0" /><stop offset="1" stopColor="#154fa8" /></linearGradient>
      <linearGradient id={`${id}-blue-right`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2f9cf0" /><stop offset="1" stopColor="#1a5bc0" /></linearGradient>
      <linearGradient id={`${id}-beam`} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#5eead4" stopOpacity=".42" /><stop offset="1" stopColor="#5eead4" stopOpacity="0" /></linearGradient>
      <linearGradient id={`${id}-card`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6ef2c6" stopOpacity=".95" /><stop offset="1" stopColor="#2a86e8" stopOpacity=".85" /></linearGradient>
      <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14" /></filter>
      <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" /></filter>
    </defs>
  );
}

type Tone = "teal" | "dark" | "glass" | "blue";

/* ───────── caja isométrica ───────── */
function Slab({ id, cx, cy, w, d, h, tone = "teal", opacity = 1, children, edge }: {
  id: string; cx: number; cy: number; w: number; d: number; h: number; tone?: Tone; opacity?: number; children?: ReactNode; edge?: string;
}) {
  const p = proj(cx, cy);
  const top = [p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)];
  const left = [p(0, d, 0), p(w, d, 0), p(w, d, h), p(0, d, h)];
  const right = [p(w, 0, 0), p(w, d, 0), p(w, d, h), p(w, 0, h)];
  const [tx, ty] = p(w / 2, d / 2, h);
  const stroke = edge ?? (tone === "dark" ? "rgba(94,234,212,.30)" : tone === "glass" ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.30)");
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
function Leds({ cx, cy, w, d, n = 6 }: { cx: number; cy: number; w: number; d: number; n?: number }) {
  const p = proj(cx, cy);
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const [x, y] = p(10 + (i * (w - 20)) / (n - 1), d, 7);
        return <circle key={i} cx={x} cy={y} r="1.7" fill="#5eead4" opacity={i % 2 ? 0.55 : 0.95} />;
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
      <polygon points="395,0 605,0 690,225 310,225" fill={`url(#${id}-beam)`} />
      {/* líneas de conexión */}
      <g fill="none" stroke="rgba(94,234,212,.55)" strokeWidth="1">
        <polyline points="150,470 300,470 372,428 262,360 345,300" />
        <polyline points="640,262 730,300 880,335 700,455 560,432" />
        <polyline points="610,205 700,160 905,262" />
      </g>
      {/* piezas pequeñas */}
      <Slab id={id} cx={235} cy={375} w={110} d={110} h={26} tone="dark">
        <circle r="32" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" /><g transform="scale(.7)"><GDoc c="#9aa3a6" /></g>
      </Slab>
      <Leds cx={235} cy={375} w={110} d={110} />
      <Slab id={id} cx={800} cy={215} w={110} d={110} h={26} tone="dark">
        <circle r="32" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)" /><g transform="scale(.7)"><GClock c="#9aa3a6" /></g>
      </Slab>
      <Leds cx={800} cy={215} w={110} d={110} />
      <Slab id={id} cx={925} cy={395} w={110} d={110} h={24} tone="dark" opacity={0.45}><circle r="30" fill="none" stroke="rgba(255,255,255,.15)" /></Slab>
      <Slab id={id} cx={125} cy={440} w={100} d={100} h={22} tone="dark" opacity={0.35}><circle r="28" fill="none" stroke="rgba(255,255,255,.15)" /></Slab>
      {/* pieza central */}
      <Slab id={id} cx={500} cy={180} w={230} d={230} h={70} tone="dark">
        <circle r="92" fill="rgba(94,234,212,.07)" stroke="#5eead4" strokeOpacity=".75" strokeWidth="1.4" />
        <circle r="78" fill="none" stroke="rgba(94,234,212,.25)" />
        <g transform="scale(2.1)" filter={`url(#${id}-soft)`} opacity=".55"><GFlow c="#5eead4" w={3.5} /></g>
        <g transform="scale(2.1)"><GFlow c="#7df7ea" w={3.5} /></g>
      </Slab>
      {/* documento */}
      <g transform={planeM(690, 478)}>
        <rect x="-62" y="-40" width="124" height="80" rx="6" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.22)" />
        <g stroke="rgba(255,255,255,.35)" strokeWidth="5" strokeLinecap="round"><path d="M-40 -16 H40" /><path d="M-40 0 H34" /><path d="M-40 16 H12" /></g>
      </g>
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
      <g stroke="rgba(255,255,255,.1)" fill="none">
        <polyline points="30,200 190,290 350,200" /><polyline points="60,175 190,250 320,175" />
      </g>
      <Slab id={id} cx={190} cy={165} w={130} d={130} h={14} tone="dark" />
      {wall(10, 0.55)}{wall(30, 0.75)}
      <polygon points={pts([p(52, 0, 18), p(52, 110, 18), p(52, 110, 128), p(52, 0, 128)])} fill={`url(#${id}-card)`} stroke="rgba(255,255,255,.35)" />
      <g transform={wallM(gx, gy)}><g transform="scale(1.15)"><GDoc c="#06231f" w={3.2} /></g></g>
    </svg>
  );
}
export function StepArt2() {
  const id = "s2";
  return (
    <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-label="Diseñamos el flujo">
      <Defs id={id} />
      <g fill="none" stroke="rgba(94,234,212,.45)"><polyline points="135,120 190,150 250,118" /><polyline points="135,120 105,138" /></g>
      <g transform={planeM(110, 128)} opacity=".95">
        <rect x="-44" y="-30" width="88" height="60" rx="5" fill="#15181b" stroke="rgba(255,255,255,.18)" />
        <g stroke="rgba(255,255,255,.28)" strokeWidth="4" strokeLinecap="round"><path d="M-28 -12 H28" /><path d="M-28 0 H20" /><path d="M-28 12 H4" /></g>
      </g>
      <g transform={planeM(272, 118)} opacity=".95">
        <rect x="-44" y="-30" width="88" height="60" rx="5" fill="#15181b" stroke="rgba(255,255,255,.18)" />
        <g stroke="rgba(255,255,255,.28)" strokeWidth="4" strokeLinecap="round"><path d="M-28 -12 H28" /><path d="M-28 0 H20" /><path d="M-28 12 H4" /></g>
      </g>
      <Slab id={id} cx={190} cy={168} w={112} d={112} h={16} tone="teal"><g transform="scale(1.1)"><GArrows c="#06231f" /></g></Slab>
    </svg>
  );
}
export function StepArt3() {
  const id = "s3";
  const wire = (cx: number, cy: number, w: number, d: number, h: number) => {
    const p = proj(cx, cy);
    return (
      <g fill="none" stroke="rgba(255,255,255,.28)" strokeDasharray="3 4">
        <polygon points={pts([p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)])} />
        <polyline points={pts([p(0, d, 0), p(w, d, 0), p(w, 0, 0)])} />
        <polyline points={pts([p(0, d, h), p(0, d, 0)])} /><polyline points={pts([p(w, d, h), p(w, d, 0)])} /><polyline points={pts([p(w, 0, h), p(w, 0, 0)])} />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-label="Lo ponemos en marcha">
      <Defs id={id} />
      {wire(100, 195, 90, 90, 60)}{wire(300, 150, 80, 80, 60)}
      <Slab id={id} cx={190} cy={150} w={86} d={86} h={14} tone="dark" opacity={0.7} />
      <Slab id={id} cx={190} cy={118} w={100} d={100} h={16} tone="teal"><g transform="scale(1.15)"><GLink c="#06231f" /></g></Slab>
      <Slab id={id} cx={228} cy={232} w={40} d={40} h={10} tone="dark" opacity={0.6} />
      <Slab id={id} cx={290} cy={214} w={34} d={34} h={9} tone="dark" opacity={0.5} />
    </svg>
  );
}

/* ═════════════ 3. FUNCIONES ═════════════ */
export function FeatArtBig() {
  const id = "fb";
  const p = proj(190, 345);
  const stack = (cx: number, cy: number, glyph: ReactNode) => {
    const q = proj(cx, cy);
    const wall = (x: number, op: number) => <polygon points={pts([q(x, 0, 0), q(x, 64, 0), q(x, 64, 74), q(x, 0, 74)])} fill={`url(#${id}-card)`} opacity={op} stroke="rgba(255,255,255,.25)" />;
    const [gx, gy] = q(26, 32, 37);
    return <g>{wall(0, 0.4)}{wall(13, 0.6)}{wall(26, 0.95)}<g transform={wallM(gx, gy)}>{glyph}</g></g>;
  };
  return (
    <svg viewBox="0 0 380 560" className="h-auto w-full" role="img" aria-label="Flujos que conectan pasos">
      <Defs id={id} />
      <g stroke="rgba(255,255,255,.32)" strokeDasharray="2 4" fill="none">
        <line x1="86" y1="272" x2="86" y2="360" /><line x1="190" y1="170" x2="190" y2="335" /><line x1="296" y1="266" x2="296" y2="370" />
      </g>
      <g fill="#35b8ff"><rect x="242" y="108" width="5" height="5" /><rect x="64" y="176" width="5" height="5" /><rect x="52" y="496" width="5" height="5" /></g>
      {stack(60, 222, <g transform="scale(1.1)"><GDoc c="#06231f" /></g>)}
      {stack(235, 216, <g transform="scale(1.1)"><GClock c="#06231f" /></g>)}
      {[110, 178, 246].map((y, i) => (
        <Slab key={i} id={id} cx={190} cy={y - 28} w={34} d={34} h={34} tone="teal" opacity={0.75 - i * 0.12} />
      ))}
      <Slab id={id} cx={190} cy={345} w={190} d={190} h={20} tone="teal">
        <circle r="64" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.25)" /><g transform="scale(1.5)"><GFlow c="#eafffb" w={3} /></g>
      </Slab>
      
      <circle cx={p(95, 0, 20)[0]} cy={p(95, 0, 20)[1]} r="2.6" fill="#7df7ea" />
    </svg>
  );
}
export function FeatArtLink() {
  const id = "fl";
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Aplicaciones conectadas">
      <Defs id={id} />
      <g fill="none" stroke="rgba(255,255,255,.55)" strokeDasharray="3 4"><path d="M62 150 C 60 50 150 25 195 60" /><path d="M200 58 C 270 20 328 70 320 155" /><path d="M276 100 C 290 140 290 170 288 195" /></g>
      <Slab id={id} cx={190} cy={150} w={116} d={116} h={22} tone="teal">
        {[-30, 0, 30].map((u) => [-30, 0, 30].map((v) => <rect key={`${u}${v}`} x={u - 7} y={v - 7} width="14" height="14" rx="3" fill="rgba(0,40,60,.35)" />))}
      </Slab>
      <Slab id={id} cx={190} cy={60} w={86} d={86} h={14} tone="teal"><g transform="scale(1.05)"><GLink c="#eafffb" /></g></Slab>
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
        <polygon points={pts(poly)} fill={`url(#${id}-card)`} stroke="rgba(255,255,255,.25)" />
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
      {layer(0, 0.35, false)}{layer(20, 0.6, false)}{layer(44, 1, true)}
      {[110, 178].map((y, i) => (
        <g key={y}>
          <rect x="54" y={y - 18} width="36" height="36" rx="10" fill="#3fd2e8" />
          <g transform={`translate(72 ${y}) scale(.5)`}>{i ? <GDoc c="#06231f" /> : <GCheck c="#06231f" />}</g>
          <line x1="102" y1={y} x2="148" y2={y} stroke="rgba(255,255,255,.4)" strokeDasharray="3 4" /><circle cx="150" cy={y} r="3" fill="#aeb4b8" />
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
      <g stroke="rgba(255,255,255,.3)" strokeDasharray="2 4"><line x1="180" y1="30" x2="180" y2="120" /><line x1="295" y1="48" x2="295" y2="140" /><line x1="95" y1="75" x2="95" y2="165" /></g>
      <g transform={planeM(190, 175)}>
        <path d="M-82 -52 Q 0 -112 90 -40 Q 118 24 52 66 Q -16 106 -82 50 Z" fill={`url(#${id}-teal-top)`} stroke="rgba(255,255,255,.35)" />
        <rect x="-34" y="-34" width="68" height="68" rx="3" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.55)" transform="rotate(8)" />
        <g transform="scale(.9) rotate(8)"><GCheck c="#eafffb" w={3} /></g>
      </g>
      <g fill="#7df7ea"><circle cx="95" cy="165" r="3" /><circle cx="295" cy="140" r="3" /><circle cx="180" cy="118" r="3" /></g>
    </svg>
  );
}
export function FeatArtCube() {
  const id = "fc";
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Tú decides">
      <Defs id={id} />
      <g fill="none" stroke="rgba(255,255,255,.3)" strokeDasharray="3 4"><path d="M30 120 Q 90 110 130 140" /><path d="M350 120 Q 290 110 250 140" /><path d="M130 200 L 175 175" /><path d="M250 200 L 205 175" /></g>
      <rect x="130" y="118" width="6" height="6" fill="#35b8ff" opacity="0" /><rect x="96" y="102" width="6" height="6" fill="#35b8ff" /><rect x="296" y="124" width="6" height="6" fill="#35b8ff" />
      <Slab id={id} cx={190} cy={118} w={92} d={92} h={92} tone="teal"><g transform="scale(1.1)"><GCheck c="#eafffb" /></g></Slab>
      <circle cx="132" cy="188" r="3" fill="#7df7ea" /><circle cx="248" cy="196" r="3" fill="#7df7ea" />
    </svg>
  );
}
export function FeatArtBars() {
  const id = "fr";
  const p = proj(190, 122);
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Seguimiento en tiempo real">
      <Defs id={id} />
      <polygon points={pts([p(-10, -10, 0), p(150, -10, 0), p(150, 150, 0), p(-10, 150, 0)])} fill="rgba(94,234,212,.4)" stroke="rgba(255,255,255,.35)" />
      
      {[[20, 90, 34], [48, 62, 56], [76, 34, 82], [104, 6, 124]].map(([x, y, h], i) => {
        const px = p(x, y, 0);
        return <Slab key={`b${i}`} id={id} cx={px[0]} cy={px[1]} w={24} d={24} h={h} tone="blue" />;
      })}
      <polyline points="296,60 308,36 320,64 332,30 344,50" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/* ═════════════ 4. POR QUÉ (antes «seguridad») ═════════════ */
export function SecurityArt() {
  const id = "sa";
  return (
    <svg viewBox="0 0 500 430" className="h-auto w-full" role="img" aria-label="Capas del flujo">
      <Defs id={id} />
      <g fill="rgba(255,255,255,.18)">{Array.from({ length: 60 }).map((_, i) => <circle key={i} cx={300 + (i % 10) * 20} cy={30 + Math.floor(i / 10) * 26} r="1.2" opacity={0.2 + ((i * 7) % 10) / 14} />)}</g>
      <Slab id={id} cx={250} cy={225} w={190} d={190} h={8} tone="blue" />
      <ellipse cx="250" cy="395" rx="170" ry="30" fill="rgba(58,176,255,.35)" filter={`url(#${id}-blur)`} />
      <Slab id={id} cx={250} cy={186} w={190} d={190} h={8} tone="glass" opacity={0.9} />
      <g stroke="rgba(255,255,255,.18)" strokeDasharray="2 4"><line x1="156" y1="168" x2="156" y2="248" /><line x1="318" y1="200" x2="318" y2="272" /></g>
      <Slab id={id} cx={190} cy={78} w={82} d={82} h={46} tone="dark" edge="rgba(255,255,255,.2)"><g transform="scale(1.2)"><GClock c="#e5e7eb" w={2.6} /></g></Slab>
      <Slab id={id} cx={335} cy={134} w={74} d={74} h={40} tone="dark" edge="rgba(255,255,255,.2)"><g transform="scale(1.1)"><GLink c="#e5e7eb" w={2.6} /></g></Slab>
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
      <g fill="none" stroke="rgba(94,234,212,.55)" strokeWidth="1">
        <polyline points="205,255 300,210 350,238 430,196" /><polyline points="330,300 450,235 510,270 650,200 700,225" /><polyline points="360,330 470,395 630,310 690,345 730,300" />
      </g>
      <g fill="none" stroke="rgba(255,255,255,.18)"><polyline points="190,260 280,205" /><polyline points="560,360 640,310 690,340" /></g>
      <g transform={planeM(300, 305)}>
        <rect x="-70" y="-46" width="140" height="92" rx="6" fill={`url(#${id}-teal-top)`} stroke="rgba(255,255,255,.4)" />
        <g stroke="rgba(255,255,255,.7)" strokeWidth="8" strokeLinecap="round"><path d="M-44 -18 H44" /><path d="M-44 2 H34" /><path d="M-44 22 H12" /></g>
      </g>
      <Slab id={id} cx={450} cy={190} w={120} d={120} h={22} tone="blue"><circle r="42" fill="rgba(0,40,80,.35)" /><g transform="scale(1.1)"><G c="#e8fffb" /></g></Slab>
      <Slab id={id} cx={375} cy={150} w={52} d={52} h={14} tone="teal"><g transform="scale(.7)"><GCheck c="#eafffb" /></g></Slab>
      <Slab id={id} cx={850} cy={330} w={46} d={46} h={16} tone="teal" />
      {/* barra alta tipo calendario */}
      <Slab id={id} cx={775} cy={190} w={34} d={170} h={150} tone="teal" />
      <g transform={`translate(725 262)`}><circle r="34" fill="url(#uc-teal-right)" stroke="rgba(255,255,255,.4)" /><g transform="scale(.9)"><GCheck c="#06231f" w={3.4} /></g></g>
    </svg>
  );
}

/* ═════════════ 6. INTEGRACIONES (fondo difuminado) ═════════════ */
export function IntegrationsArt() {
  const id = "ia";
  return (
    <svg viewBox="0 0 800 440" className="h-auto w-full" role="img" aria-label="Conexiones entre aplicaciones" style={{ filter: "blur(5px)", opacity: 0.85 }}>
      <Defs id={id} />
      <g stroke="rgba(255,255,255,.2)" strokeDasharray="2 4"><line x1="400" y1="110" x2="400" y2="200" /></g>
      <Slab id={id} cx={400} cy={10} w={120} d={120} h={20} tone="teal"><circle r="40" fill="rgba(255,255,255,.2)" /><g transform="scale(1.1)"><GFlow c="#eafffb" /></g></Slab>
      <Slab id={id} cx={400} cy={170} w={210} d={210} h={10} tone="blue" opacity={0.55} />
      <Slab id={id} cx={400} cy={132} w={210} d={210} h={10} tone="teal" opacity={0.5} />
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
      <g fill="none" stroke="rgba(255,255,255,.32)" strokeDasharray="4 5"><polyline points="10,290 110,232" /><polyline points="360,330 440,270" /></g>
      <rect x="312" y="52" width="9" height="9" fill="#35b8ff" /><rect x="186" y="226" width="9" height="9" fill="#2f8cf0" />
      <Slab id={id} cx={235} cy={196} w={150} d={150} h={8} tone="glass" />
      <Slab id={id} cx={235} cy={140} w={150} d={150} h={8} tone="glass" opacity={0.7} />
      <Slab id={id} cx={235} cy={56} w={104} d={104} h={34} tone="teal"><g transform="scale(1.3)"><GFlow c="#eafffb" /></g></Slab>
    </svg>
  );
}
