"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Marca from "@/components/sentry/Marca";

// Los anclajes llevan "/" delante para que también funcionen desde /blog y las páginas legales
const base = [
  { label: "Cómo funciona", href: "/#como-funciona", id: "como-funciona" },
  { label: "Soluciones", href: "/#servicios", id: "servicios" },
  { label: "Casos de uso", href: "/#casos", id: "casos" },
  { label: "Preguntas", href: "/#preguntas", id: "preguntas" },
  { label: "Contacto", href: "/#agendar", id: "agendar" },
];

const WA = "https://api.whatsapp.com/send?phone=34623201011&text=Hola%2C%20FlujoPro.%20Quiero%20automatizar%20un%20proceso.";

// showBlog: el enlace al blog solo aparece cuando ya hay artículos publicados
export default function Header({ showBlog = false }: { showBlog?: boolean }) {
  const links = showBlog ? [...base, { label: "Blog", href: "/blog", id: "blog" }] : base;
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();
  // null = aún sin medir. En el servidor la ruta de la portada puede llegar distinta (regeneración en Vercel), así que no se usa para pintar.
  const [oscura, setOscura] = useState<boolean | null>(null);
  const [activa, setActiva] = useState("");
  const { scrollYProgress } = useScroll();
  const avance = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const f = () => {
      // oscura solo mientras la cabecera está encima de la portada
      const portada = document.getElementById("inicio");
      setOscura(!!portada && portada.getBoundingClientRect().bottom > 90);
      let actual = "";
      for (const l of base) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) actual = l.id;
      }
      setActiva(actual);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("resize", f); };
  }, [pathname]);

  const marcada = pathname.startsWith("/blog") ? "blog" : activa;

  return (
    <header className={`fx-cabecera ${oscura === null ? "fx-cab-auto" : oscura ? "fx-cab-noche" : "fx-cab-dia"}`}>
      <div className="fx-cab-rejilla">
        <div className="fx-cab-celda">
          <Link href="/" className="flex items-center gap-2.5 pl-4" onClick={() => setAbierto(false)}>
            <Marca />
            <span className="text-[23px] tracking-[-0.03em]">FlujoPro</span>
          </Link>
        </div>
        <nav className="fx-cab-celda fx-cab-menu">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`fx-cab-enlace ${marcada === l.id ? "fx-activo" : ""}`}>{l.label}</Link>
          ))}
        </nav>
        <div className="fx-cab-celda justify-end gap-1.5 pr-2">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="fx-cab-secundario hidden xl:inline-flex">WhatsApp</a>
          <Link href="/#agendar" className="fx-cab-principal hidden sm:inline-flex">Agendar cita</Link>
          <button className="flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Menú" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}>
            {abierto ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <motion.div className="fx-cab-avance" style={{ scaleX: avance }} />

      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
            className="pointer-events-auto absolute inset-x-0 top-full mt-1.5 border border-white bg-[#ecedf6]/97 px-5 pt-1 pb-5 text-[#26272c] shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setAbierto(false)} className="block border-b border-white py-3.5 text-base">{l.label}</Link>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer" className="fp-btn-glass mt-4 w-full justify-center">WhatsApp</a>
            <Link href="/#agendar" onClick={() => setAbierto(false)} className="fp-btn-grad mt-2.5 w-full justify-center">Agendar cita</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
