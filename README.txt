FLUJOPRO | AUTOMATIZACIÓN FLUJOS DE TRABAJO — DESPLIEGUE EN VERCEL

Marca: FlujoPro | Automatización Flujos de Trabajo
Dominio: https://automatizacionflujostrabajo.com/
Teléfono: +34 910 05 40 12
WhatsApp: +34 638 61 95 88
Ficha de Google: https://maps.app.goo.gl/NbdVhk4eLpygfeV88

────────────────────────────────────────────────────────────
REVISIÓN COMPLETA DEL REPOSITORIO (a petición del cliente: "revisa
todo el código, que todo esté bien enlazado y funcionando, versión
móvil y escritorio")
────────────────────────────────────────────────────────────

Este repositorio se creó a partir de una copia del de SmartSheets, y
arrastraba varios residuos de esa copia que no se habían corregido:

BUG REAL — api/contacto.js y package.json eran una copia literal del
backend de SmartSheets (remitente "SmartSheets", asunto del correo
mencionando Excel, nombre de paquete
"smartsheets-automatizaciones-excel"). Corregidos a FlujoPro (ya
solucionado en una pasada anterior, junto con los campos del
formulario que estaban en inglés en vez de español).

BUG REAL — el botón flotante del chatbot se veía por encima de la
barra de cookies. Causa: dos reglas ".cookie-banner" con z-index
distinto en dos archivos CSS, y la que se cargaba en último lugar
tenía el valor más bajo. Ya corregido en una pasada anterior.

BUG REAL (esta pasada) — 8 archivos CSS/JS existían en el repositorio
pero no estaban enlazados desde index.html en ningún sitio (ni
<link> ni <script src>), así que no tenían ningún efecto en la web
publicada: hero-buttons.css, mobile-navigation.css,
typography-layout.css, cal-booking.css, editorial-enhancements.js,
site-enhancements.js, social-footer.css y style.css. Eran residuos de
una versión anterior del sitio con una estructura de cabecera/menú
distinta (nav.main-nav / .nav-wrap), ya sustituida por la actual
(.nav-links dentro de .container.nav). Todo lo que aportaban esos
archivos ya está cubierto por los que sí están activos
(flujopro.css, hero-degradado.css, flujopro-controls.css):
- El menú móvil ya funciona correctamente con el script inline al
  final de index.html + las reglas @media de flujopro.css.
- Los botones "Agendar una cita" y "Atención Telefónica" del hero ya
  tienen sus propios colores (azul/oscuro) vía las clases
  .appointment/.telephone en flujopro.css.
- La sección "Nuestras Redes sociales" (Facebook/Instagram/YouTube/
  TikTok/X/Snapchat de N8nLabs) ya existe de forma estática en el
  HTML, con su propio estilo (.social/.social-inner/.social-links) en
  flujopro.css — el social-footer.css huérfano usaba otras clases
  distintas (.social-section) y nunca llegó a activarse.
Se han eliminado los 8 archivos huérfanos para que el repositorio
solo contenga lo que realmente está enlazado y en uso.

VERIFICADO (todo correcto, sin cambios necesarios):
- Title, meta description, canonical, robots, og:title/description/
  url/image → todos coinciden con la marca y el dominio reales.
- JSON-LD (schema.org ProfessionalService): name, url, telephone,
  address y hasMap coinciden con los datos proporcionados.
- Teléfono (+34 910 05 40 12) y WhatsApp (+34 638 61 95 88): mismos
  números en las 8 apariciones del sitio (hero, footer, botón
  flotante), todos enlazados correctamente (tel:/wa.me).
- Enlace de Google Maps (maps.app.goo.gl/NbdVhk4eLpygfeV88): 3
  apariciones, todas correctas.
- Iframe de Google Maps embebido (sección .map): usa el place ID
  correcto de FlujoPro (antes tenía uno erróneo en otro repo de la
  familia; aquí ya estaba bien).
- robots.txt y sitemap.xml: apuntan al dominio correcto.
- Todos los enlaces internos (#inicio, #soluciones, #beneficios,
  #como-funciona, #cita, #nosotros, #contacto) tienen su id
  correspondiente en el HTML — no hay anclas rotas.
- No quedan referencias a "SmartSheets", "ThermomixTech" ni
  "soporte@kelatos.com" en el HTML ni en el backend.
- Sección de texto SEO (id="nosotros") ya redactada específicamente
  para FlujoPro (automatización de flujos de trabajo), sin mezclar
  contenido de Excel.
- Formulario de contacto: campos en español, coinciden con lo que
  espera api/contacto.js; envío real por fetch, con mensajes de
  estado ("Enviando...", éxito o aviso de contactar por teléfono/
  WhatsApp si falla).
- Responsive: @media queries de flujopro.css cubren escritorio,
  tablet (900px) y móvil (600px) para header, hero, botones,
  formulario y footer.

PENDIENTE DE CONFIRMAR POR EL CLIENTE (no se ha tocado, por si es
infraestructura compartida deliberada, como ya lo son el teléfono/
WhatsApp/Cal.com en otras webs de la familia):
- El webhook del chatbot (n8n) apunta al mismo flujo compartido que
  usan las webs de la familia "kelatos" (mantenimiento informático),
  no a uno propio de FlujoPro/N8nLabs. Si no es intencional, las
  conversaciones de clientes de FlujoPro podrían llegar al flujo
  equivocado.
- El enlace "Política de privacidad" (barra de cookies y footer)
  apunta a https://kelatos.com/privacy-policy/, mientras que el
  footer de FlujoPro dice "Somos parte del Grupo N8nLabs" — si
  FlujoPro no pertenece realmente al grupo Kelatos, convendría un
  enlace a una política de privacidad propia de N8nLabs.

IMPORTANTE: para que el formulario envíe correos de verdad hace falta
configurar en Vercel las variables SMTP_HOST, SMTP_PORT, SMTP_SECURE,
SMTP_USER, SMTP_PASS y CONTACT_EMAIL.
