"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

// Los anclajes llevan "/" delante para que también funcionen desde /blog y las páginas legales
const base = [
  { label: "Cómo funciona", href: "/#como-funciona", id: "como-funciona" },
  { label: "Soluciones", href: "/#servicios", id: "servicios" },
  { label: "Casos de uso", href: "/#casos", id: "casos" },
  { label: "Preguntas", href: "/#preguntas", id: "preguntas" },
  { label: "Contacto", href: "/#agendar", id: "agendar" },
];

// showBlog: el enlace al blog solo aparece cuando ya hay artículos publicados
export default function Header({ showBlog = false }: { showBlog?: boolean }) {
  const links = showBlog ? [...base, { label: "Blog", href: "/blog", id: "blog" }] : base;
  const [abierto, setAbierto] = useState(false);
  const [compacta, setCompacta] = useState(false);
  const [activa, setActiva] = useState("");
  const [encima, setEncima] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const avance = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const f = () => {
      setCompacta(window.scrollY > 40);
      // sección que está en pantalla, para resaltarla en el menú
      let actual = "";
      for (const l of base) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) actual = l.id;
      }
      setActiva(actual);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, [pathname]);

  const marcada = encima ?? (pathname.startsWith("/blog") ? "blog" : activa);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3">
      <motion.div
        className="fp-glass-bar pointer-events-auto relative w-full"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, maxWidth: compacta ? 940 : 1136, marginTop: compacta ? 10 : 16, height: compacta ? 56 : 66 }}
        transition={{ type: "spring", stiffness: 130, damping: 22, mass: 0.9 }}
      >
        <div className="flex h-full items-center pr-2.5 pl-4">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setAbierto(false)}>
            <motion.img src="/logo-flujopro.svg" alt="" width={34} height={34} className="rounded-[10px]" whileHover={{ rotate: -8, scale: 1.08 }} />
            <span className="text-[18px] font-semibold tracking-tight text-[#2a2618]">FlujoPro</span>
          </Link>
          <nav className="mx-auto hidden items-center gap-0.5 lg:flex" onMouseLeave={() => setEncima(null)}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onMouseEnter={() => setEncima(l.id)} className={`relative rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors ${marcada === l.id ? "text-[#2a2618]" : "text-[#6f6a5c] hover:text-[#2a2618]"}`}>
                {marcada === l.id && <motion.span layoutId="fp-nav" className="absolute inset-0 rounded-lg bg-white shadow-[0_2px_10px_rgba(70,55,20,0.1)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">{l.label}</span>
              </Link>
            ))}
          </nav>
          {/* el envoltorio es el que oculta el botón en móvil (la clase del botón fija su propio display) */}
          <span className="ml-auto hidden lg:ml-0 lg:block">
            <Link href="/#agendar" className="fp-btn-grad group !py-2.5 !text-[13.5px]">
              Agendar cita <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </span>
          <button className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white/70 lg:hidden" aria-label="Menú" onClick={() => setAbierto((v) => !v)}>
            {abierto ? <X size={22} color="#2a2618" /> : <Menu size={22} color="#2a2618" />}
          </button>
        </div>
        {/* cuánto llevas leído */}
        <div className="absolute inset-x-6 bottom-0 h-[2px] overflow-hidden rounded-full">
          <motion.div className="h-full origin-left bg-gradient-to-r from-[#f6a821] to-[#e8491d]" style={{ scaleX: avance }} />
        </div>

        <AnimatePresence>
          {abierto && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.22 }}
              className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-[10px] bg-[#fbf9f3]/95 px-5 pt-1 pb-5 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setAbierto(false)} className="block py-3.5 text-base text-[#2a2618]">{l.label}</Link>
              ))}
              <Link href="/#agendar" onClick={() => setAbierto(false)} className="fp-btn-grad mt-4 w-full justify-center">Agendar cita</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
