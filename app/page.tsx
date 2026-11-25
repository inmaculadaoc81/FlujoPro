import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, FileText, Link2, Hourglass, ShieldCheck, Plus, MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import Reserva from "@/components/Reserva";
import UseCases from "@/components/UseCases";
import { StepUnderstand, StepDesign, StepRun } from "@/components/iso/Steps";
import { Reveal, Parallax, HatchBand } from "@/components/anim/Reveal";
import {
  HeroScene, SceneWorkflow, SceneApps, SceneDocs, SceneApproval, ScenePuzzle, SceneReminders, SceneWhy, SceneIntegrations, SceneLaunch,
} from "@/components/iso/Scenes";

const WA = "https://api.whatsapp.com/send?phone=34606806376&text=Hola%2C%20FlujoPro.%20Quiero%20automatizar%20un%20proceso.";
const RESENAS = "https://maps.app.goo.gl/NbdVhk4eLpygfeV88";

const HERRAMIENTAS = ["Correo", "Hojas de cálculo", "WhatsApp", "CRM", "Formularios", "Documentos", "Calendario"];

const PASOS: { n: string; t: string; d: string; art: ReactNode }[] = [
  { n: "1", t: "Entendemos tu proceso", d: "Nos cuentas qué tarea se repite y dónde se pierde tiempo; analizamos cómo trabajáis de verdad.", art: <StepUnderstand /> },
  { n: "2", t: "Diseñamos el flujo", d: "Definimos pasos, conexiones y responsables para que cada tarea llegue a quien corresponde.", art: <StepDesign /> },
  { n: "3", t: "Lo ponemos en marcha", d: "Configuramos y comprobamos el recorrido completo. Tu equipo gana tiempo desde el primer día.", art: <StepRun /> },
];

const FAQ = [
  { q: "¿Cuánto tarda en ponerse en marcha un flujo?", a: "Depende del proceso y de las herramientas que conecte. Un flujo sencillo puede estar listo en una o dos semanas; los procesos más amplios se planifican por fases." },
  { q: "¿Tengo que cambiar las herramientas que uso?", a: "No. Conectamos las que ya tenéis (correo, hojas de cálculo, CRM, formularios…) para que compartan la información sin copiar y pegar." },
  { q: "¿Qué tipo de tareas se pueden automatizar?", a: "Aprobaciones, avisos y recordatorios, captura de datos de formularios, generación de documentos y el paso de información entre aplicaciones." },
  { q: "¿Incluye soporte y mantenimiento?", a: "Sí. Revisamos que el flujo siga funcionando y lo ajustamos cuando cambian vuestras necesidades." },
  { q: "¿Cómo empiezo?", a: "Agenda una cita gratuita o escríbenos por WhatsApp: nos cuentas el proceso que te quita tiempo y te proponemos cómo simplificarlo." },
];

