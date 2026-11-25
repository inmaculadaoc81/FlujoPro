"use client";
// Escenas isométricas del resto de la página. Cada una representa el texto de su tarjeta o sección.
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Defs, Slab, planeM, Wire, Packet } from "@/components/iso/Iso";
import { Chip } from "@/components/iso/Steps";

const FONT = "var(--font-inter), system-ui, sans-serif";
type Tono = "teal" | "blue" | "violet" | "amber" | "rose" | "green" | "dark" | "paper" | "glass";
const loop = (duration: number, delay = 0) => ({ duration, delay, repeat: Infinity, ease: "easeInOut" as const });

/* ───────── iconos planos (se dibujan sobre la cara superior) ───────── */
type Icono = "correo" | "hoja" | "contactos" | "chat" | "formulario" | "calendario" | "documento" | "check" | "persona" | "enlace" | "lupa";
function Simbolo({ tipo, c = "#fff" }: { tipo: Icono; c?: string }) {
  const g = { fill: "none", stroke: c, strokeWidth: 3.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (tipo) {
    case "correo": return <g {...g}><rect x="-17" y="-12" width="34" height="24" rx="3" /><path d="M-16 -10 L0 3 L16 -10" /></g>;
    case "hoja": return <g {...g}><rect x="-15" y="-17" width="30" height="34" rx="3" /><path d="M-15 -6 H15 M-15 5 H15 M-3 -17 V17" /></g>;
    case "contactos": return <g {...g}><circle cx="0" cy="-6" r="7" /><path d="M-13 14 C-11 3 11 3 13 14" /></g>;
    case "chat": return <g {...g}><path d="M-17 -13 H17 V9 H-2 L-11 17 V9 H-17 Z" /><path d="M-8 -2 H8" /></g>;
    case "formulario": return <g {...g}><rect x="-15" y="-17" width="30" height="34" rx="3" /><path d="M-8 -8 H8 M-8 0 H8 M-8 9 H0" /></g>;
    case "calendario": return <g {...g}><rect x="-16" y="-14" width="32" height="30" rx="3" /><path d="M-16 -4 H16 M-8 -19 V-10 M8 -19 V-10" /><path d="M-6 7 L-1 11 L7 3" /></g>;
    case "documento": return <g {...g}><path d="M-13 -17 H6 L14 -9 V17 H-13 Z" /><path d="M-6 2 L-1 8 L8 -3" /></g>;
    case "check": return <g {...g} strokeWidth={4.5}><path d="M-12 1 L-3 10 L13 -9" /></g>;
    case "persona": return <g {...g}><circle cx="0" cy="-7" r="8" /><path d="M-15 15 C-13 2 13 2 15 15" /></g>;
    case "enlace": return <g {...g}><rect x="-20" y="-7" width="24" height="14" rx="7" /><rect x="-4" y="-7" width="24" height="14" rx="7" /></g>;
    case "lupa": return <g {...g}><circle cx="-3" cy="-3" r="11" /><path d="M6 6 L15 15" /></g>;
  }
}

/** Ficha isométrica colocada por el centro de su cara superior (x, y). */
function Ficha({ id, x, y, s, h, tono, icono, escala = 1, color }: { id: string; x: number; y: number; s: number; h: number; tono: Tono; icono?: Icono; escala?: number; color?: string }) {
  return (
    <Slab id={id} cx={x} cy={y - s / 2 + h} w={s} d={s} h={h} tone={tono}>
      {icono ? <g transform={`scale(${escala})${["persona", "contactos", "lupa", "check", "documento"].includes(icono) ? " rotate(-45)" : ""}`}><Simbolo tipo={icono} c={color ?? (tono === "paper" ? "#334155" : tono === "amber" ? "#451a03" : "#fff")} /></g> : null}
    </Slab>
  );
}
const Flota = ({ children, dy = 6, dur = 5, delay = 0 }: { children: ReactNode; dy?: number; dur?: number; delay?: number }) => (
  <motion.g animate={{ y: [0, -dy, 0] }} transition={loop(dur, delay)}>{children}</motion.g>
);
const ruta = (...p: [number, number][]) => "M" + p.map((q) => q.join(",")).join(" L");

/* ═════════ PORTADA: lo que entra → FlujoPro → lo que sale hecho ═════════ */
export function HeroScene() {
  const id = "hs";
  const hub: [number, number] = [500, 262];
  const entradas = [
    { x: 190, y: 160, t: "rose" as Tono, i: "correo" as Icono, n: "Correo", c: "#e11d48" },
    { x: 130, y: 320, t: "violet" as Tono, i: "formulario" as Icono, n: "Formulario", c: "#7c3aed" },
    { x: 270, y: 448, t: "teal" as Tono, i: "chat" as Icono, n: "WhatsApp", c: "#0d9488" },
  ];
  const salidas = [
    { x: 810, y: 160, t: "green" as Tono, i: "hoja" as Icono, n: "Hoja actualizada", c: "#16a34a" },
    { x: 872, y: 320, t: "amber" as Tono, i: "calendario" as Icono, n: "Cita agendada", c: "#d97706" },
    { x: 730, y: 448, t: "blue" as Tono, i: "documento" as Icono, n: "Documento listo", c: "#2563eb" },
  ];
  return (
    <svg viewBox="0 0 1000 560" className="h-auto w-full" role="img" aria-label="Correos, formularios y mensajes entran en FlujoPro y salen convertidos en tareas hechas">
      <Defs id={id} />
      <motion.polygon points="420,20 580,20 640,250 360,250" fill={`url(#${id}-beam)`} animate={{ opacity: [0.45, 0.9, 0.45] }} transition={loop(4)} />
      {entradas.map((e, k) => { const d = ruta([e.x, e.y], [e.x + 95, e.y], hub); return (
        <g key={e.n}><Wire d={d} color={`${e.c}99`} w={2} /><Packet d={d} dur={3.4} delay={k * 0.9} color={e.c} /></g>
      ); })}
      {salidas.map((s, k) => { const d = ruta(hub, [s.x - 95, s.y], [s.x, s.y]); return (
        <g key={s.n}><Wire d={d} color={`${s.c}99`} w={2} /><Packet d={d} dur={3.4} delay={1.7 + k * 0.9} color={s.c} /></g>
      ); })}
      <Flota dy={5} dur={7}>
        <Slab id={id} cx={hub[0]} cy={hub[1] - 95 + 56} w={190} d={190} h={56} tone="dark">
          <motion.circle r="76" fill="rgba(94,234,212,.08)" stroke="#5eead4" strokeWidth="1.6" animate={{ strokeOpacity: [0.35, 1, 0.35] }} transition={loop(3)} />
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            {Array.from({ length: 12 }).map((_, k) => <rect key={k} x="-5" y="-60" width="10" height="13" rx="3" fill="#5eead4" opacity=".8" transform={`rotate(${k * 30})`} />)}
            <circle r="46" fill="none" stroke="#5eead4" strokeWidth="9" />
          </motion.g>
          <g transform="scale(1.35)" fill="none" stroke="#a7fff0" strokeWidth="4.5" strokeLinecap="round">
            <circle cx="-12" cy="-9" r="6" /><circle cx="12" cy="9" r="6" /><path d="M-6 -9 H3 a9 9 0 0 1 9 9 V3" />
          </g>
        </Slab>
      </Flota>
      <Chip x={500} y={430} w={150} dot="#14b8a6">FlujoPro trabaja</Chip>
      {[...entradas, ...salidas].map((e, k) => (
        <g key={e.n}>
          <Flota dy={6} dur={5 + (k % 3)} delay={k * 0.35}><Ficha id={id} x={e.x} y={e.y} s={96} h={18} tono={e.t} icono={e.i} escala={1.25} /></Flota>
          <Chip x={e.x} y={e.y + 78} w={e.n.length * 7.4 + 34} dot={e.c}>{e.n}</Chip>
        </g>
      ))}
    </svg>
  );
}

/* ═════════ Automatización de flujos: una tarea recorre cuatro estaciones ═════════ */
export function SceneWorkflow() {
  const id = "sw";
  const est: { x: number; y: number; t: Tono; i: Icono; n: string; c: string }[] = [
    { x: 105, y: 80, t: "violet", i: "formulario", n: "Llega la tarea", c: "#7c3aed" },
    { x: 268, y: 202, t: "blue", i: "persona", n: "Se asigna", c: "#2563eb" },
    { x: 105, y: 324, t: "amber", i: "lupa", n: "Se revisa", c: "#d97706" },
    { x: 268, y: 446, t: "green", i: "check", n: "Terminada", c: "#16a34a" },
  ];
  const D = 8;
  const llegada = [0, 0.27, 0.54, 0.81];
  return (
    <svg viewBox="0 0 380 540" className="h-auto w-full" role="img" aria-label="Una tarea llega, se asigna, se revisa y queda terminada">
      <Defs id={id} />
      {est.slice(1).map((e, k) => <Wire key={k} d={ruta([est[k].x, est[k].y], [e.x, e.y])} color="rgba(100,116,139,.75)" w={2.5} dash="6 7" />)}
      {est.map((e, k) => (
        <g key={e.n}>
          <motion.g animate={{ y: [0, 0, -12, 0, 0] }} transition={{ duration: D, times: [0, Math.max(llegada[k] - 0.001, 0.0005), llegada[k] + 0.05, llegada[k] + 0.12, 1], repeat: Infinity }}>
            <Ficha id={id} x={e.x} y={e.y} s={104} h={18} tono={e.t} icono={e.i} escala={1.3} />
          </motion.g>
          <Chip x={k % 2 ? e.x - 150 : e.x + 150} y={e.y + 14} w={e.n.length * 7.4 + 34} dot={e.c}>{e.n}</Chip>
        </g>
      ))}
      <motion.g
        animate={{ x: [est[0].x, est[0].x, est[1].x, est[1].x, est[2].x, est[2].x, est[3].x, est[3].x], y: [est[0].y, est[0].y, est[1].y, est[1].y, est[2].y, est[2].y, est[3].y, est[3].y], opacity: [0, 1, 1, 1, 1, 1, 1, 0] }}
        transition={{ duration: D, times: [0, 0.1, 0.27, 0.37, 0.54, 0.64, 0.81, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(0 -48)">
          <rect x="-17" y="-21" width="34" height="42" rx="6" fill="#fff" stroke="#0f172a" strokeWidth="2.5" style={{ filter: "drop-shadow(0 8px 10px rgba(15,23,42,.25))" }} />
          <path d="M-8 -8 H8 M-8 1 H8 M-8 10 H2" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
        </g>
      </motion.g>
    </svg>
  );
}

/* ═════════ Integración de aplicaciones: cuatro apps que intercambian datos ═════════ */
export function SceneApps() {
  const id = "sap";
  const apps: { x: number; y: number; t: Tono; i: Icono; n: string; c: string; ly: number }[] = [
    { x: 66, y: 78, t: "rose", i: "correo", n: "Correo", c: "#e11d48", ly: 26 },
    { x: 314, y: 78, t: "green", i: "hoja", n: "Hojas", c: "#16a34a", ly: 26 },
    { x: 66, y: 190, t: "blue", i: "contactos", n: "CRM", c: "#2563eb", ly: 250 },
    { x: 314, y: 190, t: "teal", i: "chat", n: "Chat", c: "#0d9488", ly: 250 },
  ];
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Correo, hojas, CRM y chat comparten información">
      <Defs id={id} />
      {apps.map((a, k) => { const d = ruta([a.x, a.y], [190, 135]); return (
        <g key={a.n}><Wire d={d} color={`${a.c}aa`} w={2.2} /><Packet d={d} dur={2.4} delay={k * 0.6} color={a.c} /><Packet d={ruta([190, 135], [a.x, a.y])} dur={2.4} delay={1.2 + k * 0.6} color="#7c3aed" /></g>
      ); })}
      <Flota dy={7} dur={4.5}><Ficha id={id} x={190} y={124} s={86} h={30} tono="violet" icono="enlace" escala={1.2} /></Flota>
      {apps.map((a, k) => (
        <g key={a.n}><Flota dy={4} dur={4 + k * 0.5} delay={k * 0.3}><Ficha id={id} x={a.x} y={a.y} s={62} h={12} tono={a.t} icono={a.i} escala={0.9} /></Flota><Chip x={a.x} y={a.ly} w={a.n.length * 8 + 30}>{a.n}</Chip></g>
      ))}
    </svg>
  );
}

/* ═════════ Documentos y formularios: se rellena y sale el documento ═════════ */
export function SceneDocs() {
  const id = "sd";
  const D = 6;
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="El formulario se rellena solo una vez y genera el documento">
      <Defs id={id} />
      <Slab id={id} cx={101} cy={140 - 51 + 12} w={106} d={98} h={12} tone="dark">
        <rect x="-43" y="-40" width="86" height="80" rx="6" fill="#fff" />
        {[-26, -4, 18].map((v, k) => (
          <g key={v}>
            <rect x="-33" y={v - 2} width="66" height="15" rx="4" fill="#e8edf3" />
            <motion.rect x="-29" y={v + 2} height="7" rx="3" fill={["#7c3aed", "#2563eb", "#f59e0b"][k]} animate={{ width: [0, 0, [52, 34, 44][k], [52, 34, 44][k], 0] }} transition={{ duration: D, times: [0, 0.06 + k * 0.12, 0.17 + k * 0.12, 0.94, 1], repeat: Infinity }} />
          </g>
        ))}
      </Slab>
      <Wire d="M170,148 L232,148" color="rgba(100,116,139,.8)" w={2.4} />
      <motion.path d="M222 139 l13 9 l-13 9" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [-8, 4, -8] }} transition={loop(1.4)} />
      <Ficha id={id} x={284} y={176} s={94} h={9} tono="paper" />
      <Ficha id={id} x={284} y={163} s={94} h={9} tono="paper" />
      <motion.g animate={{ x: [-90, -90, 0, 0, 0], y: [-6, -6, 0, 0, 0], opacity: [0, 0, 1, 1, 0] }} transition={{ duration: D, times: [0, 0.46, 0.6, 0.94, 1], repeat: Infinity }}>
        <Slab id={id} cx={284} cy={150 - 47 + 9} w={94} d={94} h={9} tone="paper">
          <rect x="-31" y="-31" width="36" height="9" rx="3" fill="#0f172a" />
          {[-14, 0, 14, 28].map((v, k) => <motion.rect key={v} x="-31" y={v - 2} height="6" rx="3" fill={k ? "#94a3b8" : "#7c3aed"} animate={{ width: [0, 0, [62, 54, 66, 40][k], [62, 54, 66, 40][k], 0] }} transition={{ duration: D, times: [0, 0.6 + k * 0.05, 0.68 + k * 0.05, 0.94, 1], repeat: Infinity }} />)}
        </Slab>
      </motion.g>
      <Chip x={96} y={240} w={104} dot="#7c3aed">Formulario</Chip>
      <motion.g animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 8] }} transition={{ duration: D, times: [0, 0.78, 0.84, 0.94, 1], repeat: Infinity }}>
        <Chip x={284} y={246} w={108} dot="#16a34a">PDF listo</Chip>
      </motion.g>
    </svg>
  );
}

