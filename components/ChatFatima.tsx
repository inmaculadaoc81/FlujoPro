import Script from "next/script";

/** El chat «Fátima» de la web anterior (misma conversación en n8n), colocado encima del botón de WhatsApp. */
export default function ChatFatima() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" precedence="default" />
      <div id="n8n-chat" />
      <Script id="chat-fatima" type="module" strategy="lazyOnload">
        {`
          import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
          createChat({
            webhookUrl: 'https://sswebhookss.affirmatechnology.com/webhook/be1293ae-db62-4ab3-8204-d2ae42505d63/chat',
            webhookConfig: { method: 'POST', headers: {} },
            target: '#n8n-chat', mode: 'window', chatInputKey: 'chatInput', chatSessionKey: 'sessionId',
            showWelcomeScreen: true, defaultLanguage: 'es',
            initialMessages: ['Buenas tardes 👋 Soy Fátima, asistente de FlujoPro. ¿Qué proceso te gustaría automatizar?'],
            i18n: { es: { title: 'FlujoPro', subtitle: 'Asistente virtual', footer: '', getStarted: 'INICIAR CONVERSACIÓN', inputPlaceholder: 'Escribe tu mensaje...' } },
          });
        `}
      </Script>
    </>
  );
}
