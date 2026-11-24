"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

// Los anclajes llevan "/" delante para que también funcionen desde /blog y las páginas legales
const base = [
  { label: "Soluciones", href: "/#servicios" },
  { label: "Casos de uso", href: "/#casos" },
  { label: "Integraciones", href: "/#integraciones" },
  { label: "Preguntas", href: "/#preguntas" },
  { label: "Ubicación", href: "/#ubicacion" },
];

// showBlog: el enlace al blog solo aparece cuando ya hay artículos publicados
export default function Header({ showBlog = false }: { showBlog?: boolean }) {
  const links = showBlog ? [...base, { label: "Blog", href: "/blog" }] : base;
  const [abierto, setAbierto] = useState(false);
  const [pill, setPill] = useState(false);

  useEffect(() => {
    const f = () => setPill(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-0">
      {/* Arriba: barra a todo el ancho. Al bajar: se separa del borde y se convierte en una píldora flotante. */}
      <motion.div
        className="pointer-events-auto relative w-full backdrop-blur-xl"
        initial={false}
        animate={{
          maxWidth: pill ? 960 : 2400,
          marginTop: pill ? 12 : 0,
          height: pill ? 56 : 70,
          borderRadius: pill ? 999 : 0,
          backgroundColor: pill ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.72)",
          borderColor: pill ? "rgba(15,23,42,0.1)" : "rgba(15,23,42,0)",
          boxShadow: pill ? "0 14px 44px rgba(15,23,42,0.14)" : "0 0 0 rgba(15,23,42,0)",
        }}
        transition={{ type: "spring", stiffness: 130, damping: 22, mass: 0.9 }}
        style={{ border: "1px solid transparent" }}
      >
        <motion.span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[#e9ebee]" animate={{ opacity: pill ? 0 : 1 }} />
        <div className={`mx-auto flex h-full w-full max-w-[1136px] items-center px-5 transition-[padding] duration-500 ${pill ? "md:px-6" : "md:px-9"}`}>
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setAbierto(false)}>
            <img src="/logo-flujopro.svg" alt="" width={30} height={30} className={`rounded-lg transition-all duration-500 ${pill ? "scale-90" : ""}`} />
            <span className="text-[18px] font-semibold uppercase tracking-tight text-[#0b0d10]">FlujoPro</span>
          </Link>
          <nav className="ml-auto mr-5 hidden items-center gap-6 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-[14px] font-medium text-[#3a4148] transition hover:text-[#0e7c8f]">{l.label}</Link>
            ))}
          </nav>
          <Link href="/#agendar" className={`fp-btn-mint ml-auto hidden !py-2 !text-[13.5px] lg:ml-0 lg:inline-flex ${pill ? "!rounded-full" : ""}`}>Agendar cita</Link>
          <button className="ml-auto lg:hidden" aria-label="Menú" onClick={() => setAbierto((v) => !v)}>
            {abierto ? <X size={26} color="#0b0d10" /> : <Menu size={26} color="#0b0d10" />}
          </button>
        </div>

        <AnimatePresence>
          {abierto && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-2xl border border-[#e3e6e9] bg-white/95 px-5 pb-6 pt-2 shadow-xl backdrop-blur-xl lg:hidden"
            >
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setAbierto(false)} className="block border-b border-[#eef0f2] py-3.5 text-base text-[#0b0d10]">{l.label}</Link>
              ))}
              <Link href="/#agendar" onClick={() => setAbierto(false)} className="fp-btn-mint mt-5 w-full justify-center">Agendar cita</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