/* ═════════ Aprobaciones: el sello cae y deja «APROBADO» ═════════ */
export function SceneApproval() {
  const id = "sap2";
  const D = 4.6;
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="Un sello aprueba el documento">
      <Defs id={id} />
      <Slab id={id} cx={190} cy={166 - 82 + 10} w={164} d={164} h={10} tone="paper">
        <g fill="#cbd5e1"><rect x="-66" y="-66" width="70" height="10" rx="5" fill="#334155" /><rect x="-66" y="-42" width="120" height="7" rx="3.5" /><rect x="-66" y="-26" width="104" height="7" rx="3.5" /><rect x="-66" y="-10" width="116" height="7" rx="3.5" /></g>
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0], scale: [1.35, 1.35, 1, 1, 1] }} transition={{ duration: D, times: [0, 0.36, 0.42, 0.94, 1], repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <rect x="-48" y="18" width="108" height="36" rx="8" fill="rgba(22,163,74,.12)" stroke="#16a34a" strokeWidth="4" />
          <text x="6" y="42" textAnchor="middle" fontSize="17" fontWeight="800" fill="#15803d" fontFamily={FONT}>APROBADO</text>
        </motion.g>
      </Slab>
      {/* sello */}
      <motion.g animate={{ x: [44, 4, 4, 60, 44], y: [-62, 6, 6, -76, -62], opacity: [1, 1, 1, 1, 1] }} transition={{ duration: D, times: [0, 0.34, 0.42, 0.62, 1], repeat: Infinity, ease: "easeInOut" }}>
        <Ficha id={id} x={196} y={168} s={62} h={20} tono="rose" />
        <rect x="186" y="116" width="20" height="46" rx="6" fill="#92400e" />
        <ellipse cx="196" cy="112" rx="24" ry="16" fill="#b45309" /><ellipse cx="196" cy="108" rx="16" ry="8" fill="#d97706" />
      </motion.g>
      <Chip x={76} y={42} w={108} dot="#16a34a">Sin esperas</Chip>
    </svg>
  );
}

