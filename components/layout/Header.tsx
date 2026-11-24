"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, CalendarDays } from "lucide-react";

const WA = "https://api.whatsapp.com/send?phone=34606806376&text=Hola%2C%20FlujoPro";

// Los anclajes llevan "/" delante para que también funcionen desde /blog y las páginas legales
const base = [
  { label: "Soluciones", href: "/#servicios" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Preguntas", href: "/#preguntas" },
  { label: "Ubicación", href: "/#ubicacion" },
];

// showBlog: el enlace al blog solo aparece cuando ya hay artículos publicados
export default function Header({ showBlog = false }: { showBlog?: boolean }) {
  const links = showBlog ? [...base, { label: "Blog", href: "/blog" }] : base;
  const [abierto, setAbierto] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const f = () => setScroll(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scroll ? "bg-[#fbf8f3]/90 shadow-[0_1px_0_rgba(23,17,46,0.08)] backdrop-blur-md" : "bg-transparent"}`}
      style={{ height: 72 }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setAbierto(false)}>
          <img src="/logo-flujopro.svg" alt="FlujoPro" width={36} height={36} className="rounded-xl" />
          <span className="text-lg font-bold tracking-tight text-[#1b1530]" style={{ fontFamily: "var(--font-poppins)" }}>FlujoPro</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-[#4a4366] transition hover:text-[#6d28d9]">{l.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#1b1530]/15 px-4 py-2 text-sm font-semibold text-[#1b1530] transition hover:border-[#6d28d9] hover:text-[#6d28d9]">
            <MessageCircle size={16} /> WhatsApp
          </a>
          <Link href="/#agendar" className="inline-flex items-center gap-2 rounded-full bg-[#1b1530] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#6d28d9]">
            <CalendarDays size={16} /> Agendar cita
          </Link>
        </div>

        <button className="lg:hidden" aria-label="Menú" onClick={() => setAbierto((v) => !v)}>
          {abierto ? <X size={26} color="#1b1530" /> : <Menu size={26} color="#1b1530" />}
        </button>
      </div>

      {abierto && (
        <div className="absolute inset-x-0 top-[72px] border-t border-[#1b1530]/10 bg-[#fbf8f3] px-5 pb-6 pt-3 shadow-lg lg:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setAbierto(false)} className="block border-b border-[#1b1530]/10 py-3.5 text-base font-medium text-[#1b1530]">{l.label}</Link>
          ))}
          <div className="mt-4 flex flex-col gap-2.5">
            <Link href="/#agendar" onClick={() => setAbierto(false)} className="rounded-full bg-[#6d28d9] py-3 text-center text-sm font-semibold text-white">Agendar cita</Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#1b1530]/20 py-3 text-center text-sm font-semibold text-[#1b1530]">Escribir por WhatsApp</a>
          </div>
        </div>
      )}
    </header>
  );
}
