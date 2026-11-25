"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlowApprovals, FlowDocs, FlowReminders } from "@/components/iso/Flows";

const CASOS = [
  { id: "aprobaciones", etiqueta: "Aprobaciones", titulo: "Una solicitud, aprobada sin perseguir a nadie", Flujo: FlowApprovals },
  { id: "documentos", etiqueta: "Documentos y formularios", titulo: "Rellenas una vez y el documento sale solo", Flujo: FlowDocs },
  { id: "avisos", etiqueta: "Recordatorios y seguimiento", titulo: "Cada plazo avisa a quien toca y se ve el estado", Flujo: FlowReminders },
];

const DATOS = [
  { t: "Menos trabajo manual", d: "Las tareas repetitivas dejan de ocupar horas." },
  { t: "Procesos conectados", d: "La información pasa sola de una herramienta a otra." },
  { t: "Más tiempo útil", d: "Tu equipo se dedica a lo que de verdad importa." },
];

export default function UseCases() {
  const [activo, setActivo] = useState(CASOS[0].id);
  const caso = CASOS.find((c) => c.id === activo) ?? CASOS[0];
  const { Flujo } = caso;
  return (
    <div>
      <div role="tablist" className="fp-card mx-auto mb-5 flex w-fit max-w-full flex-wrap justify-center gap-1 p-1.5">
        {CASOS.map((c) => (
          <button
            key={c.id} role="tab" aria-selected={c.id === activo} onClick={() => setActivo(c.id)}
            className={`relative rounded-lg px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${c.id === activo ? "text-white" : "text-[#7c776a] hover:text-[#2a2618]"}`}
          >
            {c.id === activo && <motion.span layoutId="fp-tab" className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#f4a51f] to-[#e4481c] shadow-[0_8px_18px_rgba(232,89,29,0.3)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="relative">{c.etiqueta}</span>
          </button>
        ))}
      </div>
      <div>
        <div className="fp-panel px-3 pt-6 pb-4 md:px-10 md:pt-8">
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={caso.id} initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.35 }}>
                <p className="mb-2 text-center text-[15px] font-semibold tracking-tight text-[#2a2618] md:text-[17px]">{caso.titulo}</p>
                <Flujo />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {DATOS.map((d) => (
              <div key={d.t} className="fp-card p-5">
                <p className="text-[17px] font-medium text-[#2a2618]">{d.t}</p>
                <p className="mt-2 text-[13px] leading-snug text-[#7c776a]">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
