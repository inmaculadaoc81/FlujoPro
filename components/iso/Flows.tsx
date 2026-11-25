"use client";
// Tres animaciones de flujo (una por pestaña de «Casos de uso»). Cada una cuenta una historia de principio a fin,
// con etiquetas y colores distintos, y vuelve a empezar sola.
import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

const DUR = 10; // segundos por vuelta
const FONT = "var(--font-inter), system-ui, sans-serif";

/* ───────── pieza básica: un elemento con una línea de tiempo (valores y tiempos 0..1) ───────── */
type Seq = {
  as?: "g" | "rect" | "circle" | "path" | "text";
  t: number[];
  opacity?: number[]; mx?: number[]; my?: number[]; scale?: number[]; scaleX?: number[]; rotate?: number[];
  pathLength?: number[]; cs?: string[]; cf?: string[];
  origin?: string; children?: ReactNode; style?: CSSProperties; [k: string]: unknown;
};
const KEYS = ["opacity", "mx", "my", "scale", "scaleX", "rotate", "pathLength", "cs", "cf"] as const;
const REAL: Record<string, string> = { mx: "x", my: "y", cs: "stroke", cf: "fill" };
function S({ as = "g", t, origin = "50% 50%", children, style, ...rest }: Seq) {
  const Comp = motion[as] as React.ElementType;
  const animate: Record<string, unknown> = {};
  const props: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(rest)) {
    if ((KEYS as readonly string[]).includes(k)) animate[REAL[k] ?? k] = v; else props[k] = v;
  }
  return (
    <Comp {...props} animate={animate} transition={{ duration: DUR, times: t, repeat: Infinity, ease: "linear" }}
      style={{ transformBox: "fill-box", transformOrigin: origin, ...style }}>
      {children}
    </Comp>
  );
}
/** Ventana de visibilidad: aparece en a, se queda hasta b y desaparece. */
const win = (a: number, b: number) => ({ t: [0, a, Math.min(a + 0.015, 0.99), b, Math.min(b + 0.015, 0.995), 1], opacity: [0, 0, 1, 1, 0, 0] });
/** Aparece en a y se queda hasta el final de la vuelta. */
const from = (a: number) => ({ t: [0, a, Math.min(a + 0.02, 0.97), 0.96, 0.985, 1], opacity: [0, 0, 1, 1, 0, 0] });

const C = { ink: "#2a2618", mute: "#7c776a", faint: "#a8a08a", line: "#ddd6c4", amber: "#f59e0b", green: "#16a34a", blue: "#7a7259", violet: "#e8591d", rose: "#e11d48", teal: "#7d9350" };

function Txt({ x, y, size = 15, weight = 600, fill = C.ink, anchor = "middle", children }: { x: number; y: number; size?: number; weight?: number; fill?: string; anchor?: "start" | "middle" | "end"; children: ReactNode }) {
  return <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} fontFamily={FONT}>{children}</text>;
}
function Shadow({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#2a2618" floodOpacity=".13" /></filter>
    </defs>
  );
}
const Doc = ({ c = C.mute }: { c?: string }) => (
  <g fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="-14" y="-18" width="28" height="36" rx="4" /><path d="M-7 -6 H7 M-7 1 H7 M-7 8 H2" /></g>
);
const Person = ({ c = C.mute }: { c?: string }) => (
  <g fill="none" stroke={c} strokeWidth="3.4" strokeLinecap="round"><circle cx="0" cy="-10" r="9" /><path d="M-18 20 C-16 6 16 6 18 20" /></g>
);
const Bell = ({ c = "#b45309" }: { c?: string }) => (
  <g fill="none" stroke={c} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M-16 10 V-2 a16 16 0 0 1 32 0 V10 Z" /><path d="M-6 18 a6 6 0 0 0 12 0" /><path d="M0 -22 V-18" /></g>
);

