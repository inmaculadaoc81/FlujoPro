/** Símbolo de FlujoPro en un solo color (toma el color del texto), como la marca del diseño. */
export default function Marca({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="9 11 46 46" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="18" cy="20" r="5" /><circle cx="45" cy="48" r="5" />
      <path d="M23 20h13a9 9 0 0 1 9 9v6" /><path d="M39 31l6 6 6-6" strokeWidth="4.4" />
    </svg>
  );
}
