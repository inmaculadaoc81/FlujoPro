import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Plus, MapPin, Clock, Phone, MessageCircle, Star } from "lucide-react";
import Reserva from "@/components/Reserva";
import FormularioContacto from "@/components/FormularioContacto";
import UseCases from "@/components/UseCases";
import { Reveal, Parallax } from "@/components/anim/Reveal";
import { Section } from "@/components/anim/Section";
import { StepUnderstand, StepDesign, StepRun } from "@/components/iso/Steps";
import { HeroScene, SceneWorkflow, SceneApps, SceneDocs, SceneApproval, ScenePuzzle, SceneReminders } from "@/components/iso/Scenes";

const WA = "https://api.whatsapp.com/send?phone=34606806376&text=Hola%2C%20FlujoPro.%20Quiero%20automatizar%20un%20proceso.";
const RESENAS = "https://maps.app.goo.gl/NbdVhk4eLpygfeV88";
const MAPA = "https://maps.google.com/?q=Calle+Joaquín+María+López+26+Madrid";

// herramientas que flotan alrededor del titular (solo en pantallas grandes)
const FLOTANTES = [
  { src: "/icons/WhatsApp_Logo_green.svg.png", n: "WhatsApp", pos: "left-[9%] top-[14%]", d: 0 },
  { src: "/icons/googlesheetslogo.png", n: "Hojas de cálculo", pos: "right-[10%] top-[11%]", d: 0.7 },
  { src: "/icons/Google_Drive_icon_(2020).svg.png", n: "Drive", pos: "left-[3%] top-[48%]", d: 1.4 },
  { src: "/icons/Notion-logo.svg.png", n: "Notion", pos: "right-[3%] top-[45%]", d: 0.3 },
  { src: "/icons/Telegram_2019_Logo.svg.png", n: "Telegram", pos: "left-[14%] top-[78%]", d: 1 },
  { src: "/icons/clickuplogo.png", n: "ClickUp", pos: "right-[14%] top-[79%]", d: 1.8 },
];

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

/** Encabezado de sección: pastilla, título y segunda línea en cursiva con serifa. */
function Titulo({ pill, titulo, cursiva, texto }: { pill: string; titulo: string; cursiva: string; texto?: string }) {
  return (
    <Reveal className="px-2 pb-10 text-center">
      <span className="fp-pill">{pill}</span>
      <h2 className="mx-auto mt-5 max-w-[760px] text-[34px] leading-[1.1] font-medium tracking-[-0.035em] text-[#2a2618] md:text-[46px]">
        {titulo} <span className="fp-serif block text-[1.08em]">{cursiva}</span>
      </h2>
      {texto ? <p className="mx-auto mt-4 max-w-[540px] text-[15.5px] leading-relaxed text-[#7c776a]">{texto}</p> : null}
    </Reveal>
  );
}

