import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, FileText, Link2, Hourglass, ShieldCheck, Plus, MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import Reserva from "@/components/Reserva";
import UseCases from "@/components/UseCases";
import {
  HeroArt, StepArt1, StepArt2, StepArt3, FeatArtBig, FeatArtLink, FeatArtMemory, FeatArtShield, FeatArtCube, FeatArtBars,
  SecurityArt, IntegrationsArt, CtaArt,
} from "@/components/iso/Iso";

const WA = "https://api.whatsapp.com/send?phone=34606806376&text=Hola%2C%20FlujoPro.%20Quiero%20automatizar%20un%20proceso.";
const RESENAS = "https://maps.app.goo.gl/NbdVhk4eLpygfeV88";

const HERRAMIENTAS = ["Correo", "Hojas de cálculo", "WhatsApp", "CRM", "Formularios", "Documentos", "Calendario"];

const PASOS: { n: string; t: string; d: string; art: ReactNode }[] = [
  { n: "1", t: "Entendemos tu proceso", d: "Nos cuentas qué tarea se repite y dónde se pierde tiempo; analizamos cómo trabajáis de verdad.", art: <StepArt1 /> },
  { n: "2", t: "Diseñamos el flujo", d: "Definimos pasos, conexiones y responsables para que cada tarea llegue a quien corresponde.", art: <StepArt2 /> },
  { n: "3", t: "Lo ponemos en marcha", d: "Configuramos y comprobamos el recorrido completo. Tu equipo gana tiempo desde el primer día.", art: <StepArt3 /> },
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
function Hatch() {
  return <div className="fp-hatch" />;
}
function Cabecera({ pill, titulo, texto, centrado = true }: { pill: string; titulo: string; texto?: string; centrado?: boolean }) {
  return (
    <div className={`px-5 pb-12 pt-20 md:px-9 ${centrado ? "text-center" : ""}`}>
      <Pill>{pill}</Pill>
      <h2 className={`fp-title mt-5 text-[34px] md:text-[48px] ${centrado ? "mx-auto max-w-[760px]" : "max-w-[760px]"}`}>{titulo}</h2>
      {texto ? <p className={`mt-4 text-[16px] leading-relaxed text-[#8d9094] ${centrado ? "mx-auto max-w-[560px]" : "max-w-[560px]"}`}>{texto}</p> : null}
    </div>
  );
}
function Tarjeta({ titulo, texto, children, className = "" }: { titulo: string; texto: string; children: ReactNode; className?: string }) {
  return (
    <article className={`fp-card flex flex-col overflow-hidden ${className}`}>
      <div className="px-6 pb-2 pt-6">
        <h3 className="text-[19px] font-medium tracking-tight text-white">{titulo}</h3>
        <p className="mt-2.5 max-w-[34rem] text-[14px] leading-snug text-[#8d9094]">{texto}</p>
      </div>
      <div className="mt-auto flex flex-1 items-end justify-center px-4 pb-4 pt-2">{children}</div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="bg-[#040507] text-white">
      {/* ─────────── PORTADA ─────────── */}
      <section className="fp-aurora relative overflow-hidden pt-[70px]">
        <div className="fp-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="fp-wrap relative bg-transparent">
          <div className="px-5 pb-10 pt-24 md:px-9 md:pt-28">
            <span className="fp-pill fp-pill-glow">Automatización de flujos de trabajo</span>
            <h1 className="fp-title fp-rise mt-7 max-w-[780px] text-[40px] sm:text-[56px] md:text-[64px]">
              Tu equipo no necesita más tareas. Necesita fluidez.
            </h1>
            <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-[#8d9094]">
              Convertimos las tareas que se repiten cada día en flujos claros, conectados y fáciles de seguir.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#agendar" className="fp-btn-mint">Agendar una cita <ArrowUpRight size={16} /></Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="fp-btn-dark">WhatsApp · atención 24 h</a>
            </div>
          </div>
          <div className="relative mt-4 px-2 md:px-6">
            <HeroArt />
            <span className="fp-label left-[36%] top-[10%] hidden md:block">Flujos automáticos</span>
            <span className="fp-label right-[8%] top-[27%] hidden md:block">Todo conectado</span>
            <span className="fp-label left-[17%] top-[39%] hidden md:block">Sin perseguir tareas</span>
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── HERRAMIENTAS ─────────── */}
      <section className="fp-wrap bg-[#050608] px-5 py-12 text-center md:px-9">
        <p className="text-[18px] text-[#e6e8ea]">Conectamos las herramientas que ya usas</p>
        <div className="mx-auto mt-9 flex max-w-[960px] flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[22px] font-semibold tracking-tight text-[#4b4f54]">
          {HERRAMIENTAS.map((h) => <span key={h}>{h}</span>)}
        </div>
      </section>
      <Hatch />

      {/* ─────────── CÓMO FUNCIONA ─────────── */}
      <section id="como-funciona" className="fp-wrap bg-[#040507]">
        <Cabecera pill="Cómo funciona" titulo="Cómo FlujoPro entiende, diseña y pone en marcha tu trabajo" texto="Primero entendemos tu proceso. Después diseñamos el flujo que lo hace más sencillo." />
        <div className="grid border-t border-[#16181b] md:grid-cols-3">
          {PASOS.map((p, i) => (
            <div key={p.n} className={`border-[#16181b] ${i < 2 ? "md:border-r" : ""}`}>
              <div className="fp-mono border-b border-[#16181b] bg-[#0c0f0f] px-6 py-4 text-[17px] text-[#84dded]">PASO {p.n}</div>
              <div className="flex h-[270px] items-center justify-center px-6 pt-2">{p.art}</div>
              <div className="px-6 pb-10 pt-3">
                <h3 className="text-[22px] font-medium tracking-tight">{p.t}</h3>
                <p className="mt-3 text-[14.5px] leading-snug text-[#8d9094]">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Hatch />

      {/* ─────────── SOLUCIONES ─────────── */}
      <section id="servicios" className="fp-wrap bg-[#040507]">
        <Cabecera pill="Soluciones" titulo="Que el trabajo avance. Sin perseguirlo." texto="Hay tareas que se repiten cada día. Las convertimos en flujos claros, conectados y fáciles de seguir." />
        <div className="border-t border-[#16181b] px-4 py-5 md:px-[106px]">
          <div className="grid gap-4 md:grid-cols-2">
            <Tarjeta className="md:row-span-2" titulo="Automatización de flujos de trabajo" texto="Conectamos pasos, responsables y herramientas para que cada tarea llegue a quien corresponde.">
              <div className="w-full max-w-[380px]"><FeatArtBig /></div>
            </Tarjeta>
            <Tarjeta titulo="Integración de aplicaciones" texto="Hacemos que correo, hojas de cálculo, CRM y otras plataformas compartan la información necesaria.">
              <div className="w-full max-w-[380px]"><FeatArtLink /></div>
            </Tarjeta>
            <Tarjeta titulo="Documentos y formularios" texto="Capturamos información, generamos documentos y organizamos los datos sin volver a copiarlos.">
              <div className="w-full max-w-[380px]"><FeatArtMemory /></div>
            </Tarjeta>
          </div>
        </div>
        <div className="grid gap-4 px-4 pb-6 md:grid-cols-3 md:px-[34px]">
          <Tarjeta titulo="Aprobaciones sin perseguir a nadie" texto="Solicitudes, validaciones y avisos que siguen su recorrido sin cadenas interminables de mensajes."><div className="w-full max-w-[340px]"><FeatArtShield /></div></Tarjeta>
          <Tarjeta titulo="Flujos adaptados a tu empresa" texto="Analizamos cómo trabajáis y diseñamos automatizaciones que encajen con vuestro proceso real."><div className="w-full max-w-[340px]"><FeatArtCube /></div></Tarjeta>
          <Tarjeta titulo="Recordatorios y seguimiento" texto="Los plazos dejan de depender de la memoria: avisos y estados para saber qué falta y quién lo lleva."><div className="w-full max-w-[340px]"><FeatArtBars /></div></Tarjeta>
        </div>
      </section>
      <Hatch />

      {/* ─────────── POR QUÉ ─────────── */}
      <section className="fp-wrap bg-[#040507]">
        <div className="grid items-center gap-8 px-5 py-20 md:grid-cols-[1fr_1fr] md:px-9">
          <div>
            <Pill>¿Por qué FlujoPro?</Pill>
            <h2 className="fp-title mt-5 text-[34px] md:text-[44px]">Tu tiempo vale más que copiar y pegar</h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-[#8d9094]">Menos tareas. Más ideas. Mejor flujo: automatizamos lo repetitivo para que tu equipo se centre en lo importante.</p>
            <ul className="mt-9 max-w-[470px] space-y-3.5">
              {[
                { i: Hourglass, t: "Recupera tiempo" },
                { i: Link2, t: "Conecta el trabajo" },
                { i: ShieldCheck, t: "Reduce errores" },
              ].map(({ i: Icono, t }) => (
                <li key={t} className="flex items-center gap-3 rounded-lg bg-[#0d0e10] px-4 py-3.5 text-[17px] text-[#e8eaec]">
                  <Icono size={18} className="text-[#9aa0a4]" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[520px]"><SecurityArt /></div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── CASOS DE USO ─────────── */}
      <section id="casos" className="fp-wrap bg-[#040507]">
        <div className="px-5 pb-8 pt-20 md:px-9">
          <Pill>Casos de uso</Pill>
          <h2 className="fp-title mt-5 max-w-[700px] text-[34px] md:text-[46px]">FlujoPro automatiza el día a día de tu equipo</h2>
        </div>
        <UseCases />
      </section>
      <Hatch />

      {/* ─────────── INTEGRACIONES ─────────── */}
      <section id="integraciones" className="fp-wrap relative overflow-hidden bg-[#040507]">
        <Cabecera pill="Integraciones" titulo="Conecta FlujoPro con tu forma de trabajar" texto="Conectamos correo, hojas de cálculo, CRM y otras plataformas, sin reemplazar lo que ya usas." />
        <div className="relative px-5 pb-24 md:px-0">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-[560px] w-[1000px] -translate-x-1/2 rounded-full border border-dashed border-white/20 md:block [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]" />
          <div className="relative mx-auto max-w-[760px] opacity-90"><IntegrationsArt /></div>
          <div className="absolute left-5 top-6 hidden w-[280px] md:left-10 md:block">
            <div className="fp-card p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1384e0]"><FileText size={16} /></span>
              <h3 className="mt-4 text-[18px] text-[#e4e6e8]">Tus aplicaciones conectadas</h3>
              <p className="mt-1.5 text-[13.5px] leading-snug text-[#7f8286]">Correo, hojas de cálculo, CRM y otras plataformas comparten la información necesaria.</p>
            </div>
          </div>
          <div className="absolute right-5 top-4 hidden w-[290px] md:right-10 md:block">
            <div className="fp-card p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#17b890]"><FileText size={16} /></span>
              <h3 className="mt-4 text-[18px] text-[#e4e6e8]">Avisos en el momento justo</h3>
              <p className="mt-1.5 text-[13.5px] leading-snug text-[#7f8286]">Solicitudes, validaciones y recordatorios que siguen su recorrido solos.</p>
            </div>
          </div>
          <div className="relative -mt-6 text-center"><Link href="#agendar" className="fp-btn-mint">Agendar una cita <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── OPINIONES ─────────── */}
      <section className="fp-wrap bg-[#040507]">
        <Cabecera pill="Opiniones" titulo="Lo que dicen de nosotros en Google" texto="Consulta las opiniones publicadas en la ficha de FlujoPro." />
        <div className="border-t border-[#16181b] px-4 py-5 md:px-[34px]">
          <div className="fp-card relative overflow-hidden px-7 py-12 md:px-[90px]">
            <p className="text-[24px] font-normal leading-snug tracking-tight text-[#e4e6e8] md:text-[28px]">
              «Que el trabajo avance. Sin perseguirlo.» Menos tareas, más ideas, mejor flujo.
            </p>
            <a href={RESENAS} target="_blank" rel="noopener noreferrer" className="fp-btn-mint mt-8">Ver reseñas en Google <ArrowUpRight size={16} /></a>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="fp-card p-7">
              <p className="text-[19px] leading-snug text-[#e4e6e8]">Atención 24 horas, 365 días, por WhatsApp y por teléfono.</p>
              <a href="tel:+34606806376" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#14171a] px-3.5 py-2 text-[14px] text-white"><Phone size={15} /> +34 606 806 376</a>
            </div>
            <div className="fp-card p-7">
              <p className="text-[19px] leading-snug text-[#e4e6e8]">Atendemos en Madrid, de lunes a viernes de 09:30 a 18:00.</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#14171a] px-3.5 py-2 text-[14px] text-white"><Clock size={15} /> Sábados, domingos y festivos: cerrado</span>
            </div>
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── PREGUNTAS (en el lugar de los precios) ─────────── */}
      <section id="preguntas" className="fp-wrap bg-[#040507]">
        <Cabecera pill="Preguntas" titulo="Preguntas frecuentes sobre la automatización de flujos" />
        <div className="border-t border-[#16181b] px-4 py-6 md:px-[106px]">
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="fp-card group px-6 py-5 open:bg-[#0e1012]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-white">
                  {f.q}
                  <Plus size={20} className="shrink-0 text-[#84dded] transition group-open:rotate-45" />
                </summary>
                <p className="mt-3 max-w-[56rem] text-[14.5px] leading-relaxed text-[#8d9094]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── AGENDAR ─────────── */}
      <section id="agendar" className="fp-wrap bg-[#040507]">
        <Cabecera pill="Agendar" titulo="Hablemos de ese proceso que te roba tiempo" texto="¿Cuánto tiempo se pierde en tareas que podrían hacerse solas? Agenda una llamada gratuita de 30 minutos." />
        <div className="border-t border-[#16181b] px-3 py-6 md:px-[60px]">
          <div className="fp-card overflow-hidden p-2 md:p-3"><Reserva /></div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[14px] text-[#9a9da1]">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="fp-btn-dark"><MessageCircle size={16} /> WhatsApp · +34 606 806 376</a>
            <span className="flex items-center gap-2"><Clock size={15} /> Lunes a viernes · 09:30–18:00</span>
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── UBICACIÓN ─────────── */}
      <section id="ubicacion" className="fp-wrap bg-[#040507]">
        <Cabecera pill="Ubicación" titulo="C. Joaquín María López, 26 · Madrid" texto="Aparcamiento público cercano: C. Blasco de Garay, 61. Sábados, domingos y festivos: cerrado." />
        <div className="border-t border-[#16181b] px-4 py-6 md:px-[34px]">
          <div className="overflow-hidden rounded-2xl border border-[#1b1d20]">
            <iframe
              title="Mapa de FlujoPro" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Calle+Joaquín+María+López+26+Madrid&output=embed"
              className="h-[380px] w-full border-0 [filter:invert(.92)_hue-rotate(180deg)_saturate(.7)_brightness(.9)]"
            />
          </div>
          <div className="mt-4 text-center">
            <a href="https://maps.google.com/?q=Calle+Joaquín+María+López+26+Madrid" target="_blank" rel="noopener noreferrer" className="fp-btn-dark"><MapPin size={16} /> Cómo llegar</a>
          </div>
        </div>
      </section>
      <Hatch />

      {/* ─────────── LLAMADA FINAL ─────────── */}
      <section className="fp-cta">
        <div className="fp-wrap grid items-center gap-6 border-x-0 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-[70px]">
          <div>
            <Pill>Empieza hoy</Pill>
            <h2 className="fp-title mt-5 text-[34px] md:text-[44px]">Deja que tu trabajo fluya solo</h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-[#8d9094]">Convertimos las tareas repetitivas en flujos claros, para que tu equipo se centre en lo importante y no en perseguir pasos.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#agendar" className="fp-btn-mint">Agendar una cita <ArrowUpRight size={16} /></Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="fp-btn-dark">WhatsApp</a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[420px]"><CtaArt /></div>
        </div>
      </section>
    </main>
  );
}
