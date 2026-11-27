// Datos públicos de la web usados por el SEO (metadatos, sitemap, datos estructurados).
// Solo contiene lo que ya aparece publicado en la propia web.

export const SITE_URL = "https://automatizacionflujostrabajo.com";
export const SITE_NAME = "FlujoPro";
export const SITE_TITLE = "FlujoPro | Automatización de flujos de trabajo para empresas";
export const SITE_DESCRIPTION = "Automatizamos flujos de trabajo para que tu equipo deje de repetir tareas, conecte sus herramientas y dedique más tiempo a lo importante. FlujoPro, Madrid y toda España.";

export const BUSINESS = {
  name: SITE_NAME,
  url: SITE_URL,
  email: "soporte@automatizacionesn8n.com",
  telephone: "+34606806376",
  address: {
    streetAddress: "Calle Blasco de Garay 63, Local 2",
    addressLocality: "Madrid",
    postalCode: "28015",
    addressRegion: "Madrid",
    addressCountry: "ES",
  },
} as const;

/** URL absoluta a partir de una ruta relativa. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
