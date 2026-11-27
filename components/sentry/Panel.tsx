"use client";
// Tercera pantalla del diseño: titular y panel de datos que entra por piezas. Los datos son un EJEMPLO y así se indica en pantalla.
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

const SUAVE: [number, number, number, number] = [0.22, 0.7, 0.25, 1];
const aparece: Variants = { oculto: { opacity: 0, y: 34 }, visible: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: SUAVE } }) };

const COLUMNAS = 32;
const FILAS = 11;
const TONOS = ["#dbe4f8", "#bcd0f6", "#8fb1f2", "#4f86ea", "#2f6fe0"];
/** Reparto fijo (no aleatorio) para que servidor y navegador pinten lo mismo. */
const nivel = (c: number, f: number) => {
  const v = (c * 37 + f * 91 + c * f * 13) % 97;
  const intensa = c % 5 === 0 || c > 26 || (c > 7 && c < 11 && f < 6);
  return intensa ? 2 + (v % 3) : v < 70 ? v % 2 : 2 + (v % 3);
};

function Mapa() {
  return (
    <svg viewBox={`0 0 ${COLUMNAS * 12} ${FILAS * 10}`} className="mt-5 h-auto w-full" aria-hidden>
      {Array.from({ length: COLUMNAS }, (_, c) => (
        <motion.g key={c} variants={{ oculto: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.35, delay: 0.7 + c * 0.028 } } }}>
          {Array.from({ length: FILAS }, (_, f) => <rect key={f} x={c * 12} y={f * 10} width="8.4" height="8" rx="2" fill={TONOS[nivel(c, f)]} />)}
        </motion.g>
      ))}
    </svg>
  );
}

const ONDA = (k: number) => {
  const m = 90, a = (v: number) => +(v * k).toFixed(1);
  const arriba = `M0 ${m - a(3)} C60 ${m - a(4)} 80 ${m - a(34)} 150 ${m - a(38)} S215 ${m - a(70)} 270 ${m - a(68)} S345 ${m - a(36)} 400 ${m - a(34)} S455 ${m - a(46)} 480 ${m - a(44)}`;
  const abajo = `L480 ${m + a(44)} C455 ${m + a(46)} 455 ${m + a(34)} 400 ${m + a(34)} S325 ${m + a(70)} 270 ${m + a(68)} S205 ${m + a(36)} 150 ${m + a(38)} S60 ${m + a(4)} 0 ${m + a(3)} Z`;
  return `${arriba} ${abajo}`;
};

function Recorrido() {
  return (
    <>
      <svg viewBox="0 0 480 180" className="mt-3 h-auto w-full" aria-hidden>
        <motion.g variants={{ oculto: { clipPath: "inset(0 100% 0 0)" }, visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.5, delay: 0.85, ease: "easeInOut" } } }}>
          {[[1, 0.16], [0.8, 0.22], [0.6, 0.3], [0.42, 0.42], [0.25, 0.85]].map(([k, o]) => <path key={k} d={ONDA(k)} fill="#3f7ee8" fillOpacity={o} className="fx-onda" />)}
        </motion.g>
        {[[150, "100"], [270, "92"], [390, "87"]].map(([x, t], i) => (
          <motion.g key={t} variants={{ oculto: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, delay: 1.6 + i * 0.22, ease: SUAVE } } }}>
            <rect x={+x - 1.5} y="12" width="3" height="156" fill="#fff" />
            <rect x={+x - 22} y="78" width="44" height="24" rx="12" fill="#45474f" />
            <text x={+x} y="94.5" textAnchor="middle" fontSize="12.5" fill="#fff">{t}</text>
          </motion.g>
        ))}
      </svg>
      <div className="grid grid-cols-4 text-center text-[11.5px] text-[#9498a8]"><span>Recibida</span><span>Revisada</span><span>Aprobada</span><span>Archivada</span></div>
    </>
  );
}

