import Link from "next/link";
import {
  ArrowRight, MessageCircle, MapPin, Clock, Phone, Workflow, CircleCheck, FileText, Plug, BellRing, Settings2,
  Hourglass, Link2, ShieldCheck, TrendingUp, Star, Plus,
} from "lucide-react";
import Reserva from "@/components/Reserva";

const WA = "https://api.whatsapp.com/send?phone=34606806376&text=Hola%2C%20FlujoPro.%20Quiero%20automatizar%20un%20proceso.";
const RESENAS = "https://maps.app.goo.gl/NbdVhk4eLpygfeV88";

const titulo = { fontFamily: "var(--font-poppins)" } as const;

const PASOS_PANEL = [
  { icon: FileText, t: "Llega la solicitud", d: "Formulario o correo", estado: "Hecho", color: "#16a34a" },
  { icon: CircleCheck, t: "Se pide la aprobación", d: "Aviso automático al responsable", estado: "Hecho", color: "#16a34a" },
  { icon: FileText, t: "Se genera el documento", d: "Datos copiados sin tocar nada", estado: "En curso", color: "#6d28d9" },
  { icon: BellRing, t: "Se avisa a todos", d: "Seguimiento hasta cerrar", estado: "Pendiente", color: "#9a93b5" },
];

const HERRAMIENTAS = [
  ["WhatsApp", "/icons/WhatsApp_Logo_green.svg.png"], ["Google Sheets", "/icons/googlesheetslogo.png"], ["Google Drive", "/icons/Google_Drive_icon_(2020).svg.png"],
  ["Notion", "/icons/Notion-logo.svg.png"], ["Telegram", "/icons/Telegram_2019_Logo.svg.png"], ["ClickUp", "/icons/clickuplogo.png"],
  ["Shopify", "/icons/shopifylogo.webp"], ["Stripe", "/icons/stripelogo.png"], ["Meta", "/icons/metalogo.jpg"], ["Zapier", "/icons/Zapier-logo.png"],
];

const PASOS = [
  { n: "01", t: "Nos cuentas el problema", d: "Qué tarea se repite y dónde se pierde tiempo." },
  { n: "02", t: "Diseñamos el flujo", d: "Definimos pasos, conexiones y responsables." },
  { n: "03", t: "Lo ponemos en marcha", d: "Configuramos y comprobamos el recorrido completo." },
  { n: "04", t: "Tu equipo gana tiempo", d: "Un proceso más claro para el día a día." },
];