function Pill({ children, glow = false }: { children: ReactNode; glow?: boolean }) {
  return <span className={`fp-pill ${glow ? "fp-pill-glow" : ""}`}>{children}</span>;
}
const Hatch = HatchBand;
function Cabecera({ pill, titulo, texto, centrado = true }: { pill: string; titulo: string; texto?: string; centrado?: boolean }) {
  return (
    <Reveal className={`px-5 pb-12 pt-20 md:px-9 ${centrado ? "text-center" : ""}`}>
      <Pill>{pill}</Pill>
      <h2 className={`fp-title mt-5 text-[34px] md:text-[48px] ${centrado ? "mx-auto max-w-[760px]" : "max-w-[760px]"}`}>{titulo}</h2>
      {texto ? <p className={`mt-4 text-[16px] leading-relaxed text-[#5b6168] ${centrado ? "mx-auto max-w-[560px]" : "max-w-[560px]"}`}>{texto}</p> : null}
    </Reveal>
  );
}
function Tarjeta({ titulo, texto, children, className = "", delay = 0 }: { titulo: string; texto: string; children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} y={36} className={`fp-card flex flex-col overflow-hidden ${className}`}>
      <div className="px-6 pb-2 pt-6">
        <h3 className="text-[19px] font-medium tracking-tight text-white">{titulo}</h3>
        <p className="mt-2.5 max-w-[34rem] text-[14px] leading-snug text-[#5b6168]">{texto}</p>
      </div>
      <div className="mt-auto flex flex-1 items-end justify-center px-4 pb-4 pt-2">{children}</div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-clip bg-white text-[#0b0d10]">
      {/* ─────────── PORTADA ─────────── */}
      <section className="fp-aurora relative overflow-hidden pt-[70px]">
        <div className="fp-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="fp-wrap relative bg-transparent">
          <div className="px-5 pb-10 pt-24 md:px-9 md:pt-28">
            <Reveal y={16} delay={0.05}><span className="fp-pill fp-pill-glow">Automatización de flujos de trabajo</span></Reveal>
            <Reveal y={30} delay={0.15} blur>
              <h1 className="fp-title mt-7 max-w-[780px] text-[40px] sm:text-[56px] md:text-[64px]">
                Tu equipo no necesita más tareas. Necesita fluidez.
              </h1>
            </Reveal>
            <Reveal y={22} delay={0.3}>
              <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-[#5b6168]">
                Convertimos las tareas que se repiten cada día en flujos claros, conectados y fáciles de seguir.
              </p>
            </Reveal>
            <Reveal y={18} delay={0.42}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#agendar" className="fp-btn-mint">Agendar una cita <ArrowUpRight size={16} /></Link>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="fp-btn-dark">WhatsApp · atención 24 h</a>
              </div>
            </Reveal>
          </div>
          <Parallax from={0} to={-50} className="relative mt-4 px-2 md:px-6">
            <Reveal scale={0.94} y={50} delay={0.35} amount={0.05}><HeroScene /></Reveal>
          </Parallax>
        </div>
      </section>
      <Hatch />

      {/* ─────────── HERRAMIENTAS ─────────── */}
      <section className="fp-wrap bg-[#fafbfc] px-5 py-12 text-center md:px-9">
        <Reveal><p className="text-[18px] text-[#14171a]">Conectamos las herramientas que ya usas</p></Reveal>
        <div className="mx-auto mt-9 flex max-w-[960px] flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[22px] font-semibold tracking-tight text-[#8a929a]">
          {HERRAMIENTAS.map((h, i) => <Reveal key={h} delay={i * 0.07} y={14}><span className="transition hover:text-[#b5fffc]">{h}</span></Reveal>)}
        </div>
      </section>
      <Hatch />

      {/* ─────────── CÓMO FUNCIONA ─────────── */}
      <section id="como-funciona" className="fp-wrap bg-white">
        <Cabecera pill="Cómo funciona" titulo="Cómo FlujoPro entiende, diseña y pone en marcha tu trabajo" texto="Primero entendemos tu proceso. Después diseñamos el flujo que lo hace más sencillo." />
        <div className="grid border-t border-[#e9ebee] md:grid-cols-3">
          {PASOS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.14} y={40} className={`border-[#e9ebee] ${i < 2 ? "md:border-r" : ""}`}>
              <div className="fp-mono border-b border-[#e9ebee] bg-[#f6f8f9] px-6 py-4 text-[17px] text-[#0e7c8f]">PASO {p.n}</div>
              <div className="flex h-[300px] items-center justify-center px-2 pt-2">{p.art}</div>
              <div className="px-6 pb-10 pt-3">
                <h3 className="text-[22px] font-medium tracking-tight">{p.t}</h3>
                <p className="mt-3 text-[14.5px] leading-snug text-[#5b6168]">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <Hatch />

      {/* ─────────── SOLUCIONES ─────────── */}
      <section id="servicios" className="fp-wrap bg-white">
        <Cabecera pill="Soluciones" titulo="Que el trabajo avance. Sin perseguirlo." texto="Hay tareas que se repiten cada día. Las convertimos en flujos claros, conectados y fáciles de seguir." />
        <div className="border-t border-[#e9ebee] px-4 py-5 md:px-[106px]">
          <div className="grid gap-4 md:grid-cols-2">
            <Tarjeta className="md:row-span-2" delay={0} titulo="Automatización de flujos de trabajo" texto="Conectamos pasos, responsables y herramientas para que cada tarea llegue a quien corresponde.">
              <div className="w-full max-w-[380px]"><SceneWorkflow /></div>
            </Tarjeta>
            <Tarjeta delay={0.12} titulo="Integración de aplicaciones" texto="Hacemos que correo, hojas de cálculo, CRM y otras plataformas compartan la información necesaria.">
              <div className="w-full max-w-[400px]"><SceneApps /></div>
            </Tarjeta>
            <Tarjeta delay={0.24} titulo="Documentos y formularios" texto="Capturamos información, generamos documentos y organizamos los datos sin volver a copiarlos.">
              <div className="w-full max-w-[400px]"><SceneDocs /></div>
            </Tarjeta>
          </div>
        </div>
        <div className="grid gap-4 px-4 pb-6 md:grid-cols-3 md:px-[34px]">
          <Tarjeta delay={0} titulo="Aprobaciones sin perseguir a nadie" texto="Solicitudes, validaciones y avisos que siguen su recorrido sin cadenas interminables de mensajes."><div className="w-full max-w-[360px]"><SceneApproval /></div></Tarjeta>
          <Tarjeta delay={0.12} titulo="Flujos adaptados a tu empresa" texto="Analizamos cómo trabajáis y diseñamos automatizaciones que encajen con vuestro proceso real."><div className="w-full max-w-[360px]"><ScenePuzzle /></div></Tarjeta>
          <Tarjeta delay={0.24} titulo="Recordatorios y seguimiento" texto="Los plazos dejan de depender de la memoria: avisos y estados para saber qué falta y quién lo lleva."><div className="w-full max-w-[360px]"><SceneReminders /></div></Tarjeta>
        </div>
      </section>
      <Hatch />

      {/* ─────────── POR QUÉ ─────────── */}
      <section className="fp-wrap bg-white">
        <div className="grid items-center gap-8 px-5 py-20 md:grid-cols-[1fr_1fr] md:px-9">
          <Reveal x={-30} y={0}>
            <Pill>¿Por qué FlujoPro?</Pill>
            <h2 className="fp-title mt-5 text-[34px] md:text-[44px]">Tu tiempo vale más que copiar y pegar</h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-[#5b6168]">Menos tareas. Más ideas. Mejor flujo: automatizamos lo repetitivo para que tu equipo se centre en lo importante.</p>
            <ul className="mt-9 max-w-[470px] space-y-3.5">
              {[
                { i: Hourglass, t: "Recupera tiempo" },
                { i: Link2, t: "Conecta el trabajo" },
                { i: ShieldCheck, t: "Reduce errores" },
              ].map(({ i: Icono, t }) => (
                <li key={t} className="flex items-center gap-3 rounded-lg bg-[#f4f6f7] px-4 py-3.5 text-[17px] text-[#14171a]">
                  <Icono size={18} className="text-[#6b7280]" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal x={40} y={0} scale={0.95} delay={0.15} className="mx-auto w-full max-w-[520px]"><SceneWhy /></Reveal>
        </div>
      </section>
      <Hatch />

      {/* ─────────── CASOS DE USO ─────────── */}
      <section id="casos" className="fp-wrap bg-white">
        <Reveal className="px-5 pb-8 pt-20 md:px-9">
          <Pill>Casos de uso</Pill>
          <h2 className="fp-title mt-5 max-w-[700px] text-[34px] md:text-[46px]">FlujoPro automatiza el día a día de tu equipo</h2>
        </Reveal>
        <Reveal y={40} delay={0.1}><UseCases /></Reveal>
      </section>
      <Hatch />

      {/* ─────────── INTEGRACIONES ─────────── */}
      <section id="integraciones" className="fp-wrap relative overflow-hidden bg-white">
        <Cabecera pill="Integraciones" titulo="Conecta FlujoPro con tu forma de trabajar" texto="Conectamos correo, hojas de cálculo, CRM y otras plataformas, sin reemplazar lo que ya usas." />
        <div className="px-4 pb-16 md:px-[34px]">
          <Reveal scale={0.94} y={30} className="mx-auto max-w-[900px]"><SceneIntegrations /></Reveal>
          <div className="mx-auto mt-6 grid max-w-[760px] gap-4 md:grid-cols-2">
            {[
              { color: "bg-[#1384e0]", t: "Tus aplicaciones conectadas", d: "Correo, hojas de cálculo, CRM y otras plataformas comparten la información necesaria." },
              { color: "bg-[#17b890]", t: "Avisos en el momento justo", d: "Solicitudes, validaciones y recordatorios que siguen su recorrido solos." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.15} className="fp-card p-5">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg text-white ${c.color}`}><FileText size={16} /></span>
                <h3 className="mt-4 text-[18px] text-[#14171a]">{c.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-snug text-[#6b7280]">{c.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="#agendar" className="fp-btn-mint">Agendar una cita <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── OPINIONES ─────────── */}
      <section className="fp-wrap bg-white">
        <Cabecera pill="Opiniones" titulo="Lo que dicen de nosotros en Google" texto="Consulta las opiniones publicadas en la ficha de FlujoPro." />
        <div className="border-t border-[#e9ebee] px-4 py-5 md:px-[34px]">
          <Reveal y={36} className="fp-card relative overflow-hidden px-7 py-12 md:px-[90px]">
            <p className="text-[24px] font-normal leading-snug tracking-tight text-[#14171a] md:text-[28px]">
              «Que el trabajo avance. Sin perseguirlo.» Menos tareas, más ideas, mejor flujo.
            </p>
            <a href={RESENAS} target="_blank" rel="noopener noreferrer" className="fp-btn-mint mt-8">Ver reseñas en Google <ArrowUpRight size={16} /></a>
          </Reveal>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.1} className="fp-card p-7">
              <p className="text-[19px] leading-snug text-[#14171a]">Atención 24 horas, 365 días, por WhatsApp y por teléfono.</p>
              <a href="tel:+34606806376" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eef1f3] px-3.5 py-2 text-[14px] text-[#14171a]"><Phone size={15} /> +34 606 806 376</a>
            </Reveal>
            <Reveal delay={0.22} className="fp-card p-7">
              <p className="text-[19px] leading-snug text-[#14171a]">Atendemos en Madrid, de lunes a viernes de 09:30 a 18:00.</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eef1f3] px-3.5 py-2 text-[14px] text-[#14171a]"><Clock size={15} /> Sábados, domingos y festivos: cerrado</span>
            </Reveal>
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── PREGUNTAS (en el lugar de los precios) ─────────── */}
      <section id="preguntas" className="fp-wrap bg-white">
        <Cabecera pill="Preguntas" titulo="Preguntas frecuentes sobre la automatización de flujos" />
        <div className="border-t border-[#e9ebee] px-4 py-6 md:px-[106px]">
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.07} y={20}>
              <details className="fp-card group px-6 py-5 open:bg-[#fafbfc]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-white">
                  {f.q}
                  <Plus size={20} className="shrink-0 text-[#0e7c8f] transition group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-[56rem] text-[14.5px] leading-relaxed text-[#5b6168]">{f.a}</p>
              </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── AGENDAR ─────────── */}
      <section id="agendar" className="fp-wrap bg-white">
        <Cabecera pill="Agendar" titulo="Hablemos de ese proceso que te roba tiempo" texto="¿Cuánto tiempo se pierde en tareas que podrían hacerse solas? Agenda una llamada gratuita de 30 minutos." />
        <div className="border-t border-[#e9ebee] px-3 py-6 md:px-[60px]">
          <Reveal y={40} className="fp-card overflow-hidden p-2 md:p-3"><Reserva /></Reveal>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[14px] text-[#5b6168]">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="fp-btn-dark"><MessageCircle size={16} /> WhatsApp · +34 606 806 376</a>
            <span className="flex items-center gap-2"><Clock size={15} /> Lunes a viernes · 09:30–18:00</span>
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── UBICACIÓN ─────────── */}
      <section id="ubicacion" className="fp-wrap bg-white">
        <Cabecera pill="Ubicación" titulo="C. Joaquín María López, 26 · Madrid" texto="Aparcamiento público cercano: C. Blasco de Garay, 61. Sábados, domingos y festivos: cerrado." />
        <div className="border-t border-[#e9ebee] px-4 py-6 md:px-[34px]">
          <Reveal y={40} scale={0.97} className="overflow-hidden rounded-2xl border border-[#e3e6e9]">
            <iframe
              title="Mapa de FlujoPro" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Calle+Joaquín+María+López+26+Madrid&output=embed"
              className="h-[380px] w-full border-0"
            />
          </Reveal>
          <div className="mt-4 text-center">
            <a href="https://maps.google.com/?q=Calle+Joaquín+María+López+26+Madrid" target="_blank" rel="noopener noreferrer" className="fp-btn-dark"><MapPin size={16} /> Cómo llegar</a>
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── LLAMADA FINAL ─────────── */}
      <section className="fp-cta">
        <div className="fp-wrap grid items-center gap-6 border-x-0 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-[70px]">
          <Reveal x={-40} y={0}>
            <Pill>Empieza hoy</Pill>
            <h2 className="fp-title mt-5 text-[34px] md:text-[44px]">Deja que tu trabajo fluya solo</h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-[#5b6168]">Convertimos las tareas repetitivas en flujos claros, para que tu equipo se centre en lo importante y no en perseguir pasos.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#agendar" className="fp-btn-mint">Agendar una cita <ArrowUpRight size={16} /></Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="fp-btn-dark">WhatsApp</a>
            </div>
          </Reveal>
          <Reveal x={50} y={0} scale={0.92} delay={0.15} className="mx-auto w-full max-w-[420px]"><SceneLaunch /></Reveal>
        </div>
      </section>
    </main>
  );
}