/* ═════════ Flujos adaptados: la pieza que falta encaja ═════════ */
function pieza(x: number, y: number, bordes: [number, number, number, number]) {
  const s = 66, r = 12;
  const lado = (x1: number, y1: number, x2: number, y2: number, t: number) => {
    if (!t) return `L${x2} ${y2}`;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, ux = (x2 - x1) / s, uy = (y2 - y1) / s;
    return `L${mx - ux * r} ${my - uy * r} A${r} ${r} 0 1 ${t > 0 ? 1 : 0} ${mx + ux * r} ${my + uy * r} L${x2} ${y2}`;
  };
  return `M${x} ${y} ${lado(x, y, x + s, y, bordes[0])} ${lado(x + s, y, x + s, y + s, bordes[1])} ${lado(x + s, y + s, x, y + s, bordes[2])} ${lado(x, y + s, x, y, bordes[3])} Z`;
}
export function ScenePuzzle() {
  const D = 5;
  const Pieza = ({ d, arriba, lado }: { d: string; arriba: string; lado: string }) => (
    <g>
      {Array.from({ length: 9 }).map((_, k) => <g key={k} transform={`translate(0 ${16 - k * 1.8})`}><g transform={planeM(190, 132)}><path d={d} fill={lado} /></g></g>)}
      <g transform={planeM(190, 132)}><path d={d} fill={arriba} stroke="#fff" strokeOpacity=".8" strokeWidth="1.6" /></g>
    </g>
  );
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="La pieza que falta encaja en tu forma de trabajar">
      <Pieza d={pieza(-66, -66, [0, 1, 1, 0])} arriba="#60a5fa" lado="#1d4ed8" />
      <Pieza d={pieza(0, -66, [0, 0, 1, -1])} arriba="#a78bfa" lado="#5b21b6" />
      <Pieza d={pieza(-66, 0, [-1, 1, 0, 0])} arriba="#2dd4bf" lado="#0f766e" />
      <g transform={planeM(190, 132)}><path d={pieza(0, 0, [-1, 0, 0, -1])} fill="rgba(245,158,11,.1)" stroke="#d97706" strokeWidth="2" strokeDasharray="6 6" className="fp-dashflow" /></g>
      <motion.g animate={{ x: [34, 34, 0, 0, 34], y: [-70, -70, 0, 0, -70], opacity: [0, 1, 1, 1, 0] }} transition={{ duration: D, times: [0, 0.18, 0.46, 0.92, 1], repeat: Infinity, ease: "easeInOut" }}>
        <Pieza d={pieza(0, 0, [-1, 0, 0, -1])} arriba="#fbbf24" lado="#b45309" />
      </motion.g>
      <motion.ellipse cx="190" cy="182" rx="40" ry="22" fill="none" stroke="#f59e0b" strokeWidth="3" animate={{ opacity: [0, 0, 0.9, 0, 0], scale: [0.6, 0.6, 1, 2.2, 2.2] }} transition={{ duration: D, times: [0, 0.45, 0.48, 0.66, 1], repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      <Chip x={74} y={40} w={102} dot="#2563eb">Tu proceso</Chip>
      <Chip x={296} y={246} w={118} dot="#f59e0b">Hecho a medida</Chip>
    </svg>
  );
}

/* ═════════ Recordatorios y seguimiento: calendario, campana y avances ═════════ */
export function SceneReminders() {
  const id = "sr";
  const D = 6;
  return (
    <svg viewBox="0 0 380 270" className="h-auto w-full" role="img" aria-label="El calendario avisa y se ve el avance de cada tarea">
      <Defs id={id} />
      <Slab id={id} cx={140} cy={166 - 74 + 12} w={148} d={148} h={12} tone="paper">
        <rect x="-65" y="-65" width="130" height="28" rx="5" fill="#e11d48" />
        {Array.from({ length: 20 }).map((_, k) => <rect key={k} x={-63 + (k % 5) * 26} y={-29 + Math.floor(k / 5) * 24} width="20" height="18" rx="4" fill={k === 12 ? "#fda4af" : "#e8edf3"} />)}
        <motion.rect x="-11" y="19" width="20" height="18" rx="4" fill="none" stroke="#e11d48" strokeWidth="4" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.35, 1] }} transition={loop(1.3)} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </Slab>
      {[0, 0.5].map((d) => <motion.circle key={d} cx="288" cy="76" r="34" fill="none" stroke="#f59e0b" strokeWidth="2.5" animate={{ scale: [0.8, 1.8], opacity: [0.8, 0] }} transition={{ duration: 1.6, delay: d, repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />)}
      <circle cx="288" cy="76" r="34" fill="#fffbeb" stroke="#fcd34d" strokeWidth="3" style={{ filter: "drop-shadow(0 10px 12px rgba(180,83,9,.2))" }} />
      <motion.g animate={{ rotate: [0, -17, 17, -12, 12, 0, 0] }} transition={{ duration: 2, times: [0, 0.08, 0.16, 0.24, 0.32, 0.4, 1], repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}>
        <path d="M274 84 V74 a14 14 0 0 1 28 0 V84 Z M282 90 a6 6 0 0 0 12 0 M288 60 V56" fill="none" stroke="#b45309" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x="244" y={138 + k * 36} width="112" height="28" rx="9" fill="#fff" stroke="#e2e8f0" style={{ filter: "drop-shadow(0 6px 8px rgba(15,23,42,.1))" }} />
          <rect x="274" y={148 + k * 36} width={[66, 52, 60][k]} height="8" rx="4" fill="#cbd5e1" />
          <circle cx="259" cy={152 + k * 36} r="8" fill="#e2e8f0" />
          <motion.g animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: D, times: [0, 0.2 + k * 0.2, 0.26 + k * 0.2, 0.94, 1], repeat: Infinity }}>
            <circle cx="259" cy={152 + k * 36} r="8.5" fill="#16a34a" /><path d={`M255 ${152 + k * 36} l3 3 l6 -7`} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </g>
      ))}
      <Chip x={82} y={40} w={92} dot="#e11d48">Plazo</Chip>
    </svg>
  );
}

