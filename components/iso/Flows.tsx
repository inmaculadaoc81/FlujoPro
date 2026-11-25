"use client";
// «Casos de uso» en 3D isométrico: tres plataformas por historia. La que está trabajando se eleva y se ilumina,
// y una pieza viaja de una a otra. Abajo se marca el paso en curso.
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Defs, Slab, planeM, Wire } from "@/components/iso/Iso";

const FONT = "var(--font-inter), system-ui, sans-serif";
const DUR = 9; // segundos por vuelta
const X = [150, 450, 750];
const Y = 238; // centro de la cara superior de las plataformas
const FASES: [number, number][] = [[0.02, 0.32], [0.36, 0.64], [0.68, 0.96]];

const vuelta = (times: number[]) => ({ duration: DUR, times, repeat: Infinity, ease: "easeInOut" as const });
/** Visible solo entre a y b. */
const Ventana = ({ a, b, children }: { a: number; b: number; children: ReactNode }) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0, 0] }} transition={vuelta([0, a, a + 0.02, b, Math.min(b + 0.02, 0.995), 1])}>{children}</motion.g>
);
/** Aparece en `a` y se queda hasta el final de la vuelta. */
const Desde = ({ a, children }: { a: number; children: ReactNode }) => <Ventana a={a} b={0.965}>{children}</Ventana>;

function Texto({ x, y, children, size = 15, weight = 700, color = "#2a2618" }: { x: number; y: number; children: ReactNode; size?: number; weight?: number; color?: string }) {
  return <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={weight} fill={color} fontFamily={FONT}>{children}</text>;
}

/** Plataforma de un paso: se eleva y proyecta luz cuando le toca. */
function Plataforma({ id, i, luz, children }: { id: string; i: number; luz: string; children: ReactNode }) {
  const [a, b] = FASES[i];
  const x = X[i], s = 128, h = 24;
  return (
    <g>
      <motion.ellipse cx={x} cy={Y + 78} rx="104" ry="26" fill={luz} filter={`url(#${id}-blur)`} animate={{ opacity: [0.12, 0.12, 0.55, 0.55, 0.12, 0.12] }} transition={vuelta([0, a, a + 0.04, b, b + 0.03, 1])} />
      <motion.g animate={{ y: [0, 0, -14, -14, 0, 0] }} transition={vuelta([0, a, a + 0.05, b, b + 0.04, 1])}>
        <Slab id={id} cx={x} cy={Y - s / 2 + h} w={s} d={s} h={h} tone="paper" />
        <motion.g animate={{ opacity: [0, 0, 1, 1, 0, 0] }} transition={vuelta([0, a, a + 0.05, b, b + 0.04, 1])}>
          <g transform={planeM(x, Y)}><rect x="-54" y="-54" width="108" height="108" rx="8" fill={luz} fillOpacity=".14" stroke={luz} strokeWidth="2.5" /></g>
        </motion.g>
        {children}
      </motion.g>
    </g>
  );
}

/** Cinta entre plataformas y la pieza que la recorre. */
function Conexiones({ pieza }: { pieza: ReactNode }) {
  return (
    <g>
      <Wire d={`M${X[0] + 112},${Y} L${X[1] - 112},${Y}`} color="rgba(130,118,88,.75)" w={4} dash="3 10" />
      <Wire d={`M${X[1] + 112},${Y} L${X[2] - 112},${Y}`} color="rgba(130,118,88,.75)" w={4} dash="3 10" />
      <motion.g
        initial={{ x: X[0], y: Y - 118, opacity: 0 }}
        animate={{ x: [X[0], X[0], X[0], X[1], X[1], X[2], X[2], X[2]], y: [Y - 112, Y - 112, Y - 112, Y - 128, Y - 128, Y - 112, Y - 112, Y - 112], opacity: [0, 0, 1, 1, 1, 1, 0, 0] }}
        transition={vuelta([0, 0.24, 0.27, 0.4, 0.58, 0.72, 0.77, 1])}
      >
        {pieza}
      </motion.g>
    </g>
  );
}

