"use client";

import { useState } from "react";
import { UseCaseArt } from "@/components/iso/Iso";

const CASOS = [
  { id: "aprobaciones", etiqueta: "Aprobaciones", glyph: "flow" as const },
  { id: "documentos", etiqueta: "Documentos y formularios", glyph: "doc" as const },
  { id: "avisos", etiqueta: "Recordatorios y seguimiento", glyph: "bell" as const },
];

const DATOS = [
  { t: "Menos trabajo manual", d: "Las tareas repetitivas dejan de ocupar horas." },
  { t: "Procesos conectados", d: "La información pasa sola de una herramienta a otra." },
  { t: "Más tiempo útil", d: "Tu equipo se dedica a lo que de verdad importa." },
];

export default function UseCases() {
  const [activo, setActivo] = useState(CASOS[0].id);
  const caso = CASOS.find((c) => c.id === activo) ?? CASOS[0];
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-x-1 border-b border-[#16181b] px-6 md:px-9">
        {CASOS.map((c) => (
          <button
            key={c.id} role="tab" aria-selected={c.id === activo} onClick={() => setActivo(c.id)}
            className={`-mb-px border-b px-3.5 py-3 text-[13.5px] transition ${c.id === activo ? "border-[#84dded] text-white" : "border-transparent text-[#8d9094] hover:text-white"}`}
          >
            {c.etiqueta}
          </button>
        ))}
      </div>
      <div className="p-3 md:p-4">
        <div className="fp-frame relative overflow-hidden rounded-2xl p-3 md:p-10">
          <div className="fp-brackets relative rounded-md bg-[#0b0c0e] px-4 pb-24 pt-8 md:px-16">
            <UseCaseArt glyph={caso.glyph} />
          </div>
          <div className="relative -mt-20 grid gap-3 px-1 md:mx-auto md:max-w-[640px] md:grid-cols-3 md:px-0">
            {DATOS.map((d) => (
              <div key={d.t} className="rounded-xl border border-[#23262a] bg-[#16181b] p-5">
                <p className="text-[17px] font-medium text-white">{d.t}</p>
                <p className="mt-2 text-[13px] leading-snug text-[#8d9094]">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