/* ═════════ ¿Por qué FlujoPro?: tiempo recuperado, trabajo conectado y menos errores ═════════ */
export function SceneWhy() {
  const id = "sy";
  return (
    <svg viewBox="0 0 500 462" className="h-auto w-full" role="img" aria-label="Recuperas tiempo, conectas el trabajo y reduces errores">
      <Defs id={id} />
      <Ficha id={id} x={250} y={338} s={190} h={14} tono="glass" />
      <Ficha id={id} x={250} y={320} s={150} h={20} tono="dark" />
      {/* reloj de arena: el tiempo que se recupera */}
      <g>
        <ellipse cx="250" cy="318" rx="66" ry="20" fill="#5b21b6" /><ellipse cx="250" cy="310" rx="66" ry="20" fill="#8b5cf6" />
        <path d="M196 118 C196 168 240 188 243 214 C240 240 196 260 196 308 H304 C304 260 260 240 257 214 C260 188 304 168 304 118 Z" fill="rgba(186,230,253,.45)" stroke="#38bdf8" strokeWidth="2.5" />
        <motion.path d="M207 142 H293 C286 172 260 188 250 208 C240 188 214 172 207 142 Z" fill="#fbbf24" animate={{ scaleY: [1, 0.12, 1], opacity: [1, 0.9, 1] }} transition={{ duration: 6, times: [0, 0.92, 1], repeat: Infinity, ease: "linear" }} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} />
        <path d="M250 208 V292" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="5 6" className="fp-dashflow" />
        <motion.path d="M204 307 C214 276 236 262 250 260 C264 262 286 276 296 307 Z" fill="#f59e0b" animate={{ scaleY: [0.12, 1, 0.12] }} transition={{ duration: 6, times: [0, 0.92, 1], repeat: Infinity, ease: "linear" }} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} />
        <ellipse cx="250" cy="116" rx="66" ry="20" fill="#5b21b6" /><ellipse cx="250" cy="108" rx="66" ry="20" fill="#a78bfa" />
      </g>
      {/* trabajo conectado */}
      <Flota dy={10} dur={5.4}><Ficha id={id} x={96} y={196} s={86} h={22} tono="blue" icono="enlace" escala={1.15} /></Flota>
      <Wire d="M96,196 L196,214" color="rgba(37,99,235,.7)" w={2.2} />
      <Packet d="M96,196 L196,214" dur={2.2} color="#2563eb" />
      {/* menos errores */}
      <Flota dy={9} dur={6} delay={0.8}>
        <path d="M404 130 l44 16 v32 c0 30 -20 48 -44 58 c-24 -10 -44 -28 -44 -58 v-32 Z" fill="#22c55e" stroke="#fff" strokeWidth="3" style={{ filter: "drop-shadow(0 14px 14px rgba(21,128,61,.35))" }} />
        <path d="M386 178 l13 14 l25 -28" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </Flota>
      <Wire d="M362,180 L304,200" color="rgba(22,163,74,.7)" w={2.2} />
      <Chip x={250} y={52} w={150} dot="#7c3aed">Recuperas tiempo</Chip>
      <Chip x={96} y={284} w={156} dot="#2563eb">Conectas el trabajo</Chip>
      <Chip x={406} y={272} w={142} dot="#16a34a">Reduces errores</Chip>
    </svg>
  );
}