/** Barra de pasos: el que está en curso se rellena de color. */
function Pasos({ textos, colores }: { textos: string[]; colores: string[] }) {
  return (
    <g>
      {textos.map((t, i) => {
        const [a, b] = FASES[i];
        return (
          <g key={t}>
            <rect x={X[i] - 130} y="394" width="260" height="38" rx="9" fill="#fff" fillOpacity=".72" />
            <Texto x={X[i]} y={418} size={13.5} weight={600} color="#7c776a">{t}</Texto>
            <Ventana a={a} b={b}>
              <rect x={X[i] - 130} y="394" width="260" height="38" rx="9" fill={colores[i]} />
              <Texto x={X[i]} y={418} size={13.5} color="#fff">{t}</Texto>
            </Ventana>
          </g>
        );
      })}
    </g>
  );
}
function Pies({ items }: { items: [string, string][] }) {
  return (
    <g>
      {items.map(([t, d], i) => (
        <g key={t}><Texto x={X[i]} y={350}>{t}</Texto><Texto x={X[i]} y={370} size={12.5} weight={500} color="#7c776a">{d}</Texto></g>
      ))}
    </g>
  );
}

/* ───────── objetos 3D ───────── */
/** Hoja de papel en pie, con grosor. */
function Hoja3D({ color = "#e8591d", escala = 1 }: { color?: string; escala?: number }) {
  return (
    <g transform={`scale(${escala})`} style={{ filter: "drop-shadow(0 12px 10px rgba(70,55,20,.25))" }}>
      <path d="M-20 -30 L20 -18 V32 L-20 20 Z" fill="#fff" stroke="#ddd6c4" />
      <path d="M20 -18 L27 -22 V28 L20 32 Z" fill="#cfc6ae" />
      <path d="M-20 -30 L-13 -34 L27 -22 L20 -18 Z" fill="#f1ece0" />
      <path d="M-12 -14 L12 -7 M-12 -2 L12 5 M-12 10 L2 14" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}
/** Persona: cuerpo cilíndrico y cabeza esférica. */
function Persona3D({ id, x, y, c1, c2, s = 1 }: { id: string; x: number; y: number; c1: string; c2: string; s?: number }) {
  const g = `${id}-p-${c1.slice(1)}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient>
        <radialGradient id={`${g}-c`} cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#fff" stopOpacity=".85" /><stop offset=".35" stopColor={c1} /><stop offset="1" stopColor={c2} /></radialGradient>
      </defs>
      <ellipse cx="0" cy="4" rx="34" ry="13" fill="rgba(70,55,20,.16)" />
      <path d="M-28 0 C-28 -36 -18 -46 0 -46 C18 -46 28 -36 28 0 C28 14 -28 14 -28 0 Z" fill={`url(#${g})`} />
      <circle cx="0" cy="-66" r="21" fill={`url(#${g}-c)`} />
    </g>
  );
}
/** Marca de visto bueno con volumen. */
function Visto3D({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {[9, 7, 5, 3].map((k) => <path key={k} d={`M-34 ${-4 + k} L-10 ${20 + k} L36 ${-30 + k}`} stroke="#3f6c2a" strokeWidth="19" />)}
      <path d="M-34 -4 L-10 20 L36 -30" stroke="#72a753" strokeWidth="19" />
      <path d="M-33 -8 L-10 14 L33 -32" stroke="#c2e0a6" strokeWidth="4" />
    </g>
  );
}
/** Pila de discos: la base de datos. */
function Datos3D({ x, y }: { x: number; y: number }) {
  const colores = [["#fdbb78", "#e8531d", "#9a3412"], ["#fdeab4", "#e2a63a", "#a5711b"], ["#c2e0a6", "#5f9843", "#3f6c2a"]];
  return (
    <g>
      {[2, 1, 0].map((k) => {
        const cy = y - 62 + k * 26;
        return (
          <g key={k}>
            <path d={`M${x - 48} ${cy} v18 a48 18 0 0 0 96 0 v-18 z`} fill="#4a4535" />
            <ellipse cx={x} cy={cy} rx="48" ry="18" fill="#6b644d" />
            <Desde a={0.42 + (2 - k) * 0.07}>
              <path d={`M${x - 48} ${cy} v18 a48 18 0 0 0 96 0 v-18 z`} fill={colores[k][2]} />
              <ellipse cx={x} cy={cy} rx="48" ry="18" fill={colores[k][1]} />
              <ellipse cx={x - 12} cy={cy - 4} rx="22" ry="7" fill={colores[k][0]} opacity=".8" />
            </Desde>
          </g>
        );
      })}
    </g>
  );
}
/** Campana con volumen. */
function Campana3D({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs><linearGradient id="fl-campana" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fdeab4" /><stop offset=".45" stopColor="#efc05a" /><stop offset="1" stopColor="#a5711b" /></linearGradient></defs>
      <motion.g animate={{ rotate: [0, 0, -17, 17, -13, 13, -8, 8, 0, 0] }} transition={vuelta([0, 0.4, 0.43, 0.46, 0.49, 0.52, 0.55, 0.58, 0.62, 1])} style={{ transformBox: "fill-box", transformOrigin: "50% 8%" }}>
        <circle cx="0" cy="-62" r="8" fill="#a5711b" />
        <path d="M-46 4 C-34 -8 -36 -58 0 -58 C36 -58 34 -8 46 4 Z" fill="url(#fl-campana)" />
        <ellipse cx="0" cy="4" rx="46" ry="13" fill="#c8922b" /><ellipse cx="0" cy="2" rx="38" ry="9" fill="#7c5412" />
        <circle cx="0" cy="12" r="9" fill="#efc05a" />
        <path d="M-22 -12 C-22 -34 -14 -48 -4 -51" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" fill="none" />
      </motion.g>
    </g>
  );
}
function Lienzo({ id, etiqueta, children }: { id: string; etiqueta: string; children: ReactNode }) {
  // En móvil el dibujo mide tres pantallas de ancho y la «cámara» sigue al paso activo (.fl-camara).
  return (
    <div className="overflow-hidden">
      <div className="fl-camara">
        <svg viewBox="0 68 900 372" className="h-auto w-full" role="img" aria-label={etiqueta}>
          <Defs id={id} />
          {children}
        </svg>
      </div>
    </div>
  );
}

/* ═════════ 1. APROBACIONES ═════════ */
export function FlowApprovals() {
  const id = "fa";
  return (
    <Lienzo id={id} etiqueta="Una solicitud llega, la revisa el responsable y queda aprobada">
      <Plataforma id={id} i={0} luz="#e8591d">
        <Slab id={id} cx={X[0]} cy={Y - 44 + 4} w={74} d={74} h={8} tone="violet">
          <g stroke="#fff" strokeWidth="5" strokeLinecap="round"><path d="M-20 -16 H20" /><path d="M-20 0 H14" /><path d="M-20 16 H2" /></g>
        </Slab>
        <motion.g animate={{ opacity: [1, 1, 0, 0, 1] }} transition={vuelta([0, 0.25, 0.28, 0.96, 1])}>
          <g transform={`translate(${X[0]} ${Y - 62})`}><motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 2.6, repeat: Infinity }}><Hoja3D /></motion.g></g>
        </motion.g>
      </Plataforma>
      <Plataforma id={id} i={1} luz="#e2a63a">
        <Persona3D id={id} x={X[1]} y={Y + 6} c1="#a8a08a" c2="#4f4833" />
        <Ventana a={0.42} b={0.52}>
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ transformBox: "view-box", transformOrigin: `${X[1] + 54}px ${Y - 74}px` }}>
            <circle cx={X[1] + 54} cy={Y - 74} r="17" fill="none" stroke="#e2a63a" strokeWidth="6" strokeDasharray="68 40" strokeLinecap="round" />
          </motion.g>
        </Ventana>
        <Desde a={0.53}><circle cx={X[1] + 54} cy={Y - 74} r="19" fill="#5f9843" /><path d={`M${X[1] + 45} ${Y - 74} l7 7 l13 -15`} stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></Desde>
      </Plataforma>
      <Plataforma id={id} i={2} luz="#5f9843">
        <Slab id={id} cx={X[2]} cy={Y - 40 + 8} w={68} d={68} h={14} tone="paper" />
        <Desde a={0.74}>
          <motion.g animate={{ y: [-46, -46, 0, 0], scale: [1.4, 1.4, 1, 1] }} transition={vuelta([0, 0.74, 0.8, 1])} style={{ transformBox: "fill-box", transformOrigin: "center" }}><Visto3D x={X[2]} y={Y - 46} /></motion.g>
        </Desde>
      </Plataforma>
      <Conexiones pieza={<Hoja3D escala={0.9} />} />
      <Desde a={0.84}>
        <rect x={X[2] - 80} y="86" width="160" height="36" rx="9" fill="#fff" style={{ filter: "drop-shadow(0 10px 14px rgba(70,55,20,.18))" }} />
        <circle cx={X[2] - 56} cy="104" r="6" fill="#5f9843" /><Texto x={X[2] + 10} y={109} size={13}>Aviso enviado</Texto>
      </Desde>
      <Pies items={[["Solicitud", "Compra de material"], ["Responsable", "La revisa y decide"], ["Aprobado", "Queda registrado"]]} />
      <Pasos textos={["1 · Llega la solicitud", "2 · Se pide la aprobación", "3 · Aprobada y avisada"]} colores={["#e8591d", "#d3952a", "#5f9843"]} />
    </Lienzo>
  );
}

