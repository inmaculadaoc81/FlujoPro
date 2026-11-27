import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Plus, MapPin, Clock, Phone, MessageCircle, Star } from "lucide-react";
import Reserva from "@/components/Reserva";
import FormularioContacto from "@/components/FormularioContacto";
import UseCases from "@/components/UseCases";
import { Reveal } from "@/components/anim/Reveal";
import { Section } from "@/components/anim/Section";
import Hero from "@/components/sentry/Hero";
import Pasos from "@/components/sentry/Pasos";
import Panel from "@/components/sentry/Panel";
import { SceneWorkflow, SceneApps, SceneDocs, SceneApproval, ScenePuzzle, SceneReminders } from "@/components/iso/Scenes";

const WA = "https://api.whatsapp.com/send?phone=34623201011&text=Hola%2C%20FlujoPro.%20Quiero%20automatizar%20un%20proceso.";
const RESENAS = "https://maps.app.goo.gl/NbdVhk4eLpygfeV88";
const MAPA = "https://maps.google.com/?q=Calle+Blasco+de+Garay+63+Chamberí+Madrid";

const FAQ = [
  { q: "¿Cuánto tarda en ponerse en marcha un flujo?", a: "Depende del proceso y de las herramientas que conecte. Un flujo sencillo puede estar listo en una o dos semanas; los procesos más amplios se planifican por fases." },
  { q: "¿Tengo que cambiar las herramientas que uso?", a: "No. Conectamos las que ya tenéis (correo, hojas de cálculo, CRM, formularios…) para que compartan la información sin copiar y pegar." },
  { q: "¿Qué tipo de tareas se pueden automatizar?", a: "Aprobaciones, avisos y recordatorios, captura de datos de formularios, generación de documentos y el paso de información entre aplicaciones." },
  { q: "¿Incluye soporte y mantenimiento?", a: "Sí. Revisamos que el flujo siga funcionando y lo ajustamos cuando cambian vuestras necesidades." },
  { q: "¿Cómo empiezo?", a: "Agenda una cita gratuita o escríbenos por WhatsApp: nos cuentas el proceso que te quita tiempo y te proponemos cómo simplificarlo." },
];

/** Encabezado de sección: título en dos líneas, la segunda en degradado azul. */
function Titulo({ titulo, azul, texto }: { titulo: string; azul: string; texto?: string }) {
  return (
    <Reveal className="pb-12">
      <h2 className="fx-h2">{titulo}<span className="fx-azul block">{azul}</span></h2>
      {texto ? <p className="fx-entradilla">{texto}</p> : null}
    </Reveal>
  );
}

function Tarjeta({ titulo, texto, children, className = "", delay = 0 }: { titulo: string; texto: string; children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} y={36} className={`fp-card flex flex-col overflow-hidden ${className}`}>
      <div className="px-6 pt-6 pb-2">
        <h3 className="text-[19px] font-semibold tracking-tight text-[#26272c]">{titulo}</h3>
        <p className="mt-2 max-w-[34rem] text-[14px] leading-snug text-[#6f7384]">{texto}</p>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 pt-2 pb-4">{children}</div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-clip text-[#26272c]">
      <Hero />
      <Pasos />
      <Panel />

      {/* ─────────── SOLUCIONES ─────────── */}
      <Section id="servicios" className="pt-24">
        <div className="mx-auto max-w-[1320px]">
          <Titulo titulo="Que el trabajo avance." azul="Sin perseguirlo." texto="Hay tareas que se repiten cada día. Las convertimos en flujos claros, conectados y fáciles de seguir." />
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
      <Section id="casos" className="pt-24">
        <div className="mx-auto max-w-[1320px]">
          <Titulo titulo="Así se ve en el día a día" azul="de tu equipo." />
          <UseCases />
        </div>
      </Section>

      {/* ─────────── PREGUNTAS ─────────── */}
      <Section id="preguntas" className="pt-24">
        <div className="mx-auto max-w-[1320px]">
          <Titulo titulo="Lo que suelen" azul="preguntarnos." />
          <div className="max-w-[900px] space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.07} y={20}>
                <details className="fp-card group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16.5px] font-semibold text-[#26272c]">
                    {f.q}
                    <Plus size={20} className="shrink-0 text-[#2f4ef0] transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#6f7384]">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────── AGENDAR + CONTACTO ─────────── */}
      <Section id="agendar" className="pt-24 pb-24">
        <div className="fp-calido mx-auto max-w-[1320px] p-4 sm:p-8">
          <Titulo titulo="Hablemos de ese proceso" azul="que te roba tiempo." texto="¿Cuánto tiempo se pierde en tareas que podrían hacerse solas? Agenda una llamada gratuita de 30 minutos." />
          <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
            <div id="ubicacion" className="flex flex-col gap-4">
              <div className="fp-card p-6">
                <ul className="space-y-4 text-[14.5px] font-medium">
                  <li><a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#2f4ef0]"><span className="fp-icono"><MessageCircle size={18} /></span>WhatsApp · +34 623 201 011</a></li>
                  <li><a href="tel:+34623201011" className="flex items-center gap-3 hover:text-[#2f4ef0]"><span className="fp-icono"><Phone size={18} /></span>Atención telefónica 24 h · 365 días</a></li>
                  <li><a href="tel:+34623201011" className="flex items-center gap-3 hover:text-[#2f4ef0]"><span className="fp-icono"><Phone size={18} /></span>Teléfono · +34 623 201 011</a></li>
                  <li className="flex items-center gap-3"><span className="fp-icono"><Clock size={18} /></span>Lunes a viernes · 09:30–18:00</li>
                  <li><a href={MAPA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#2f4ef0]"><span className="fp-icono"><MapPin size={18} /></span>C/ Blasco de Garay 63, Local 2 · Chamberí · 28015 Madrid</a></li>
                  <li><a href={RESENAS} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#2f4ef0]"><span className="fp-icono"><Star size={18} /></span>Ver nuestras reseñas en Google</a></li>
                </ul>
                <p className="mt-4 text-[12.5px] text-[#6f7384]">Aparcamiento público cercano: C. Blasco de Garay, 61.</p>
              </div>
              <div className="fp-card min-h-[300px] flex-1 overflow-hidden p-2">
                <iframe title="Mapa de FlujoPro" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Calle+Blasco+de+Garay+63+Chamberí+Madrid&output=embed" className="h-full min-h-[285px] w-full rounded-lg border-0" />
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
