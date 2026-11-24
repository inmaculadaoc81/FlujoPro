"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#040507]/70 backdrop-blur-xl">
      <div className="fp-wrap flex h-[70px] items-center px-5 md:px-9">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setAbierto(false)}>
          <img src="/logo-flujopro.svg" alt="" width={30} height={30} className="rounded-lg" />
          <span className="text-[19px] font-semibold uppercase tracking-tight text-white">FlujoPro</span>
        </Link>
        <nav className="ml-auto mr-7 hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[14.5px] font-medium text-[#e4e6e8] transition hover:text-[#b5fffc]">{l.label}</Link>
          ))}
        </nav>
        <Link href="/#agendar" className="fp-btn-dark ml-auto hidden !py-2 !text-[13.5px] lg:ml-0 lg:inline-flex">Agendar cita</Link>
        <button className="ml-auto lg:hidden" aria-label="Menú" onClick={() => setAbierto((v) => !v)}>
          {abierto ? <X size={26} color="#fff" /> : <Menu size={26} color="#fff" />}
        </button>
      </div>
      {abierto && (
        <div className="absolute inset-x-0 top-[70px] border-b border-white/10 bg-[#07090b] px-5 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setAbierto(false)} className="block border-b border-white/[0.07] py-3.5 text-base text-white">{l.label}</Link>
          ))}
          <Link href="/#agendar" onClick={() => setAbierto(false)} className="fp-btn-mint mt-5 w-full justify-center">Agendar cita</Link>
        </div>
      )}
    </header>
  );
}
