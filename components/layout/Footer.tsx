import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#120c2b] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/logo-flujopro.svg" alt="" width={34} height={34} className="rounded-xl" />
            <span className="text-lg font-bold" style={{ fontFamily: "var(--font-poppins)" }}>FlujoPro</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">Automatización de flujos de trabajo en Madrid y toda España: menos pasos, más avance.</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Soluciones</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link href="/#servicios" className="hover:text-white">Flujos de trabajo</Link></li>
            <li><Link href="/#servicios" className="hover:text-white">Aprobaciones</Link></li>
            <li><Link href="/#servicios" className="hover:text-white">Documentos y formularios</Link></li>
            <li><Link href="/#servicios" className="hover:text-white">Integración de aplicaciones</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li><Link href="/politica-de-privacidad" className="hover:text-white">Política de privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-white">Términos y condiciones</Link></li>
            <li><Link href="/eliminacion-de-datos" className="hover:text-white">Eliminación de datos</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0 text-[#f59e0b]" /><a href="tel:+34606806376" className="hover:text-white">+34 606 806 376</a></li>
            <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-[#f59e0b]" />C. Joaquín María López, 26, 28015 Madrid</li>
            <li className="flex gap-2.5"><Clock size={16} className="mt-0.5 shrink-0 text-[#f59e0b]" />Lunes a viernes · 09:30–18:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">© {new Date().getFullYear()} FlujoPro. Todos los derechos reservados.</div>
    </footer>
  );
}
