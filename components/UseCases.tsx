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
      <div role="tablist" className="flex flex-wrap gap-x-1 border-b border-[#e9ebee] px-6 md:px-9">
        {CASOS.map((c) => (
          <button
            key={c.id} role="tab" aria-selected={c.id === activo} onClick={() => setActivo(c.id)}
            className={`-mb-px border-b-2 px-3.5 py-3 text-[13.5px] font-medium transition ${c.id === activo ? "border-[#0b0d10] text-[#0b0d10]" : "border-transparent text-[#6b7280] hover:text-[#0b0d10]"}`}
          >
            {c.etiqueta}
          </button>
        ))}
      </div>
      <div className="p-3 md:p-4">
        <div className="fp-frame relative overflow-hidden rounded-2xl p-3 md:p-10">
          <div className="fp-brackets relative rounded-md bg-white px-3 pb-24 pt-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:px-10">
            <AnimatePresence mode="wait">
              <motion.div key={caso.id} initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.35 }}>
                <p className="mb-2 text-center text-[15px] font-semibold tracking-tight text-[#0b0d10] md:text-[17px]">{caso.titulo}</p>
                <Flujo />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative -mt-20 grid gap-3 px-1 md:mx-auto md:max-w-[640px] md:grid-cols-3 md:px-0">
            {DATOS.map((d) => (
              <div key={d.t} className="rounded-xl border border-[#e3e6e9] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                <p className="text-[17px] font-medium text-[#0b0d10]">{d.t}</p>
                <p className="mt-2 text-[13px] leading-snug text-[#5b6168]">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