/* ═══════════════ 1. APROBACIONES ═══════════════
   Una solicitud llega → pasa por la persona responsable → queda aprobada y se avisa. */
export function FlowApprovals() {
  const id = "fa";
  return (
    <svg viewBox="0 0 900 440" className="h-auto w-full" role="img" aria-label="Una solicitud pasa por el responsable y queda aprobada">
      <Shadow id={id} />
      {/* caminos */}
      <path d="M222 190 H372" stroke={C.line} strokeWidth="3" strokeDasharray="6 8" fill="none" className="fp-dashflow" />
      <path d="M528 190 H678" stroke={C.line} strokeWidth="3" strokeDasharray="6 8" fill="none" className="fp-dashflow" />
      <path d="M362 180 l12 10 l-12 10" stroke={C.line} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M668 180 l12 10 l-12 10" stroke={C.line} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* 1 · Solicitud */}
      <rect x="62" y="128" width="160" height="124" rx="18" fill="#fff" stroke="#eae4d3" filter={`url(#${id}-sh)`} />
      <g transform="translate(142 184)"><Doc c={C.amber} /></g>
      <S as="rect" x="62" y="128" width="160" height="124" rx="18" fill="none" strokeWidth="3" t={[0, 0.04, 0.12, 0.2, 1]} cs={[C.amber, C.amber, "#eae4d3", "#eae4d3", "#eae4d3"]} />
      <Txt x={142} y={282}>Solicitud</Txt>
      <Txt x={142} y={303} size={13} weight={500} fill={C.mute}>Compra de material</Txt>

      {/* 2 · Responsable */}
      <circle cx="450" cy="190" r="66" fill="#fff" filter={`url(#${id}-sh)`} />
      <S as="circle" cx="450" cy="190" r="66" fill="none" strokeWidth="5" t={[0, 0.28, 0.32, 0.5, 0.52, 0.94, 0.97, 1]} cs={["#eae4d3", "#eae4d3", C.amber, C.amber, C.green, C.green, "#eae4d3", "#eae4d3"]} />
      <g transform="translate(450 192)"><Person /></g>
      <S t={[0, 0.3, 0.33, 0.5, 0.53, 1]} opacity={[0, 0, 1, 1, 0, 0]}>
        <motion.path d="M450 124 a66 66 0 0 1 66 66" stroke={C.amber} strokeWidth="5" strokeLinecap="round" fill="none" animate={{ rotate: 360 }} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }} style={{ transformBox: "view-box", transformOrigin: "450px 190px" }} />
      </S>
      <S t={[0, 0.5, 0.55, 0.6, 0.94, 0.98, 1]} scale={[0, 0, 1.3, 1, 1, 0, 0]} opacity={[0, 0, 1, 1, 1, 0, 0]}>
        <circle cx="498" cy="146" r="17" fill={C.green} /><path d="M490 146 l6 7 l12 -14" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </S>
      <Txt x={450} y={282}>Responsable</Txt>
      <S {...win(0, 0.31)}><Txt x={450} y={303} size={13} weight={600} fill={C.faint}>En espera</Txt></S>
      <S {...win(0.31, 0.51)}><Txt x={450} y={303} size={13} weight={700} fill={C.amber}>Revisando…</Txt></S>
      <S {...win(0.51, 0.95)}><Txt x={450} y={303} size={13} weight={700} fill={C.green}>Aprobado</Txt></S>

      {/* 3 · Aprobado */}
      <circle cx="758" cy="190" r="66" fill="#fff" filter={`url(#${id}-sh)`} />
      <S as="circle" cx="758" cy="190" r="66" strokeWidth="5" t={[0, 0.75, 0.8, 0.94, 0.97, 1]} cf={["#fff", "#fff", "#dcfce7", "#dcfce7", "#fff", "#fff"]} cs={["#eae4d3", "#eae4d3", C.green, C.green, "#eae4d3", "#eae4d3"]} />
      <S as="path" d="M728 192 l22 22 l42 -46" fill="none" stroke={C.green} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" t={[0, 0.78, 0.86, 0.95, 0.97, 1]} pathLength={[0, 0, 1, 1, 0, 0]} />
      <S as="circle" cx="758" cy="190" r="66" fill="none" stroke={C.green} strokeWidth="3" t={[0, 0.8, 0.92, 1]} scale={[1, 1, 1.5, 1.5]} opacity={[0, 0.7, 0, 0]} />
      <Txt x={758} y={282}>Aprobado</Txt>
      <Txt x={758} y={303} size={13} weight={500} fill={C.mute}>Queda registrado</Txt>

      {/* la solicitud viaja */}
      <S t={[0, 0.05, 0.28, 0.5, 0.74, 0.84, 1]} mx={[0, 0, 308, 308, 616, 616, 616]} opacity={[0, 1, 1, 1, 1, 0, 0]}>
        <g transform="translate(142 190)">
          <rect x="-20" y="-26" width="40" height="52" rx="7" fill="#fff" stroke={C.amber} strokeWidth="3" filter={`url(#${id}-sh)`} />
          <path d="M-10 -10 H10 M-10 0 H10 M-10 10 H2" stroke={C.amber} strokeWidth="3" strokeLinecap="round" />
        </g>
      </S>
      {/* aviso */}
      <S t={[0, 0.82, 0.87, 0.95, 0.985, 1]} opacity={[0, 0, 1, 1, 0, 0]} my={[10, 10, 0, 0, -6, -6]}>
        <rect x="662" y="62" width="192" height="40" rx="20" fill="#fff" stroke="#eae4d3" filter={`url(#${id}-sh)`} />
        <g transform="translate(688 82) scale(.55)"><Bell /></g>
        <Txt x={768} y={87} size={13} weight={700} fill={C.ink}>Aviso enviado</Txt>
      </S>

      {/* pasos */}
      {[
        { x: 70, w: 230, label: "1 · Llega la solicitud", a: [0, 0.3] },
        { x: 335, w: 230, label: "2 · Se pide la aprobación", a: [0.3, 0.52] },
        { x: 600, w: 230, label: "3 · Queda aprobada y avisada", a: [0.52, 1] },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y="356" width={p.w} height="40" rx="20" fill="#f5f1e6" />
          <Txt x={p.x + p.w / 2} y={381} size={13.5} weight={600} fill={C.mute}>{p.label}</Txt>
          <S {...(i === 0 ? { t: [0, 0.29, 0.32, 1], opacity: [1, 1, 0, 0] } : i === 1 ? win(0.3, 0.5) : { t: [0, 0.5, 0.53, 0.96, 0.985, 1], opacity: [0, 0, 1, 1, 0, 0] })}>
            <rect x={p.x} y="356" width={p.w} height="40" rx="20" fill={[C.amber, C.violet, C.green][i]} />
            <Txt x={p.x + p.w / 2} y={381} size={13.5} weight={700} fill="#fff">{p.label}</Txt>
          </S>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════ 2. DOCUMENTOS Y FORMULARIOS ═══════════════
   Se rellena el formulario → los datos se ordenan solos → se genera el documento. */
export function FlowDocs() {
  const id = "fd";
  const campos = [
    { y: 128, nombre: "Nombre", col: C.violet, a: 0.05, b: 0.15, w: 130 },
    { y: 198, nombre: "Importe", col: C.blue, a: 0.2, b: 0.3, w: 90 },
    { y: 268, nombre: "Fecha", col: C.amber, a: 0.35, b: 0.45, w: 110 },
  ];
  const filas = [170, 214, 258];
  return (
    <svg viewBox="0 0 900 440" className="h-auto w-full" role="img" aria-label="Un formulario genera un documento">
      <Shadow id={id} />
      {/* formulario */}
      <rect x="50" y="64" width="250" height="278" rx="18" fill="#fff" stroke="#eae4d3" filter={`url(#${id}-sh)`} />
      <Txt x={72} y={98} size={14} weight={700} anchor="start">Formulario</Txt>
      {campos.map((c, i) => (
        <g key={i}>
          <Txt x={74} y={c.y + 6} size={12} weight={600} fill={C.mute} anchor="start">{c.nombre}</Txt>
          <rect x="74" y={c.y + 14} width="204" height="34" rx="9" fill="#f5f1e6" />
          <S as="rect" x="80" y={c.y + 22} width={c.w} height="18" rx="6" fill={c.col} origin="0% 50%" t={[0, c.a, c.b, 0.93, 0.97, 1]} scaleX={[0, 0, 1, 1, 0, 0]} />
        </g>
      ))}

      {/* datos que viajan */}
      {campos.map((c, i) => (
        <S key={i} t={[0, c.b - 0.001, c.b, c.b + 0.08, c.b + 0.09, 1]} mx={[0, 0, 0, 128, 128, 128]} my={[0, 0, 0, filas[i] - (c.y + 31), filas[i] - (c.y + 31), 0]} opacity={[0, 0, 1, 1, 0, 0]}>
          <circle cx="284" cy={c.y + 31} r="9" fill={c.col} /><circle cx="284" cy={c.y + 31} r="16" fill={c.col} opacity=".22" />
        </S>
      ))}

      {/* tabla de datos */}
      <rect x="388" y="104" width="150" height="198" rx="16" fill="#fff" stroke="#eae4d3" filter={`url(#${id}-sh)`} />
      <rect x="388" y="104" width="150" height="34" rx="16" fill={C.ink} />
      <rect x="388" y="122" width="150" height="16" fill={C.ink} />
      <Txt x={463} y={126} size={13} weight={700} fill="#fff">Datos</Txt>
      {filas.map((y, i) => (
        <g key={i}>
          <rect x="404" y={y - 10} width="118" height="24" rx="7" fill="#f5f1e6" />
          <S {...from(campos[i].b + 0.08)}>
            <rect x="404" y={y - 10} width="118" height="24" rx="7" fill={campos[i].col} opacity=".16" />
            <circle cx="418" cy={y + 2} r="5" fill={campos[i].col} />
            <rect x="430" y={y - 3} width={[70, 50, 62][i]} height="10" rx="5" fill={campos[i].col} opacity=".75" />
          </S>
        </g>
      ))}

      {/* de la tabla al documento */}
      <path d="M548 204 H606" stroke={C.line} strokeWidth="3" strokeDasharray="6 8" fill="none" className="fp-dashflow" />
      <S t={[0, 0.55, 0.56, 0.63, 0.64, 1]} mx={[0, 0, 0, 54, 54, 54]} opacity={[0, 0, 1, 1, 0, 0]}>
        <circle cx="552" cy="204" r="8" fill={C.teal} /><circle cx="552" cy="204" r="15" fill={C.teal} opacity=".22" />
      </S>

      {/* documento */}
      <rect x="610" y="64" width="240" height="278" rx="16" fill="#fff" stroke="#eae4d3" filter={`url(#${id}-sh)`} />
      <rect x="634" y="90" width="92" height="14" rx="7" fill={C.ink} />
      <rect x="634" y="112" width="60" height="8" rx="4" fill={C.line} />
      {[0, 1, 2, 3, 4].map((i) => (
        <S key={i} as="rect" x="634" y={146 + i * 30} width={[190, 170, 188, 150, 100][i]} height="12" rx="6" fill={i === 0 ? C.violet : "#ddd6c4"} origin="0% 50%" t={[0, 0.6 + i * 0.05, 0.64 + i * 0.05, 0.95, 0.98, 1]} scaleX={[0, 0, 1, 1, 0, 0]} />
      ))}
      <S t={[0, 0.86, 0.9, 0.94, 0.97, 1]} scale={[0, 0, 1.25, 1, 1, 0]} opacity={[0, 0, 1, 1, 1, 0]}>
        <circle cx="808" cy="298" r="26" fill={C.green} /><path d="M796 298 l9 10 l17 -20" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </S>

      {/* etiquetas */}
      <Txt x={175} y={382}>Formulario</Txt><Txt x={175} y={402} size={12.5} weight={500} fill={C.mute}>Se rellena una sola vez</Txt>
      <Txt x={463} y={382}>Datos organizados</Txt><Txt x={463} y={402} size={12.5} weight={500} fill={C.mute}>Sin copiar y pegar</Txt>
      <Txt x={730} y={382}>Documento generado</Txt><Txt x={730} y={402} size={12.5} weight={500} fill={C.mute}>Listo para enviar</Txt>
    </svg>
  );
}

/* ═══════════════ 3. RECORDATORIOS Y SEGUIMIENTO ═══════════════
   Se acerca el plazo → suena el aviso → el equipo avanza y se ve el estado de cada tarea. */
export function FlowReminders() {
  const id = "fr";
  const filas = [
    { y: 128, col: C.violet, done: 0.66 },
    { y: 198, col: C.teal, done: 0.78 },
    { y: 268, col: C.rose, done: 0.9 },
  ];
  return (
    <svg viewBox="0 0 900 440" className="h-auto w-full" role="img" aria-label="Un aviso automático y el seguimiento de cada tarea">
      <Shadow id={id} />
      {/* calendario */}
      <rect x="50" y="64" width="250" height="278" rx="18" fill="#fff" stroke="#eae4d3" filter={`url(#${id}-sh)`} />
      <rect x="50" y="64" width="250" height="46" rx="18" fill={C.rose} />
      <rect x="50" y="90" width="250" height="20" fill={C.rose} />
      <Txt x={72} y={94} size={15} weight={700} fill="#fff" anchor="start">Plazo</Txt>
      {Array.from({ length: 28 }).map((_, i) => {
        const cx = 72 + (i % 7) * 30, cy = 140 + Math.floor(i / 7) * 32;
        return <rect key={i} x={cx} y={cy} width="22" height="22" rx="7" fill={i === 18 ? C.rose : "#f5f1e6"} />;
      })}
      <S as="rect" x="192" y="204" width="22" height="22" rx="7" fill="none" stroke={C.rose} strokeWidth="3" t={[0, 0.1, 0.2, 0.3, 0.45, 1]} scale={[1, 1.5, 1, 1.5, 1, 1]} opacity={[0.9, 0.2, 0.9, 0.2, 0.9, 0.9]} />
      <S {...win(0, 0.3)}><Txt x={175} y={330} size={13} weight={700} fill={C.rose}>Vence en 2 días</Txt></S>
      <S {...win(0.3, 0.97)}><Txt x={175} y={330} size={13} weight={700} fill={C.green}>Aviso enviado al equipo</Txt></S>

      {/* campana */}
      <path d="M312 204 H388" stroke={C.line} strokeWidth="3" strokeDasharray="6 8" fill="none" className="fp-dashflow" />
      <path d="M512 204 H588" stroke={C.line} strokeWidth="3" strokeDasharray="6 8" fill="none" className="fp-dashflow" />
      {[0.3, 0.36].map((a, i) => (
        <S key={i} as="circle" cx="450" cy="204" r="58" fill="none" stroke={C.amber} strokeWidth="3" t={[0, a, a + 0.22, 1]} scale={[0.7, 0.7, 1.7, 1.7]} opacity={[0, 0.7, 0, 0]} />
      ))}
      <circle cx="450" cy="204" r="58" fill="#fffbeb" stroke="#fde68a" strokeWidth="3" filter={`url(#${id}-sh)`} />
      <S t={[0, 0.29, 0.31, 0.33, 0.35, 0.37, 0.39, 0.41, 0.43, 1]} rotate={[0, 0, -16, 16, -14, 14, -9, 9, 0, 0]} origin="50% 10%">
        <g transform="translate(450 206) scale(1.5)"><Bell /></g>
      </S>
      {/* avisos que salen */}
      {[0, 1, 2].map((i) => (
        <S key={i} t={[0, 0.45 + i * 0.012, 0.46 + i * 0.012, 0.54 + i * 0.012, 0.55 + i * 0.012, 1]} mx={[0, 0, 0, 100, 100, 100]} my={[0, 0, 0, (filas[i].y + 18 - 204) * 0.9, (filas[i].y + 18 - 204) * 0.9, 0]} opacity={[0, 0, 1, 1, 0, 0]}>
          <rect x="514" y="196" width="28" height="18" rx="5" fill={C.blue} /><path d="M516 199 l12 8 l12 -8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </S>
      ))}

      {/* seguimiento */}
      <rect x="600" y="64" width="250" height="278" rx="18" fill="#fff" stroke="#eae4d3" filter={`url(#${id}-sh)`} />
      <Txt x={622} y={98} size={14} weight={700} anchor="start">Seguimiento</Txt>
      {filas.map((f, i) => (
        <g key={i}>
          <circle cx="640" cy={f.y + 18} r="16" fill={f.col} opacity=".18" /><circle cx="640" cy={f.y + 14} r="5.5" fill={f.col} />
          <path d={`M630 ${f.y + 30} C631 ${f.y + 22} 649 ${f.y + 22} 650 ${f.y + 30}`} stroke={f.col} strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="664" y={f.y + 8} width="66" height="9" rx="4.5" fill="#ddd6c4" />
          <rect x="664" y={f.y + 22} width="44" height="7" rx="3.5" fill="#eae4d3" />
          {/* estados */}
          <S t={[0, 0.51, 0.52, 1]} opacity={[1, 1, 0, 0]}>
            <rect x="752" y={f.y + 6} width="80" height="26" rx="13" fill="#fef3c7" /><Txt x={792} y={f.y + 24} size={11.5} weight={700} fill="#b45309">Pendiente</Txt>
          </S>
          <S t={[0, 0.51, 0.52, f.done - 0.01, f.done, 1]} opacity={[0, 0, 1, 1, 0, 0]}>
            <rect x="752" y={f.y + 6} width="80" height="26" rx="13" fill="#ece7da" /><Txt x={792} y={f.y + 24} size={11.5} weight={700} fill="#5f5844">En curso</Txt>
          </S>
          <S t={[0, f.done - 0.01, f.done, 0.96, 0.985, 1]} opacity={[0, 0, 1, 1, 0, 0]}>
            <rect x="752" y={f.y + 6} width="80" height="26" rx="13" fill="#dcfce7" /><Txt x={792} y={f.y + 24} size={11.5} weight={700} fill="#15803d">✓ Hecho</Txt>
          </S>
        </g>
      ))}
      <rect x="624" y="318" width="202" height="9" rx="4.5" fill="#eae4d3" />
      <S as="rect" x="624" y="318" width="202" height="9" rx="4.5" fill={C.green} origin="0% 50%" t={[0, 0.52, 0.66, 0.78, 0.9, 0.96, 1]} scaleX={[0, 0, 0.33, 0.66, 1, 1, 0]} />

      {/* etiquetas */}
      <Txt x={175} y={382}>Plazo</Txt><Txt x={175} y={402} size={12.5} weight={500} fill={C.mute}>Nadie depende de la memoria</Txt>
      <Txt x={450} y={382}>Aviso automático</Txt><Txt x={450} y={402} size={12.5} weight={500} fill={C.mute}>Llega solo a cada persona</Txt>
      <Txt x={725} y={382}>Estado de cada tarea</Txt><Txt x={725} y={402} size={12.5} weight={500} fill={C.mute}>Se ve qué falta y quién lo lleva</Txt>
    </svg>
  );
}