const FAQ = [
  { q: "¿Cuánto tarda en ponerse en marcha un flujo?", a: "Depende del proceso y de las herramientas que conecte. Un flujo sencillo puede estar listo en una o dos semanas; los procesos más amplios se planifican por fases." },
  { q: "¿Tengo que cambiar las herramientas que uso?", a: "No. Conectamos las que ya tenéis (correo, hojas de cálculo, CRM, formularios…) para que compartan la información sin copiar y pegar." },
  { q: "¿Qué tipo de tareas se pueden automatizar?", a: "Aprobaciones, avisos y recordatorios, captura de datos de formularios, generación de documentos y el paso de información entre aplicaciones." },
  { q: "¿Incluye soporte y mantenimiento?", a: "Sí. Revisamos que el flujo siga funcionando y lo ajustamos cuando cambian vuestras necesidades." },
  { q: "¿Cómo empiezo?", a: "Agenda una cita gratuita o escríbenos por WhatsApp: nos cuentas el proceso que te quita tiempo y te proponemos cómo simplificarlo." },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#fbf8f3] text-[#1b1530]">
      {/* ─────────── PORTADA ─────────── */}
      <section className="relative px-5 pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#ddd6fe] opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-[380px] w-[380px] rounded-full bg-[#fde68a] opacity-50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6d28d9]/20 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-[#6d28d9]">
              <Workflow size={14} /> Automatización de flujos de trabajo
            </span>
            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl" style={titulo}>
              Tu equipo no necesita más tareas. Necesita <span className="fp-marca">fluidez.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4a4366]">
              Convertimos las tareas que se repiten cada día en flujos claros, conectados y fáciles de seguir.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#agendar" className="inline-flex items-center gap-2 rounded-full bg-[#6d28d9] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(109,40,217,0.35)] transition hover:bg-[#5b21b6]">
                Agendar una cita <ArrowRight size={16} />
              </Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#1b1530]/20 bg-white px-6 py-3.5 text-sm font-semibold transition hover:border-[#6d28d9] hover:text-[#6d28d9]">
                <MessageCircle size={16} /> WhatsApp · atención 24 h
              </a>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-[#1b1530]">
              {["Menos trabajo manual", "Procesos conectados", "Más tiempo útil"].map((x) => (
                <li key={x} className="flex items-center gap-2"><CircleCheck size={18} className="text-[#6d28d9]" />{x}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6b6488]">
              <span className="flex items-center gap-2"><MapPin size={15} />C. Joaquín María López, 26 · Madrid</span>
              <span className="flex items-center gap-2"><Clock size={15} />Lunes a viernes · 09:30–18:00</span>
            </div>
          </div>

          {/* Panel de flujo */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="fp-float absolute -left-6 -top-6 z-10 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold shadow-[0_10px_30px_rgba(27,21,48,0.12)]">
              <Hourglass size={16} className="text-[#f59e0b]" /> −6 h a la semana
            </div>
            <div className="fp-float-2 absolute -bottom-5 -right-4 z-10 flex items-center gap-2 rounded-2xl bg-[#1b1530] px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(27,21,48,0.25)]">
              <ShieldCheck size={16} className="text-[#a78bfa]" /> Sin pasos olvidados
            </div>
            <div className="rounded-[28px] border border-[#1b1530]/10 bg-white p-6 shadow-[0_30px_80px_rgba(109,40,217,0.18)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a93b5]">Flujo de ejemplo</p>
                  <p className="text-base font-bold" style={titulo}>Solicitud de compra</p>
                </div>
                <span className="fp-pulse flex items-center gap-1.5 rounded-full bg-[#ede9fe] px-3 py-1 text-xs font-bold text-[#6d28d9]">
                  <span className="h-2 w-2 rounded-full bg-[#6d28d9]" /> En marcha
                </span>
              </div>
              <ol className="relative mt-6 space-y-5">
                <div className="absolute bottom-4 left-[19px] top-4 w-px border-l-2 border-dashed border-[#c4b5fd]" />
                {PASOS_PANEL.map(({ icon: Icono, t, d, estado, color }) => (
                  <li key={t} className="relative flex items-center gap-4">
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: color }}>
                      <Icono size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-tight">{t}</p>
                      <p className="text-xs text-[#6b6488]">{d}</p>
                    </div>
                    <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: `${color}1f`, color }}>{estado}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#ede9fe]">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#6d28d9] to-[#c026d3]" />
              </div>
              <p className="mt-2 text-xs text-[#6b6488]">Paso 3 de 4 · nadie ha tenido que perseguir a nadie</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── HERRAMIENTAS ─────────── */}
      <section className="border-y border-[#1b1530]/10 bg-white py-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#9a93b5]">Conectamos las herramientas que ya usas</p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="fp-marquee flex w-max items-center gap-14">
            {[...HERRAMIENTAS, ...HERRAMIENTAS].map(([nombre, src], i) => (
              <div key={i} className="flex items-center gap-3 opacity-80">
                <img src={src} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" />
                <span className="text-sm font-semibold text-[#4a4366]">{nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SOLUCIONES ─────────── */}
      <section id="servicios" className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6d28d9]">Soluciones a medida</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl" style={titulo}>Que el trabajo avance. <span className="text-[#6d28d9]">Sin perseguirlo.</span></h2>
            <p className="mt-4 text-lg text-[#4a4366]">Hay tareas que se repiten cada día. Las convertimos en flujos claros, conectados y fáciles de seguir.</p>
          </div>

          <div className="mt-12 grid auto-rows-[minmax(190px,auto)] gap-5 md:grid-cols-3">
            <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#6d28d9] via-[#7c3aed] to-[#c026d3] p-8 text-white md:col-span-2 md:row-span-2">
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10" />
              <div className="absolute -bottom-16 right-10 h-48 w-48 rounded-full bg-[#f59e0b]/30 blur-2xl" />
              <Workflow size={40} className="relative" />
              <div className="relative mt-24">
                <h3 className="text-3xl font-extrabold" style={titulo}>Automatización de flujos de trabajo</h3>
                <p className="mt-3 max-w-md text-white/85">Conectamos pasos, responsables y herramientas para que cada tarea llegue a quien corresponde.</p>
              </div>
            </article>
            {[
              { i: CircleCheck, t: "Aprobaciones sin perseguir a nadie", d: "Solicitudes, validaciones y avisos que siguen su recorrido sin cadenas interminables de mensajes.", bg: "bg-white" },
              { i: FileText, t: "Documentos y formularios", d: "Capturamos información, generamos documentos y organizamos los datos sin volver a copiarlos.", bg: "bg-[#fef3c7]" },
              { i: Plug, t: "Integración de aplicaciones", d: "Hacemos que correo, hojas de cálculo, CRM y otras plataformas compartan la información necesaria.", bg: "bg-[#ede9fe]" },
              { i: BellRing, t: "Recordatorios y seguimiento", d: "Los plazos dejan de depender de la memoria: avisos y estados para saber qué falta y quién lo lleva.", bg: "bg-white" },
              { i: Settings2, t: "Flujos adaptados a tu empresa", d: "Analizamos cómo trabajáis y diseñamos automatizaciones que encajen con vuestro proceso real.", bg: "bg-[#1b1530] text-white" },
            ].map(({ i: Icono, t, d, bg }) => (
              <article key={t} className={`rounded-3xl border border-[#1b1530]/10 p-7 ${bg}`}>
                <Icono size={26} className={bg.includes("text-white") ? "text-[#a78bfa]" : "text-[#6d28d9]"} />
                <h3 className="mt-5 text-lg font-bold" style={titulo}>{t}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${bg.includes("text-white") ? "text-white/70" : "text-[#4a4366]"}`}>{d}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm font-semibold tracking-wide text-[#6b6488]">Menos tareas. Más ideas. Mejor flujo.</p>
        </div>
      </section>

      {/* ─────────── CÓMO FUNCIONA ─────────── */}
      <section id="como-funciona" className="bg-[#1b1530] px-5 py-24 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fbbf24]">Cómo funciona</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl" style={titulo}>Del «siempre lo hacemos así» al <span className="text-[#fbbf24]">ya está hecho.</span></h2>
          <p className="mt-4 max-w-2xl text-lg text-white/65">Primero entendemos tu proceso. Después diseñamos el flujo que lo hace más sencillo.</p>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-4">
            {PASOS.map((p) => (
              <li key={p.n} className="bg-[#1b1530] p-7 transition hover:bg-[#241b44]">
                <span className="text-5xl font-extrabold text-transparent [-webkit-text-stroke:1.5px_#a78bfa]" style={titulo}>{p.n}</span>
                <h3 className="mt-6 text-lg font-bold" style={titulo}>{p.t}</h3>
                <p className="mt-2 text-sm text-white/60">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────── POR QUÉ ─────────── */}
      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6d28d9]">¿Por qué FlujoPro?</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl" style={titulo}>Tu tiempo vale más que <span className="fp-marca">copiar y pegar.</span></h2>
            <a href={RESENAS} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#1b1530]/10 bg-white px-5 py-4 shadow-sm transition hover:shadow-md">
              <span className="flex gap-0.5 text-[#f59e0b]">{[0, 1, 2, 3, 4].map((k) => <Star key={k} size={18} fill="currentColor" />)}</span>
              <span className="text-sm font-semibold">Lo que dicen de nosotros en Google <ArrowRight size={14} className="ml-1 inline" /></span>
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { i: Hourglass, t: "Recupera tiempo", d: "Las tareas repetitivas dejan de ocupar las horas de tu equipo." },
              { i: Link2, t: "Conecta el trabajo", d: "Información y avisos que pasan de una herramienta a otra." },
              { i: ShieldCheck, t: "Reduce errores", d: "Pasos definidos para que el proceso no dependa de recordar cada detalle." },
              { i: TrendingUp, t: "Crece sin más rutina", d: "Flujos que se ajustan cuando cambian tus necesidades." },
            ].map(({ i: Icono, t, d }) => (
              <div key={t} className="rounded-3xl border border-[#1b1530]/10 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ede9fe] text-[#6d28d9]"><Icono size={22} /></span>
                <h3 className="mt-4 text-lg font-bold" style={titulo}>{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4a4366]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── PREGUNTAS ─────────── */}
      <section id="preguntas" className="bg-[#f3eee6] px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6d28d9]">Preguntas frecuentes</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight" style={titulo}>Lo que suelen preguntarnos</h2>
            <p className="mt-4 text-[#4a4366]">Todo lo que necesitas saber sobre la automatización de flujos de trabajo en tu empresa.</p>
          </div>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#1b1530]/10 bg-white px-6 py-5 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold" style={titulo}>
                  {f.q}
                  <Plus size={20} className="shrink-0 text-[#6d28d9] transition group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#4a4366]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── AGENDAR ─────────── */}
      <section id="agendar" className="px-5 py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#6d28d9] via-[#7c3aed] to-[#a21caf] p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="text-white">
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" style={titulo}>Hablemos de ese proceso que te roba tiempo.</h2>
              <p className="mt-4 text-lg text-white/80">¿Cuánto tiempo se pierde en tareas que podrían hacerse solas? Agenda una llamada gratuita de 30 minutos.</p>
              <ul className="mt-8 space-y-4 text-sm font-semibold">
                <li><a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#fde68a]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><MessageCircle size={18} /></span>WhatsApp · atención 24 h<br />+34 606 806 376</a></li>
                <li><a href="tel:+34606806376" className="flex items-center gap-3 hover:text-[#fde68a]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><Phone size={18} /></span>Atención telefónica 24 h · 365 días</a></li>
                <li className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><Clock size={18} /></span>Lunes a viernes · 09:30–18:00</li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-2xl">
              <Reserva />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── UBICACIÓN ─────────── */}
      <section id="ubicacion" className="px-5 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6d28d9]">Encuéntranos</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight" style={titulo}>C. Joaquín María López, 26 · Madrid</h2>
              <p className="mt-1 text-sm text-[#6b6488]">Aparcamiento público cercano: C. Blasco de Garay, 61. Sábados, domingos y festivos: cerrado.</p>
            </div>
            <a href="https://maps.google.com/?q=Calle+Joaquín+María+López+26+Madrid" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1b1530] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"><MapPin size={16} /> Cómo llegar</a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#1b1530]/10">
            <iframe
              title="Mapa de FlujoPro" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Calle+Joaquín+María+López+26+Madrid&output=embed"
              className="h-[380px] w-full border-0"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
