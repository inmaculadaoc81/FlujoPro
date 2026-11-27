/** Símbolo de FlujoPro en un solo color (toma el color del texto), como la marca del diseño. */
export default function Marca({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="10 10 44 44" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="18" cy="20" r="5" /><circle cx="46" cy="44" r="5" />
      <path d="M23 20h12a8 8 0 0 1 8 8v11" /><path d="M41 39l5 5 5-5" strokeWidth="4.2" />
    </svg>
  );
}
