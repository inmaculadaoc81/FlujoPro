"use client";
// «Cómo funciona»: cuatro dibujos isométricos de línea que se construyen uno detrás de otro (como en el vídeo de referencia).
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const C = 0.866;
const LINEA = "#7a7e90";
const AZUL = "#3f5ff2";
const SUAVE: [number, number, number, number] = [0.22, 0.7, 0.25, 1];

const p = (a: number[][]) => a.map((v) => v.join(",")).join(" ");

/** Caja isométrica: (cx, cy) es el centro de su base, `a` medio lado y `h` altura. */
function Caja({ cx, cy, a, h, relleno = "#eef0f9" }: { cx: number; cy: number; a: number; h: number; relleno?: string }) {
  const w = 2 * a * C;
  const t = cy - h;
  return (
    <g stroke={LINEA} strokeWidth="0.9" strokeLinejoin="round">
      <polygon points={p([[cx - w, t], [cx, t + a], [cx, cy + a], [cx - w, cy]])} fill={relleno} />
      <polygon points={p([[cx, t + a], [cx + w, t], [cx + w, cy], [cx, cy + a]])} fill="#e6e9f6" />
      <polygon points={p([[cx, t - a], [cx + w, t], [cx, t + a], [cx - w, t]])} fill="#f4f5fc" />
    </g>
  );
}

/** Trama de puntos tumbada sobre una cara superior. */
function Puntos({ cx, cy, n = 5, paso = 5, color = AZUL }: { cx: number; cy: number; n?: number; paso?: number; color?: string }) {
  const m = (n - 1) / 2;
  return (
    <g fill={color}>
      {Array.from({ length: n * n }, (_, k) => {
        const x = (k % n) - m, y = Math.floor(k / n) - m;
        return <circle key={k} cx={+(cx + (x - y) * C * paso).toFixed(2)} cy={+(cy + (x + y) * 0.5 * paso).toFixed(2)} r="0.95" />;
      })}
    </g>
  );
}

const Foco = ({ cx, cy, r = 32 }: { cx: number; cy: number; r?: number }) => <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.56} fill="#6d8bf7" fillOpacity=".2" />;
const Testigos = ({ x, y }: { x: number; y: number }) => <g fill={AZUL}>{[0, 1, 2, 3].map((i) => <circle key={i} cx={x + i * 6} cy={y - i * 3.5} r="1.3" />)}</g>;
const Suelo = () => <path d="M42 262 L158 329 M142 329 L258 262 M42 276 L66 262 M234 262 L258 276" stroke="#b9bed1" strokeWidth="0.8" fill="none" />;

const aparece: Variants = { oculto: { opacity: 0, y: 16 }, visible: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: SUAVE } }) };
const trazo: Variants = { oculto: { pathLength: 0, opacity: 0 }, visible: (d: number = 0) => ({ pathLength: 1, opacity: 1, transition: { duration: 0.9, delay: d, ease: "easeInOut" } }) };

/* 01 · capas que empiezan apiladas y se separan */
function Capas({ d }: { d: number }) {
  return (
    <>
      <path d="M82 246 L150 285 L218 246 L150 207 Z" fill="#c9ccda" fillOpacity=".55" />
      <motion.path d="M82 98 V236 M218 98 V236" stroke={LINEA} strokeWidth="0.8" strokeDasharray="1.5 4" fill="none" variants={aparece} custom={d + 0.9} />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g key={i} variants={{ oculto: { opacity: 0, y: i * 24 }, visible: { opacity: 1, y: 0, transition: { opacity: { duration: 0.4, delay: d }, y: { duration: 1, delay: d + 0.45, ease: SUAVE } } } }}>
          <Caja cx={150} cy={238 - i * 35} a={68} h={11} />
          <Testigos x={162} y={238 - i * 35 + 56} />
          {i === 4 && (<><Foco cx={150} cy={87 + 0} r={38} /><Puntos cx={150} cy={87} /></>)}
        </motion.g>
      ))}
    </>
  );
}

