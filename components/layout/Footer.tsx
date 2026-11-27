import Link from "next/link";
import Marca from "@/components/sentry/Marca";

const Ig = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
const Fb = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.5c0-.7.2-1.1 1.2-1.1H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.5 3.5 10.5 6.2V8H8v3.4h2.5V22H14V11.4h2.7L17 8h-3Z" /></svg>;
const Yt = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8ZM9.8 15.5v-7l6 3.5-6 3.5Z" /></svg>;
const Tt = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.1-2.8V9.2a6.3 6.3 0 1 0 5.4 6.2V8.6a7.7 7.7 0 0 0 4.4 1.4V6.7a4.4 4.4 0 0 1-4.4-4.7Z" /></svg>;
const X = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2.2h3.3l-7.2 8.3 8.5 11.3h-6.7l-5.2-6.8-6 6.8H1.6l7.7-8.8L1.2 2.2H8l4.7 6.2 5.5-6.2Zm-1.2 17.6h1.8L7 4.1H5.1l11.9 15.7Z" /></svg>;

export default function Footer() {
  const col = (titulo: string, items: [string, string][]) => (
    <div>
      <h3 className="text-[14px] font-medium text-white">{titulo}</h3>
      <ul className="mt-5 space-y-3.5 text-[14px] text-white/65">
        {items.map(([t, h]) => <li key={t}><Link href={h} className="transition hover:text-white">{t}</Link></li>)}
      </ul>
    </div>
  );
  return (
    <footer className="fx-pie relative overflow-hidden">
      <div className="fp-hatch" />
      <div className="relative mx-auto max-w-[1320px] overflow-hidden">
        <div className="fp-hatch-line grid gap-10 px-5 pb-8 pt-16 md:grid-cols-[1.2fr_2fr] md:px-9">
          <div className="flex items-start gap-2.5">
            <Marca size={28} />
            <span className="text-[22px] tracking-[-0.03em] text-white">FlujoPro</span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {col("Soluciones", [["Resumen", "/#servicios"], ["Casos de uso", "/#casos"], ["Cómo funciona", "/#como-funciona"]])}
            {col("Empresa", [["Preguntas", "/#preguntas"], ["Ubicación", "/#ubicacion"], ["Agendar cita", "/#agendar"], ["Blog", "/blog"]])}
            {col("Legal", [["Privacidad", "/politica-de-privacidad"], ["Términos", "/terminos"], ["Eliminar datos", "/eliminacion-de-datos"]])}
          </div>
        </div>
        <div className="pointer-events-none select-none px-5 pt-6 md:px-9" aria-hidden>
          <div className="fp-watermark text-center text-[18vw] font-medium leading-[0.9] tracking-[-0.06em] md:text-[15rem]">FlujoPro</div>
        </div>
        <div className="-mt-16 flex flex-wrap items-center justify-between gap-4 px-5 pb-8 pt-4 text-[14px] text-white md:-mt-24 md:px-9">
          <span>© {new Date().getFullYear()} FlujoPro. Todos los derechos reservados.</span>
          <div className="flex items-center gap-5 text-white">
            <a href="https://www.instagram.com/n8n.labs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Ig /></a>
            <a href="https://www.facebook.com/profile.php?id=61560356115236" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Fb /></a>
            <a href="https://www.youtube.com/@n8nlabs_madrid" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Yt /></a>
            <a href="https://www.tiktok.com/@n8nlabs" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><Tt /></a>
            <a href="https://x.com/N8nLabs" target="_blank" rel="noopener noreferrer" aria-label="X"><X /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
