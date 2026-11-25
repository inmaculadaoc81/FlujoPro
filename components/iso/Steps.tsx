"use client";
// «Cómo funciona»: tres escenas isométricas distintas, cada una cuenta su paso.
//  1) Entendemos tu proceso  → una lupa revisa el montón de tareas repetidas y encuentra dónde se pierde tiempo.
//  2) Diseñamos el flujo     → sobre un plano se dibuja el flujo: inicio → tarea → decisión → fin.
//  3) Lo ponemos en marcha   → una cinta en funcionamiento: las tareas entran pendientes y salen hechas.
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Defs, Slab, proj, planeM, pts, C, S } from "@/components/iso/Iso";

const FONT = "var(--font-inter), system-ui, sans-serif";

/** Etiqueta flotante con texto. */
export function Chip({ x, y, w, children, dot }: { x: number; y: number; w: number; children: ReactNode; dot?: string }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 13} width={w} height="26" rx="13" fill="#fff" stroke="#e2e8f0" style={{ filter: "drop-shadow(0 6px 10px rgba(15,23,42,.12))" }} />
      {dot ? <circle cx={x - w / 2 + 14} cy={y} r="4.5" fill={dot} /> : null}
      <text x={x + (dot ? 8 : 0)} y={y + 4.2} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a" fontFamily={FONT}>{children}</text>
    </g>
  );
}

