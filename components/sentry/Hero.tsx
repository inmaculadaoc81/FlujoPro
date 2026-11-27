import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroBloque from "./HeroBloque";

const HERRAMIENTAS = [
  { src: "WhatsApp", clase: "font-semibold" },
  { src: "Google Sheets", clase: "font-medium" },
  { src: "Drive", clase: "font-semibold" },
  { src: "Notion", clase: "font-bold" },
  { src: "n8n", clase: "font-bold" },
];

/** Escribe el texto letra a letra, cada una saliendo del desenfoque. Las palabras no se parten. */
function Escrito({ texto, inicio, paso }: { texto: string; inicio: number; paso: number }) {
  let n = 0;
  return (
    <span aria-hidden>
      {texto.split(" ").map((palabra, i, todas) => (
        <span key={i}>
          <span className="inline-block whitespace-nowrap">
            {[...palabra].map((letra, j) => (
              <span key={j} className="fx-letra" style={{ animationDelay: `${(inicio + paso * n++).toFixed(3)}s` }}>{letra}</span>
            ))}
          </span>
          {i < todas.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="fx-noche relative flex min-h-[max(100svh,720px)] flex-col overflow-hidden px-5 text-white md:px-[4.6%]">
      <div className="fx-aura" aria-hidden />

      <div className="relative z-10 grid flex-1 items-start pt-[112px] lg:pt-[150px]">
        <div className="max-w-[860px]">
          <div className="fx-entra flex flex-wrap items-center gap-2.5" style={{ animationDelay: "1s" }}>
            <span className="fx-sello fx-sello-lleno">Automatización de flujos de trabajo</span>
            <span className="fx-sello"><span className="text-white/45">WhatsApp:</span> <i className="fx-punto" /> Atención 24 h</span>
          </div>

          <h1 className="fx-titular mt-6" aria-label="Tu equipo no necesita más tareas. Necesita fluidez.">
            <span className="block text-white/55"><Escrito texto="Tu equipo no necesita" inicio={0.65} paso={0.031} /> <br className="hidden sm:block" /><Escrito texto="más tareas." inicio={1.33} paso={0.027} /></span>
            <span className="block text-white"><Escrito texto="Necesita fluidez." inicio={1.55} paso={0.034} /></span>
          </h1>

          <p className="fx-entra mt-6 max-w-[500px] text-[16px] leading-relaxed text-white/60 md:text-[18px]" style={{ animationDelay: "1.5s" }}>
            Convertimos las tareas que se repiten cada día en flujos claros, conectados y fáciles de seguir.
          </p>

          <div className="fx-entra mt-10" style={{ animationDelay: "1.6s" }}>
            <Link href="#agendar" className="fx-boton group">
              <span className="fx-boton-texto">Agendar una cita</span>
              <span className="fx-boton-flecha"><ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-0 mx-auto -mt-2 w-full max-w-[620px] lg:absolute lg:top-[17%] lg:right-[1.5%] lg:mt-0 lg:w-[54%] lg:max-w-[900px]">
        <HeroBloque />
      </div>

      <div className="fx-entra relative z-10 pt-6 pb-9" style={{ animationDelay: "1.55s" }}>
        <p className="text-[11px] tracking-[0.02em] text-white/55 uppercase">Conectamos las herramientas que ya usáis</p>
        <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-3 text-[19px] tracking-tight text-white md:gap-x-14 md:text-[22px]">
          {HERRAMIENTAS.map((h) => <li key={h.src} className={h.clase}>{h.src}</li>)}
        </ul>
      </div>
    </section>
  );
}