function Tarjeta({ titulo, texto, children, className = "", delay = 0 }: { titulo: string; texto: string; children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} y={36} className={`fp-card flex flex-col overflow-hidden ${className}`}>
      <div className="px-6 pt-6 pb-2">
        <h3 className="text-[19px] font-semibold tracking-tight text-[#2a2618]">{titulo}</h3>
        <p className="mt-2 max-w-[34rem] text-[14px] leading-snug text-[#7c776a]">{texto}</p>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pt-2 pb-4">{children}</div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-clip text-[#2a2618]">
      {/* ─────────── PORTADA ─────────── */}
      <section className="relative px-4 pt-[132px] md:pt-[150px]">
        <div className="relative mx-auto max-w-[1136px]">
          <div className="pointer-events-none absolute inset-x-0 top-[-20px] hidden h-[430px] lg:block">
            {FLOTANTES.map((f) => (
              <div key={f.n} className={`absolute ${f.pos}`}>
                <Reveal delay={0.5 + f.d * 0.25} y={18}>
                  <div className="fp-chip-app fp-float" style={{ animationDelay: `${f.d}s` }}>
                    <img src={f.src} alt={f.n} width={28} height={28} className="h-7 w-7 object-contain" />
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="relative text-center">
            <Reveal y={14}><span className="fp-pill">Automatización de flujos de trabajo</span></Reveal>
            <Reveal y={30} delay={0.12} blur>
              <h1 className="mx-auto mt-6 max-w-[860px] text-balance text-[40px] leading-[1.04] font-medium tracking-[-0.04em] sm:text-[56px] md:text-[66px]">
                Tu equipo no necesita más tareas.
                <span className="fp-serif block text-[1.1em]">Necesita fluidez.</span>
              </h1>
            </Reveal>
            <Reveal y={20} delay={0.26}>
              <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-relaxed text-[#7c776a]">Convertimos las tareas que se repiten cada día en flujos claros, conectados y fáciles de seguir.</p>
            </Reveal>
            <Reveal y={18} delay={0.38}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="#agendar" className="fp-btn-grad group">Agendar una cita <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="fp-btn-glass"><MessageCircle size={16} /> WhatsApp · atención 24 h</a>
              </div>
            </Reveal>
          </div>

          {/* panel principal: ventana de cristal sobre fondo cálido */}
          <Parallax from={30} to={-30} className="mt-14">
            <Reveal scale={0.95} y={50} delay={0.4} amount={0.05}>
              <div className="fp-panel p-3 sm:p-8">
                <div className="fp-window">
                  <div className="flex items-center gap-1.5 px-4 pt-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ee6a52]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#efc05a]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#80b461]" />
                    <span className="ml-3 truncate text-[12.5px] font-medium text-[#7c776a]">Así trabaja un flujo de FlujoPro</span>
                  </div>
                  <div className="mx-auto max-w-[960px] px-1 py-2"><HeroScene /></div>
                </div>
              </div>
            </Reveal>
          </Parallax>
        </div>
      </section>

      {/* ─────────── CÓMO FUNCIONA ─────────── */}
      <Section id="como-funciona" className="pt-28">
        <div className="mx-auto max-w-[1136px]">
          <Titulo pill="Cómo funciona" titulo="Del «siempre lo hacemos así»" cursiva="al ya está hecho." texto="Primero entendemos tu proceso. Después diseñamos el flujo que lo hace más sencillo." />
          <div className="grid gap-4 md:grid-cols-3">
            {PASOS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.14} y={40} className="fp-card flex flex-col overflow-hidden">
                <div className="px-5 pt-5"><span className="fp-step">Paso {p.n}</span></div>
                <div className="flex h-[290px] items-center justify-center px-2">{p.art}</div>
                <div className="px-6 pb-7">
                  <h3 className="text-[21px] font-semibold tracking-tight">{p.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-snug text-[#7c776a]">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────── SOLUCIONES ─────────── */}
      <Section id="servicios" className="pt-28">
        <div className="mx-auto max-w-[1136px]">
          <Titulo pill="Soluciones a medida" titulo="Que el trabajo avance." cursiva="Sin perseguirlo." texto="Hay tareas que se repiten cada día. Las convertimos en flujos claros, conectados y fáciles de seguir." />
          {/* una sola rejilla: todas las filas tienen la misma anchura */}
          <div className="grid gap-4 md:grid-cols-6">
            <Tarjeta className="md:col-span-3 md:row-span-2" titulo="Automatización de flujos de trabajo" texto="Conectamos pasos, responsables y herramientas para que cada tarea llegue a quien corresponde.">
              <div className="w-full max-w-[460px]"><SceneWorkflow /></div>
            </Tarjeta>
            <Tarjeta className="md:col-span-3" delay={0.12} titulo="Integración de aplicaciones" texto="Hacemos que correo, hojas de cálculo, CRM y otras plataformas compartan la información necesaria.">
              <div className="w-full max-w-[420px]"><SceneApps /></div>
            </Tarjeta>
            <Tarjeta className="md:col-span-3" delay={0.2} titulo="Documentos y formularios" texto="Capturamos información, generamos documentos y organizamos los datos sin volver a copiarlos.">
              <div className="w-full max-w-[420px]"><SceneDocs /></div>
            </Tarjeta>
            <Tarjeta className="md:col-span-2" titulo="Aprobaciones sin perseguir a nadie" texto="Solicitudes, validaciones y avisos que siguen su recorrido sin cadenas interminables de mensajes.">
              <div className="w-full max-w-[360px]"><SceneApproval /></div>
            </Tarjeta>
            <Tarjeta className="md:col-span-2" delay={0.12} titulo="Flujos adaptados a tu empresa" texto="Analizamos cómo trabajáis y diseñamos automatizaciones que encajen con vuestro proceso real.">
              <div className="w-full max-w-[360px]"><ScenePuzzle /></div>
            </Tarjeta>
            <Tarjeta className="md:col-span-2" delay={0.24} titulo="Recordatorios y seguimiento" texto="Los plazos dejan de depender de la memoria: avisos y estados para saber qué falta y quién lo lleva.">
              <div className="w-full max-w-[360px]"><SceneReminders /></div>
            </Tarjeta>
          </div>
        </div>
      </Section>

      {/* ─────────── CASOS DE USO ─────────── */}
      <Section id="casos" className="pt-28">
        <div className="mx-auto max-w-[1136px]">
          <Titulo pill="Casos de uso" titulo="Así se ve en el día a día" cursiva="de tu equipo." />
          <UseCases />
        </div>
      </Section>

      {/* ─────────── PREGUNTAS ─────────── */}
      <Section id="preguntas" className="pt-28">
        <div className="mx-auto max-w-[860px]">
          <Titulo pill="Preguntas frecuentes" titulo="Lo que suelen" cursiva="preguntarnos." />
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.07} y={20}>
                <details className="fp-card group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16.5px] font-semibold text-[#2a2618]">
                    {f.q}
                    <Plus size={20} className="shrink-0 text-[#e8591d] transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#7c776a]">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────── AGENDAR + CONTACTO ─────────── */}
      <Section id="agendar" className="pt-28 pb-24">
        <div className="fp-calido mx-auto max-w-[1136px] p-4 sm:p-8">
          <Titulo pill="Agenda una cita" titulo="Hablemos de ese proceso" cursiva="que te roba tiempo." texto="¿Cuánto tiempo se pierde en tareas que podrían hacerse solas? Agenda una llamada gratuita de 30 minutos." />
          <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
            <div id="ubicacion" className="flex flex-col gap-4">
              <div className="fp-card p-6">
                <ul className="space-y-4 text-[14.5px] font-medium">
                  <li><a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#e8591d]"><span className="fp-icono"><MessageCircle size={18} /></span>WhatsApp · +34 606 806 376</a></li>
                  <li><a href="tel:+34606806376" className="flex items-center gap-3 hover:text-[#e8591d]"><span className="fp-icono"><Phone size={18} /></span>Atención telefónica 24 h · 365 días</a></li>
                  <li className="flex items-center gap-3"><span className="fp-icono"><Clock size={18} /></span>Lunes a viernes · 09:30–18:00</li>
                  <li><a href={MAPA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#e8591d]"><span className="fp-icono"><MapPin size={18} /></span>C. Joaquín María López, 26 · Madrid</a></li>
                  <li><a href={RESENAS} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#e8591d]"><span className="fp-icono"><Star size={18} /></span>Ver nuestras reseñas en Google</a></li>
                </ul>
                <p className="mt-4 text-[12.5px] text-[#7c776a]">Aparcamiento público cercano: C. Blasco de Garay, 61.</p>
              </div>
              <div className="fp-card min-h-[300px] flex-1 overflow-hidden p-2">
                <iframe title="Mapa de FlujoPro" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Calle+Joaquín+María+López+26+Madrid&output=embed" className="h-full min-h-[285px] w-full rounded-lg border-0" />
              </div>
            </div>
            <div className="fp-card overflow-hidden p-2"><Reserva /></div>
          </div>
          <div className="mt-4"><FormularioContacto /></div>
        </div>
      </Section>
    </main>
  );
}