/* ═════════ 2. DOCUMENTOS Y FORMULARIOS ═════════ */
export function FlowDocs() {
  const id = "fd";
  return (
    <Lienzo id={id} etiqueta="El formulario se rellena, los datos se ordenan y sale el documento">
      <Plataforma id={id} i={0} luz="#e8591d">
        <Slab id={id} cx={X[0]} cy={Y - 46 + 2} w={92} d={92} h={16} tone="dark">
          <rect x="-37" y="-37" width="74" height="74" rx="6" fill="#fff" />
          {[-22, -2, 18].map((v, k) => (
            <g key={v}>
              <rect x="-28" y={v - 6} width="56" height="13" rx="3" fill="#f1ece0" />
              <motion.rect x="-25" y={v - 3} height="7" rx="3" fill={["#e8591d", "#e2a63a", "#5f9843"][k]} initial={{ width: 0 }} animate={{ width: [0, 0, [48, 32, 40][k], [48, 32, 40][k], 0] }} transition={vuelta([0, 0.05 + k * 0.07, 0.11 + k * 0.07, 0.96, 1])} />
            </g>
          ))}
        </Slab>
      </Plataforma>
      <Plataforma id={id} i={1} luz="#e2a63a"><Datos3D x={X[1]} y={Y} /></Plataforma>
      <Plataforma id={id} i={2} luz="#5f9843">
        {[0, 1, 2].map((k) => <Slab key={k} id={id} cx={X[2]} cy={Y - 42 - k * 11 + 4} w={82} d={82} h={8} tone="paper" />)}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0], y: [-70, -70, 0, 0, 0] }} transition={vuelta([0, 0.7, 0.78, 0.96, 1])}>
          <Slab id={id} cx={X[2]} cy={Y - 42 - 33 + 4} w={82} d={82} h={8} tone="paper">
            <rect x="-28" y="-28" width="34" height="8" rx="3" fill="#2a2618" />
            {[-12, 2, 16].map((v, k) => <motion.rect key={v} x="-28" y={v} height="6" rx="3" fill={k ? "#a8a08a" : "#e8591d"} initial={{ width: 0 }} animate={{ width: [0, 0, [56, 48, 36][k], [56, 48, 36][k], 0] }} transition={vuelta([0, 0.78 + k * 0.04, 0.83 + k * 0.04, 0.96, 1])} />)}
          </Slab>
        </motion.g>
        <Desde a={0.9}><circle cx={X[2] + 62} cy={Y - 90} r="20" fill="#5f9843" /><path d={`M${X[2] + 53} ${Y - 90} l7 7 l13 -15`} stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></Desde>
      </Plataforma>
      <Conexiones pieza={<g><circle r="22" fill="#fff" style={{ filter: "drop-shadow(0 10px 10px rgba(70,55,20,.25))" }} /><circle cx="-8" cy="0" r="5" fill="#e8591d" /><circle cx="4" cy="-7" r="5" fill="#e2a63a" /><circle cx="6" cy="8" r="5" fill="#5f9843" /></g>} />
      <Pies items={[["Formulario", "Se rellena una sola vez"], ["Datos organizados", "Sin copiar y pegar"], ["Documento generado", "Listo para enviar"]]} />
      <Pasos textos={["1 · Se rellena el formulario", "2 · Se ordenan los datos", "3 · Sale el documento"]} colores={["#e8591d", "#d3952a", "#5f9843"]} />
    </Lienzo>
  );
}

