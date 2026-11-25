"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

const CAMPO = "w-full rounded-lg border border-[#e6dcc4] bg-white/80 px-4 py-3 text-[14.5px] text-[#2a2618] outline-none transition placeholder:text-[#9a9585] focus:border-[#e8591d] focus:ring-2 focus:ring-[#e8591d]/20";

export default function FormularioContacto() {
  const cargado = useRef(0);
  const [estado, setEstado] = useState<"" | "enviando" | "enviado" | "error">("");
  useEffect(() => { cargado.current = Date.now(); }, []);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formulario = e.currentTarget;
    setEstado("enviando");
    try {
      const r = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(formulario).entries()), ts: cargado.current }),
      });
      if (!r.ok) throw new Error();
      formulario.reset();
      setEstado("enviado");
    } catch {
      setEstado("error");
    }
  }

  return (
    <form id="contacto" onSubmit={enviar} className="fp-card grid gap-3 p-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <h3 className="text-[19px] font-semibold tracking-tight">¿Prefieres escribirnos?</h3>
        <p className="mt-1 text-[14px] text-[#7c776a]">Cuéntanos qué proceso quieres automatizar y te respondemos.</p>
      </div>
      {/* Campo trampa para robots: las personas no lo ven */}
      <input type="text" name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <input name="nombre" required maxLength={120} placeholder="Nombre" aria-label="Nombre" className={CAMPO} />
      <input name="telefono" type="tel" required maxLength={60} placeholder="Teléfono" aria-label="Teléfono" className={CAMPO} />
      <input name="email" type="email" required maxLength={180} placeholder="Correo electrónico" aria-label="Correo electrónico" className={CAMPO} />
      <input name="empresa" required maxLength={160} placeholder="Empresa" aria-label="Empresa" className={CAMPO} />
      <textarea name="mensaje" required maxLength={4000} rows={4} placeholder="¿Qué proceso te gustaría automatizar? ¿Desde cuándo te da problemas? ¿Para cuándo lo necesitas?" aria-label="Tu consulta" className={`${CAMPO} sm:col-span-2`} />
      <label className="flex items-start gap-2 text-[13px] text-[#5d5745] sm:col-span-2">
        <input type="checkbox" required className="mt-0.5 accent-[#e8591d]" />
        <span>Acepto la <a href="/politica-de-privacidad" target="_blank" className="font-semibold text-[#c94a12] underline">política de privacidad</a>.</span>
      </label>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button type="submit" disabled={estado === "enviando"} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#f6a821] to-[#e8491d] px-5 py-3 text-[14px] font-semibold text-white transition hover:brightness-105 disabled:opacity-60">
          {estado === "enviando" ? "Enviando…" : "Enviar consulta"} <ArrowRight size={16} />
        </button>
        <p role="status" aria-live="polite" className={`text-[13.5px] font-medium ${estado === "error" ? "text-[#b3261e]" : "text-[#3f7d2c]"}`}>
          {estado === "enviado" ? "Consulta enviada correctamente." : estado === "error" ? "No se pudo enviar. Contacta por teléfono o WhatsApp." : ""}
        </p>
      </div>
    </form>
  );
}