const AVISOS = [
  { t: "Aprobación de gastos", e: "Pendiente", tono: "rojo", l: ["Falta la firma de la persona responsable", "Recordatorio enviado automáticamente"] },
  { t: "Facturas recibidas", e: "Completado", tono: "verde", l: ["Datos leídos y copiados a la hoja", "Documento archivado en su carpeta"] },
  { t: "Alta de un cliente", e: "Completado", tono: "verde", l: ["Formulario recibido y ficha creada", "El equipo recibe el aviso al momento"] },
];

export default function Panel() {
  return (
    <section className="relative overflow-hidden px-5 pt-20 pb-24 md:px-[4.6%] md:pt-28">
      <motion.div initial="oculto" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
        <motion.h2 className="fx-h2" variants={aparece} custom={0}>Tu equipo ya sabe<span className="fx-azul fx-azul-inv block">qué le quita tiempo.</span></motion.h2>
        <motion.p className="fx-entradilla" variants={aparece} custom={0.25}>Convertimos esa sensación en un flujo claro: cada paso, cada aviso y quién lo lleva.</motion.p>
        <motion.div variants={aparece} custom={0.4}>
          <Link href="#agendar" className="fx-enlace group mt-6">Cuéntanos tu proceso <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
        </motion.div>
      </motion.div>

      <motion.div className="relative mt-16 lg:mt-24 lg:min-h-[560px]" initial="oculto" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="fx-bandeja grid gap-4 p-3 md:grid-cols-2 lg:mt-24 lg:w-[76%] lg:p-5" variants={aparece} custom={0.1}>
          <motion.article className="fx-dato" variants={aparece} custom={0.35}>
            <h3 className="flex items-center gap-2.5 text-[15.5px] text-[#26272c]"><FileText size={16} /> Tareas hechas por el flujo, día a día</h3>
            <div className="mt-5 flex flex-wrap gap-x-10 gap-y-2">
              <p><b className="fx-cifra">1.240</b><span className="fx-nota">Pasos ejecutados</span></p>
              <p><b className="fx-cifra">1.178</b><span className="fx-nota">Sin tocar nada a mano</span></p>
            </div>
            <Mapa />
            <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-[#9498a8]">Menos {TONOS.slice(0, 4).map((c) => <i key={c} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: c }} />)} Más</div>
          </motion.article>
          <motion.article className="fx-dato" variants={aparece} custom={0.55}>
            <h3 className="flex items-center gap-2.5 text-[15.5px] text-[#26272c]"><FileText size={16} /> Recorrido de las solicitudes</h3>
            <p className="fx-nota mt-5">De cada 100 que entran, cuántas llegan a cada paso</p>
            <Recorrido />
          </motion.article>
        </motion.div>

        <motion.aside className="fx-resumen mt-4 lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:w-[34%] lg:min-w-[380px]" variants={{ oculto: { opacity: 0, y: 90 }, visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1.05, ease: SUAVE } } }}>
          <div className="flex items-center justify-between gap-3"><h3 className="text-[18px] text-[#26272c]">Resumen de la semana</h3><span className="fx-fecha">Ejemplo</span></div>
          <p className="fx-linea mt-6">Flujos en marcha</p>
          <ul>
            {AVISOS.map((a, i) => (
              <motion.li key={a.t} className="mt-6" variants={aparece} custom={1.4 + i * 0.22}>
                <p className="flex flex-wrap items-center gap-2.5 text-[14.5px] text-[#26272c]">{a.t}<span className={`fx-estado fx-${a.tono}`}>{a.e}</span></p>
                {a.l.map((l) => <p key={l} className="mt-1.5 text-[12.5px] leading-snug text-[#7b8092]">· {l}</p>)}
              </motion.li>
            ))}
          </ul>
        </motion.aside>
      </motion.div>

      <p className="mt-6 text-[12px] text-[#9498a8]">Panel ilustrativo: las cifras y los avisos son datos de ejemplo, no resultados de clientes.</p>
    </section>
  );
}
