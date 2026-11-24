import { MessageCircle } from "lucide-react";

export default function FlotanteWhatsApp() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=34606806376&text=Hola%2C%20FlujoPro.%20Quiero%20automatizar%20un%20proceso."
      target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition hover:scale-105"
    >
      <MessageCircle size={28} />
    </a>
  );
}