/* ═════════ Integraciones: todas tus herramientas alrededor de un mismo flujo ═════════ */
export function SceneIntegrations() {
  const id = "sin";
  const centro: [number, number] = [400, 212];
  const apps: { x: number; y: number; t: Tono; i: Icono; n: string; c: string }[] = [
    { x: 130, y: 118, t: "rose", i: "correo", n: "Correo", c: "#e11d48" },
    { x: 400, y: 50, t: "blue", i: "contactos", n: "CRM", c: "#2563eb" },
    { x: 670, y: 118, t: "teal", i: "chat", n: "WhatsApp", c: "#0d9488" },
    { x: 670, y: 312, t: "amber", i: "calendario", n: "Calendario", c: "#d97706" },
    { x: 400, y: 370, t: "paper", i: "formulario", n: "Formularios", c: "#64748b" },
    { x: 130, y: 312, t: "green", i: "hoja", n: "Hojas de cálculo", c: "#16a34a" },
  ];
  return (
    <svg viewBox="0 0 800 450" className="h-auto w-full" role="img" aria-label="Correo, CRM, WhatsApp, calendario, formularios y hojas de cálculo conectados en un mismo flujo">
      <Defs id={id} />
      <ellipse cx="400" cy="212" rx="292" ry="164" fill="none" stroke="rgba(100,116,139,.35)" strokeDasharray="4 7" className="fp-dashflow" />
      {apps.map((a, k) => { const d = ruta([a.x, a.y], centro); return (
        <g key={a.n}><Wire d={d} color={`${a.c}99`} w={2} /><Packet d={d} dur={3} delay={k * 0.5} color={a.c} /><Packet d={ruta(centro, [a.x, a.y])} dur={3} delay={1.5 + k * 0.5} color="#7c3aed" /></g>
      ); })}
      <Flota dy={8} dur={5}>
        <Slab id={id} cx={400} cy={204 - 66 + 36} w={132} d={132} h={36} tone="violet">
          <motion.circle r="48" fill="rgba(255,255,255,.16)" stroke="#fff" strokeWidth="1.5" animate={{ r: [44, 54, 44] }} transition={loop(2.6)} />
          <g transform="scale(1.5)" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round"><circle cx="-12" cy="-9" r="6" /><circle cx="12" cy="9" r="6" /><path d="M-6 -9 H3 a9 9 0 0 1 9 9 V3" /></g>
        </Slab>
      </Flota>
      {apps.map((a, k) => (
        <g key={a.n}>
          <Flota dy={5} dur={4.4 + (k % 3)} delay={k * 0.3}><Ficha id={id} x={a.x} y={a.y} s={82} h={15} tono={a.t} icono={a.i} escala={1.1} /></Flota>
          <Chip x={a.x} y={k === 1 ? 118 : a.y + 66} w={a.n.length * 7.4 + 34} dot={a.c}>{a.n}</Chip>
        </g>
      ))}
    </svg>
  );
}

