"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// La misma clave que la web anterior: quien ya respondió no vuelve a ver el aviso.
const CLAVE = "flujopro-cookie-choice";

export default function AvisoCookies() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let respondido = false;
    try { respondido = !!window.localStorage.getItem(CLAVE); } catch { /* sin almacenamiento */ }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- solo se puede saber en el navegador
    if (!respondido) setVisible(true);
  }, []);

  function elegir(opcion: "accepted" | "rejected") {
    try { window.localStorage.setItem(CLAVE, opcion); } catch { /* sin almacenamiento */ }
    window.dispatchEvent(new CustomEvent("flujopro:cookie-choice", { detail: { choice: opcion } }));
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <aside role="region" aria-label="Preferencias de cookies" className="fixed inset-x-0 bottom-0 z-[20000] flex flex-col items-start gap-3 bg-[#151515] py-4 pr-14 pl-5 text-white shadow-[0_-5px_22px_rgba(0,0,0,0.18)] md:flex-row md:items-center md:justify-center md:gap-6 md:pl-8">
      <p className="max-w-[760px] text-[12.5px] leading-relaxed">
        Utilizamos cookies y tecnologías similares propias y de terceros, de sesión o persistentes, para hacer funcionar de manera segura nuestra página web y personalizar su contenido. Igualmente, utilizamos cookies para medir y obtener datos de la navegación que realizas y para ajustar la publicidad a tus gustos y preferencias. Puedes aceptar el uso de cookies a continuación.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => elegir("accepted")} className="rounded-lg bg-white px-5 py-2.5 text-[13px] font-bold text-[#151515]">Aceptar</button>
        <button type="button" onClick={() => elegir("rejected")} className="rounded-lg border border-white/50 px-5 py-2.5 text-[13px] font-bold">Rechazar</button>
        <a href="/politica-de-privacidad" className="text-[13px] underline">Política de privacidad</a>
      </div>
      <button type="button" onClick={() => setVisible(false)} aria-label="Cerrar aviso de cookies" className="absolute top-3 right-3 rounded-lg p-1.5 hover:bg-white/10"><X size={18} /></button>
    </aside>
  );
}