/* ═════════ 3. RECORDATORIOS Y SEGUIMIENTO ═════════ */
export function FlowReminders() {
  const id = "fr";
  const equipo = [
    { dx: -52, dy: 8, c1: "#fdbb78", c2: "#c2440f", a: 0.78 },
    { dx: 4, dy: -24, c1: "#fdeab4", c2: "#a5711b", a: 0.84 },
    { dx: 56, dy: 10, c1: "#a8a08a", c2: "#4f4833", a: 0.9 },
  ];
  return (
    <Lienzo id={id} etiqueta="Se acerca el plazo, suena el aviso y el equipo va completando sus tareas">
      <Plataforma id={id} i={0} luz="#dc513c">
        <Slab id={id} cx={X[0]} cy={Y - 48 + 2} w={96} d={96} h={16} tone="paper">
          <rect x="-40" y="-40" width="80" height="20" rx="4" fill="#dc513c" />
          {Array.from({ length: 12 }).map((_, k) => <rect key={k} x={-38 + (k % 4) * 20} y={-14 + Math.floor(k / 4) * 18} width="15" height="13" rx="3" fill={k === 6 ? "#dc513c" : "#eae4d3"} />)}
          <motion.rect x="2" y="4" width="15" height="13" rx="3" fill="none" stroke="#dc513c" strokeWidth="3.5" animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        </Slab>
      </Plataforma>
      <Plataforma id={id} i={1} luz="#e2a63a">
        <Campana3D x={X[1]} y={Y - 14} />
        {[0.42, 0.5].map((a) => (
          <motion.ellipse key={a} cx={X[1]} cy={Y - 46} rx="50" ry="40" fill="none" stroke="#e2a63a" strokeWidth="3" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0.8, 0, 0], scale: [0.8, 0.8, 0.85, 1.8, 1.8] }} transition={vuelta([0, a, a + 0.01, a + 0.12, 1])} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        ))}
      </Plataforma>
      <Plataforma id={id} i={2} luz="#5f9843">
        {[1, 0, 2].map((k) => {
          const m = equipo[k];
          return (
            <g key={k}>
              <Persona3D id={id} x={X[2] + m.dx} y={Y + m.dy} c1={m.c1} c2={m.c2} s={0.66} />
              <g><circle cx={X[2] + m.dx} cy={Y + m.dy - 76} r="12" fill="#fff" stroke="#e2a63a" strokeWidth="4" /></g>
              <Desde a={m.a}><circle cx={X[2] + m.dx} cy={Y + m.dy - 76} r="14" fill="#5f9843" /><path d={`M${X[2] + m.dx - 6} ${Y + m.dy - 76} l5 5 l8 -10`} stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></Desde>
            </g>
          );
        })}
      </Plataforma>
      <Conexiones pieza={<g style={{ filter: "drop-shadow(0 10px 10px rgba(70,55,20,.25))" }}><rect x="-24" y="-17" width="48" height="34" rx="6" fill="#fff" /><path d="M-18 -10 L0 4 L18 -10" fill="none" stroke="#e8591d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></g>} />
      <Pies items={[["Plazo", "Nadie depende de la memoria"], ["Aviso automático", "Llega solo a cada persona"], ["Estado de cada tarea", "Se ve qué falta y quién lo lleva"]]} />
      <Pasos textos={["1 · Se acerca el plazo", "2 · Se avisa al equipo", "3 · Se completa y se ve"]} colores={["#dc513c", "#d3952a", "#5f9843"]} />
    </Lienzo>
  );
}