/* ═════════ Llamada final: tu flujo despega ═════════ */
export function SceneLaunch() {
  const id = "sl";
  return (
    <svg viewBox="0 0 440 398" className="h-auto w-full" role="img" aria-label="Tu flujo se pone en marcha">
      <Defs id={id} />
      <Ficha id={id} x={220} y={296} s={170} h={10} tono="glass" />
      <Ficha id={id} x={220} y={278} s={116} h={18} tono="dark" />
      {/* humo */}
      {[[176, 274, 0], [262, 276, 0.4], [210, 290, 0.8], [240, 266, 1.2]].map(([x, y, d]) => (
        <motion.circle key={d} cx={x} cy={y} r="17" fill="#cbd5e1" animate={{ scale: [0.4, 1.5], opacity: [0.85, 0], x: [0, (x - 220) * 0.8], y: [0, 14] }} transition={{ duration: 1.7, delay: d, repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      ))}
      <motion.g animate={{ y: [0, -26, 0] }} transition={loop(3.6)}>
        <motion.path d="M205 220 C206 248 214 262 220 280 C226 262 234 248 235 220 Z" fill="#f59e0b" animate={{ scaleY: [0.8, 1.25, 0.9, 1.15, 0.8] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }} />
        <motion.path d="M212 220 C213 238 217 246 220 256 C223 246 227 238 228 220 Z" fill="#fde68a" animate={{ scaleY: [1.2, 0.8, 1.25, 0.9, 1.2] }} transition={{ duration: 0.45, repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }} />
        <path d="M192 170 L164 224 L194 208 Z" fill="#e11d48" /><path d="M248 170 L276 224 L246 208 Z" fill="#be123c" />
        <path d="M220 58 C256 88 258 150 246 216 H194 C182 150 184 88 220 58 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" style={{ filter: "drop-shadow(0 16px 16px rgba(15,23,42,.2))" }} />
        <path d="M220 58 C236 72 245 87 249 106 H191 C195 87 204 72 220 58 Z" fill="#7c3aed" />
        <circle cx="220" cy="136" r="19" fill="#38bdf8" stroke="#4c1d95" strokeWidth="6" />
        <rect x="203" y="214" width="34" height="9" rx="3" fill="#475569" />
      </motion.g>
      {[{ x: 92, y: 130, d: 0 }, { x: 352, y: 176, d: 1.2 }, { x: 104, y: 232, d: 2.4 }].map((b) => (
        <motion.g key={b.d} animate={{ y: [14, -22], opacity: [0, 1, 1, 0] }} transition={{ duration: 3.6, delay: b.d, repeat: Infinity }}>
          <circle cx={b.x} cy={b.y} r="17" fill="#16a34a" /><path d={`M${b.x - 8} ${b.y} l6 6 l11 -12`} fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      ))}
      <Chip x={344} y={72} w={116} dot="#16a34a">En marcha</Chip>
    </svg>
  );
}