/* ═════════ 1. ENTENDEMOS TU PROCESO ═════════ */
export function StepUnderstand() {
  const id = "st1";
  const p = proj(190, 100);
  // hoja de tarea sobre la mesa (x, y = esquina en la mesa; z = altura)
  const Hoja = ({ x, y, z, urgente = false }: { x: number; y: number; z: number; urgente?: boolean }) => {
    const [cx, cy] = p(x, y, z);
    const [tx, ty] = p(x + 36, y + 27, z + 6);
    return (
      <g>
        <Slab id={id} cx={cx} cy={cy} w={72} d={54} h={6} tone={urgente ? "amber" : "paper"} />
        <g transform={planeM(tx, ty)}>
          <rect x="-27" y="-17" width="10" height="10" rx="2" fill="none" stroke={urgente ? "#7c2d12" : "#94a3b8"} strokeWidth="2" />
          <g stroke={urgente ? "#7c2d12" : "#94a3b8"} strokeWidth="4" strokeLinecap="round">
            <path d="M-10 -12 H26" /><path d="M-26 2 H22" /><path d="M-26 14 H6" />
          </g>
        </g>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-label="Revisamos tus tareas repetidas y encontramos dónde se pierde tiempo">
      <Defs id={id} />
      {/* mesa */}
      <Slab id={id} cx={p(-6, -6, -12)[0]} cy={p(-6, -6, -12)[1]} w={176} d={156} h={12} tone="glass" />
      {/* montón de tareas iguales */}
      {[0, 10, 20, 30].map((z) => <Hoja key={z} x={12 + (z % 20 ? 5 : 0)} y={76} z={z} />)}
      {/* otras tareas sueltas */}
      <Hoja x={84} y={8} z={0} />
      <Hoja x={90} y={84} z={0} urgente />
      <Hoja x={4} y={4} z={0} />
      {/* lupa que recorre las tareas y se para en la que roba tiempo */}
      <motion.g
        animate={{ x: [-64, 20, -40, 14, 14, -64], y: [-6, -52, 12, 22, 22, -6] }}
        transition={{ duration: 7, times: [0, 0.2, 0.42, 0.62, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M226 196 l34 34" stroke="#1e293b" strokeWidth="13" strokeLinecap="round" />
        <path d="M226 196 l34 34" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <circle cx="197" cy="167" r="38" fill="#7dd3fc" fillOpacity=".18" stroke="#1e293b" strokeWidth="7" />
        <path d="M172 155 a28 28 0 0 1 22 -17" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
      </motion.g>
      {/* aviso: aquí se pierde tiempo */}
      <motion.g animate={{ opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, 8] }} transition={{ duration: 7, times: [0, 0.6, 0.68, 0.9, 1], repeat: Infinity }}>
        <Chip x={262} y={262} w={168} dot="#f59e0b">Aquí se pierde tiempo</Chip>
      </motion.g>
      <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>
        <Chip x={96} y={52} w={136} dot="#e11d48">Se repite ×12</Chip>
      </motion.g>
    </svg>
  );
}

/* ═════════ 2. DISEÑAMOS EL FLUJO ═════════ */
const D2 = 7;
export function StepDesign() {
  const id = "st2";
  const p = proj(168, 74);
  const pt = (x: number, y: number, z = 9) => p(x, y, z);
  const linea = (a: [number, number][]) => "M" + a.map(([x, y]) => pt(x, y).map((v) => v.toFixed(1)).join(",")).join(" L");

  /** Aparece en el momento `a` del ciclo y «cae» sobre el plano. */
  const Pop = ({ a, children }: { a: number; children: ReactNode }) => (
    <motion.g animate={{ opacity: [0, 0, 1, 1, 0], y: [-16, -16, 0, 0, 0] }} transition={{ duration: D2, times: [0, a, a + 0.06, 0.95, 1], repeat: Infinity }}>
      {children}
    </motion.g>
  );
  const Trazo = ({ d, a, b }: { d: string; a: number; b: number }) => (
    <motion.path d={d} fill="none" stroke="#312e81" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"
      animate={{ pathLength: [0, 0, 0, 1, 1, 1], opacity: [0, 0, 1, 1, 1, 0] }} transition={{ duration: D2, times: [0, a, a + 0.015, b, 0.95, 1], repeat: Infinity }} />
  );

  // nodos en coordenadas del plano
  const A: [number, number] = [30, 136], B: [number, number] = [112, 136], D: [number, number] = [112, 42], E: [number, number] = [198, 42];
  const [ax, ay] = pt(A[0], A[1], 8);
  const bloque = (n: [number, number]) => pt(n[0] - 19, n[1] - 19, 9);

  // el lápiz sigue la punta del trazo
  const camino: [number, number][] = [pt(A[0], A[1]), pt(A[0], A[1]), pt(B[0], B[1]), pt(B[0], B[1]), pt(D[0], D[1]), pt(D[0], D[1]), pt(E[0], E[1]), pt(E[0], E[1])];
  const tiempos = [0, 0.1, 0.24, 0.3, 0.44, 0.52, 0.66, 1];

  return (
    <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-label="Dibujamos el flujo: inicio, tarea, decisión y fin">
      <Defs id={id} />
      {/* plano de diseño con cuadrícula */}
      <Slab id={id} cx={p(0, 0, 0)[0]} cy={p(0, 0, 0)[1]} w={226} d={174} h={8} tone="plano" edge="rgba(99,102,241,.45)" />
      <g stroke="rgba(99,102,241,.22)" strokeWidth="1">
        {Array.from({ length: 8 }).map((_, i) => { const a = pt((i + 1) * 25, 0, 8), b = pt((i + 1) * 25, 174, 8); return <line key={`x${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />; })}
        {Array.from({ length: 6 }).map((_, i) => { const a = pt(0, (i + 1) * 25, 8), b = pt(226, (i + 1) * 25, 8); return <line key={`y${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />; })}
      </g>
      {/* conexiones que se van dibujando */}
      <Trazo d={linea([A, B])} a={0.1} b={0.24} />
      <Trazo d={linea([B, D])} a={0.3} b={0.44} />
      <Trazo d={linea([D, E])} a={0.52} b={0.66} />

      {/* decisión: en vista isométrica la pieza cuadrada se ve como el rombo clásico */}
      <Pop a={0.44}>
        <Slab id={id} cx={pt(D[0] - 23, D[1] - 23, 9)[0]} cy={pt(D[0] - 23, D[1] - 23, 9)[1]} w={46} d={46} h={14} tone="amber" />
        <text x={pt(D[0], D[1], 23)[0]} y={pt(D[0], D[1], 23)[1] + 7} textAnchor="middle" fontSize="20" fontWeight="800" fill="#451a03" fontFamily={FONT}>?</text>
      </Pop>
      {/* inicio (cilindro) */}
      <Pop a={0.03}>
        <path d={`M${ax - 25} ${ay - 18} v18 a25 14.5 0 0 0 50 0 v-18 z`} fill="#15803d" />
        <ellipse cx={ax} cy={ay - 18} rx="25" ry="14.5" fill="#4ade80" stroke="#fff" strokeOpacity=".7" />
        <path d={`M${ax - 5} ${ay - 24} l12 6 l-12 6 z`} fill="#052e16" />
      </Pop>
      {/* tarea (bloque) */}
      <Pop a={0.24}>
        <Slab id={id} cx={pt(B[0] - 27, B[1] - 16, 9)[0]} cy={pt(B[0] - 27, B[1] - 16, 9)[1]} w={54} d={32} h={20} tone="violet">
          <g stroke="#fff" strokeWidth="3.5" strokeLinecap="round"><path d="M-9 -5 H9" /><path d="M-9 5 H4" /></g>
        </Slab>
      </Pop>
      {/* fin */}
      <Pop a={0.66}>
        <Slab id={id} cx={bloque(E)[0]} cy={bloque(E)[1]} w={38} d={38} h={20} tone="teal">
          <path d="M-9 1 L-2 8 L10 -7" fill="none" stroke="#042f2e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </Slab>
      </Pop>

      {/* lápiz */}
      <motion.g animate={{ x: camino.map((c) => c[0]), y: camino.map((c) => c[1]), opacity: [0, 1, 1, 1, 1, 1, 1, 0] }} transition={{ duration: D2, times: tiempos, repeat: Infinity, ease: "linear" }}>
        <g transform="rotate(38)">
          <path d="M0 0 L-6 -13 H6 Z" fill="#fde68a" stroke="#92400e" />
          <path d="M0 0 L-2.2 -5 H2.2 Z" fill="#0f172a" />
          <rect x="-6" y="-58" width="12" height="45" fill="#4f46e5" />
          <rect x="-6" y="-66" width="12" height="9" rx="3" fill="#fb7185" />
        </g>
      </motion.g>

      <Pop a={0.06}><Chip x={54} y={198} w={64}>Inicio</Chip></Pop>
      <Pop a={0.28}><Chip x={128} y={238} w={66}>Tarea</Chip></Pop>
      <Pop a={0.48}><Chip x={232} y={84} w={96}>¿Aprobado?</Chip></Pop>
      <Pop a={0.7}><Chip x={312} y={234} w={64}>Aviso</Chip></Pop>
    </svg>
  );
}

/* ═════════ 3. LO PONEMOS EN MARCHA ═════════ */
const L = { w: 264, d: 62, h: 16 };
export function StepRun() {
  const id = "st3";
  const p = proj(98, 116);
  const [bx, by] = p(0, 0, 0);
  /** Desplazamiento en pantalla al avanzar `u` unidades por la cinta. */
  const dx = (u: number) => u * C, dy = (u: number) => u * S;
  const caja = p(4, (L.d - 30) / 2, L.h);
  const maquina = p(106, -12, L.h);

  const Viaje = ({ desde, hasta, delay, children }: { desde: number; hasta: number; delay: number; children: ReactNode }) => (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ x: [dx(desde), dx(hasta)], y: [dy(desde), dy(hasta)], opacity: [0, 1, 1, 0] }}
      transition={{
        x: { duration: 3, delay, repeat: Infinity, ease: "linear" },
        y: { duration: 3, delay, repeat: Infinity, ease: "linear" },
        opacity: { duration: 3, delay, repeat: Infinity, times: [0, 0.12, 0.86, 1] },
      }}
    >
      {children}
    </motion.g>
  );

  return (
    <svg viewBox="0 0 380 300" className="h-auto w-full" role="img" aria-label="El flujo en marcha: las tareas entran pendientes y salen hechas">
      <Defs id={id} />
      {/* cinta */}
      <Slab id={id} cx={bx} cy={by} w={L.w} d={L.d} h={L.h} tone="dark" edge="rgba(148,163,184,.5)" />
      <clipPath id={`${id}-cinta`}><polygon points={pts([p(0, 0, L.h), p(L.w, 0, L.h), p(L.w, L.d, L.h), p(0, L.d, L.h)])} /></clipPath>
      <g clipPath={`url(#${id}-cinta)`}>
        <motion.g animate={{ x: [0, dx(24)], y: [0, dy(24)] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
          {Array.from({ length: 13 }).map((_, i) => { const a = p((i - 1) * 24, 6, L.h), b = p((i - 1) * 24, L.d - 6, L.h); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#64748b" strokeWidth="4" strokeLinecap="round" />; })}
        </motion.g>
      </g>
      {/* rodillos */}
      {[20, 78, 186, 244].map((u) => { const [x, y] = p(u, L.d, 3); return (
        <motion.g key={u} animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx={x} cy={y} r="7" fill="#cbd5e1" stroke="#475569" strokeWidth="2" /><path d={`M${x - 5} ${y} H${x + 5} M${x} ${y - 5} V${y + 5}`} stroke="#475569" strokeWidth="1.6" />
        </motion.g>
      ); })}

      {/* tareas pendientes que entran */}
      {[0, 1.5].map((delay) => (
        <Viaje key={delay} desde={0} hasta={100} delay={delay}>
          <Slab id={id} cx={caja[0]} cy={caja[1]} w={30} d={30} h={24} tone="amber">
            <g fill="none" stroke="#451a03" strokeWidth="2.6" strokeLinecap="round"><circle r="8" /><path d="M0 -4 V0 L4 2" /></g>
          </Slab>
        </Viaje>
      ))}

      {/* máquina del flujo */}
      <Slab id={id} cx={maquina[0]} cy={maquina[1]} w={58} d={86} h={62} tone="violet">
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          {Array.from({ length: 8 }).map((_, i) => <rect key={i} x="-4" y="-25" width="8" height="11" rx="2" fill="#fff" transform={`rotate(${i * 45})`} />)}
          <circle r="17" fill="#fff" /><circle r="7" fill="#5b21b6" />
        </motion.g>
      </Slab>

      {/* tareas hechas que salen */}
      {[0.75, 2.25].map((delay) => (
        <Viaje key={delay} desde={142} hasta={228} delay={delay}>
          <Slab id={id} cx={caja[0]} cy={caja[1]} w={30} d={30} h={24} tone="green">
            <path d="M-8 1 L-2 7 L9 -6" fill="none" stroke="#052e16" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          </Slab>
        </Viaje>
      ))}

      {/* estado: en marcha */}
      <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <Chip x={290} y={58} w={118} dot="#16a34a">En marcha</Chip>
        <motion.circle cx={245} cy={58} r="4.5" fill="none" stroke="#16a34a" strokeWidth="2" animate={{ r: [4.5, 12], opacity: [0.9, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />
      </motion.g>
      <Chip x={62} y={62} w={104} dot="#f59e0b">Pendiente</Chip>
      <Chip x={316} y={186} w={84} dot="#16a34a">Hecho</Chip>
    </svg>
  );
}