/* 02 · piezas que se colocan y se conectan */
function Conexiones({ d }: { d: number }) {
  return (
    <>
      <motion.path d="M62 78 V218 M138 78 V135 M143 140 V262 M219 140 V222" stroke={LINEA} strokeWidth="0.8" strokeDasharray="1.5 4" fill="none" variants={aparece} custom={d + 0.8} />
      <path d="M62 262 L112 290 L158 264 L108 236 Z" fill="#c9ccda" fillOpacity=".5" />
      <motion.g variants={aparece} custom={d}><Caja cx={100} cy={82} a={44} h={13} /><Puntos cx={100} cy={69} color="#c4c9dc" /></motion.g>
      <motion.g variants={aparece} custom={d + 0.2}><Caja cx={181} cy={146} a={44} h={13} /><Puntos cx={181} cy={133} color="#c4c9dc" /></motion.g>
      <motion.g variants={aparece} custom={d + 0.4}><Caja cx={100} cy={226} a={44} h={13} /><Puntos cx={100} cy={213} color="#c4c9dc" /></motion.g>
      <motion.g variants={aparece} custom={d + 0.55}><Caja cx={140} cy={279} a={44} h={13} /><Foco cx={140} cy={266} r={22} /><Puntos cx={140} cy={266} n={4} paso={4} /></motion.g>
      <g stroke={AZUL} strokeWidth="1.3" fill="none">
        <motion.path d="M124 84 L132 89 V101 L158 116" variants={trazo} custom={d + 0.9} />
        <motion.path d="M162 148 L152 154 V222 L136 231 L124 224" variants={trazo} custom={d + 1.3} />
      </g>
      <motion.g fill={AZUL} variants={aparece} custom={d + 1.7}><circle cx="124" cy="84" r="2.6" /><circle cx="162" cy="148" r="2.6" /><circle cx="124" cy="224" r="2.6" /></motion.g>
    </>
  );
}

/* 03 · muchas tareas sueltas que entran en un solo flujo */
const NUBE = [[150, 44], [122, 60], [178, 60], [94, 76], [150, 76], [206, 76], [66, 92], [122, 92], [178, 92], [234, 92], [94, 108], [150, 108], [206, 108], [122, 124], [178, 124], [150, 140]];
function Embudo({ d }: { d: number }) {
  return (
    <>
      <motion.g variants={aparece} custom={d}>
        <Caja cx={150} cy={252} a={70} h={66} />
        <Testigos x={158} y={311} />
        <Foco cx={150} cy={186} r={34} />
      </motion.g>
      <motion.path d="M66 96 V188 M234 96 V188" stroke={LINEA} strokeWidth="0.8" strokeDasharray="1.5 4" fill="none" variants={aparece} custom={d + 1} />
      {NUBE.map(([x, y], i) => (
        <motion.g key={i} variants={{ oculto: { opacity: 0, y: -34 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: d + 0.35 + i * 0.05, ease: SUAVE } } }}>
          <g className="fx-vaiven" style={{ animationDelay: `${(i % 5) * -0.7}s` }}><Caja cx={x} cy={y} a={10} h={8} /></g>
        </motion.g>
      ))}
      <motion.g variants={aparece} custom={d + 1.3}>
        <g className="fx-cae"><Caja cx={150} cy={152} a={9} h={7} relleno="#cdd8ff" /></g>
        <circle cx="150" cy="186" r="3.2" fill={AZUL} />
      </motion.g>
    </>
  );
}

