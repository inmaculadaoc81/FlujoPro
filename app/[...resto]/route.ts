/**
 * Direcciones que ya no existen (las de la web antigua que Google aún conoce) llevan a la portada, como hacía la web anterior.
 * Es la ruta de menor prioridad: las páginas, el blog y los archivos de public/ se sirven antes.
 */
export function GET(req: Request) {
  return Response.redirect(new URL("/", req.url), 308);
}