/* 04 · el flujo se revisa y se ajusta: piezas que giran en un ciclo */
function Ciclo({ d }: { d: number }) {
  return (
    <>
      <motion.g variants={aparece} custom={d}><Caja cx={150} cy={262} a={80} h={19} /><Puntos cx={150} cy={243} n={6} paso={9} color="#c4c9dc" /><Testigos x={156} y={337} /></motion.g>
      <g fill="none" stroke={LINEA} strokeWidth="0.9">
        <motion.path d="M118 129 C60 136 30 166 36 196 C40 218 62 232 88 240" variants={trazo} custom={d + 0.9} />
        <motion.path d="M182 129 C240 136 270 166 264 196 C260 218 238 232 212 240" variants={trazo} custom={d + 0.9} />
        <motion.path d="M80 234 L89 240 L79 243 M220 234 L211 240 L221 243" variants={aparece} custom={d + 1.8} />
      </g>
      <motion.g variants={aparece} custom={d + 0.3}><g className="fx-vaiven"><Caja cx={150} cy={170} a={40} h={14} /><Foco cx={150} cy={156} r={18} /><Puntos cx={150} cy={156} n={5} paso={4} /></g></motion.g>
      <motion.g variants={aparece} custom={d + 0.55}><g className="fx-vaiven" style={{ animationDelay: "-2s" }}><Caja cx={150} cy={86} a={40} h={14} /><Puntos cx={150} cy={72} n={5} paso={4} /></g></motion.g>
      <motion.g variants={aparece} custom={d + 1.6} fill={AZUL}>
        <circle r="3"><animateMotion dur="5s" repeatCount="indefinite" path="M118 129 C60 136 30 166 36 196 C40 218 62 232 88 240" /></circle>
        <circle r="3"><animateMotion dur="5s" begin="-2.5s" repeatCount="indefinite" path="M212 240 C238 232 260 218 264 196 C270 166 240 136 182 129" /></circle>
      </motion.g>
    </>
  );
}

const PASOS = [
  { t: "Entendemos tu proceso", d: "Nos cuentas qué tarea se repite y dónde se pierde tiempo; analizamos cómo trabajáis de verdad.", Dibujo: Capas },
  { t: "Diseñamos el flujo", d: "Definimos pasos, conexiones y responsables para que cada tarea llegue a quien corresponde.", Dibujo: Conexiones },
  { t: "Lo ponemos en marcha", d: "Configuramos y comprobamos el recorrido completo. Tu equipo gana tiempo desde el primer día.", Dibujo: Embudo },
  { t: "Lo mantenemos al día", d: "Revisamos que el flujo siga funcionando y lo ajustamos cuando cambian vuestras necesidades.", Dibujo: Ciclo },
];

export default function Pasos() {
  return (
    <section id="como-funciona" className="fx-cielo relative pt-[130px] pb-16 md:pt-[170px]">
      <motion.div className="px-5 md:px-[4.6%]" initial="oculto" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
        <motion.h2 className="fx-h2" variants={aparece} custom={0}>Del «siempre lo hacemos así»<span className="fx-azul block">al ya está hecho.</span></motion.h2>
        <motion.p className="fx-entradilla" variants={aparece} custom={0.35}>Primero entendemos tu proceso. Después diseñamos el flujo que lo hace más sencillo.</motion.p>
      </motion.div>

      <ol className="mt-14 grid border-y border-white/90 sm:grid-cols-2 xl:mx-2.5 xl:grid-cols-4">
        {PASOS.map(({ t, d, Dibujo }, i) => (
          <motion.li key={t} className="fx-columna" initial="oculto" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <motion.span className="fx-log" variants={aparece} custom={i * 0.15}>PASO 0{i + 1}</motion.span>
            <svg viewBox="0 0 300 350" className="mx-auto mt-3 block h-auto w-full max-w-[290px] overflow-visible" aria-hidden>
              <motion.g variants={aparece} custom={i * 0.3}><Suelo /></motion.g>
              <Dibujo d={0.15 + i * 0.3} />
            </svg>
            <motion.h3 className="mt-6 text-[19px] tracking-[-0.02em] text-[#26272c]" variants={aparece} custom={0.5 + i * 0.3}>{t}</motion.h3>
            <motion.p className="mt-3 max-w-[300px] text-[14.5px] leading-[1.45] text-[#6f7384]" variants={aparece} custom={0.65 + i * 0.3}>{d}</motion.p>
          </motion.li>
        ))}
      </ol>

      <div className="mt-14 px-5 md:px-[4.6%]">
        <Link href="#servicios" className="fx-enlace group">Ver soluciones <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
      </div>
    </section>
  );
}
