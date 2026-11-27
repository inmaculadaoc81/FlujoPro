/* Bloque isométrico de cristal de la portada. Las coordenadas y los tiempos salen del vídeo de referencia.
   Todo se anima con CSS (ver globals.css, clases fx-b-*), así arranca sin esperar a JavaScript. */

const iso = (x: number, y: number) => `matrix(0.866 0.5 -0.866 0.5 ${x} ${y})`;

function Etiqueta({ x, y, texto, clase, caja = false }: { x: number; y: number; texto: string; clase: string; caja?: boolean }) {
  return (
    <g className={clase}>
      <g transform={iso(x, y)}>
        {caja && <rect x="-14" y="-19" width={texto.length * 9.9 + 30} height="28" rx="5" fill="rgba(255,255,255,.17)" stroke="rgba(255,255,255,.28)" />}
        <text className="fx-b-texto" fill="#fff" fillOpacity={caja ? 0.92 : 0.42}>{texto}</text>
      </g>
    </g>
  );
}

export default function HeroBloque() {
  return (
    <svg viewBox="680 290 920 880" className="h-auto w-full overflow-visible" role="img" aria-label="Un flujo de trabajo conectado, representado como un bloque de cristal">
      <defs>
        <linearGradient id="fxTapa" x1="872" y1="468" x2="1330" y2="830" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3357f2" stopOpacity=".92" />
          <stop offset="1" stopColor="#8fb9ff" stopOpacity=".95" />
        </linearGradient>
        <linearGradient id="fxLado" x1="0" y1="640" x2="0" y2="880" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b9d6ff" stopOpacity=".95" />
          <stop offset="1" stopColor="#3b5cf5" stopOpacity="0" />
        </linearGradient>
        <filter id="fxDesenfoque" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>

      {/* retícula: líneas que se dibujan */}
      <g stroke="#fff" strokeOpacity=".16" fill="none">
        {[
          "M872 500 L1236 295", "M1180 297 L1580 522", "M684 806 L1000 626", "M690 806 L1163 1088", "M840 900 L1157 718",
          "M769 713 L1150 933 L1557 698 L1390 600", "M769 713 L935 617",
        ].map((d, i) => <path key={d} d={d} pathLength={1} className="fx-b-trazo" style={{ animationDelay: `${0.75 + i * 0.08}s` }} />)}
      </g>
      <g className="fx-b-aparece" style={{ animationDelay: "1.5s" }} fill="#fff" fillOpacity=".5">
        <rect x="1158" y="1084" width="9" height="7" /><rect x="835" y="897" width="7" height="5" />
      </g>

      {/* sombra del bloque */}
      <path className="fx-b-sombra" d="M832 712 L1173 520 L1500 700 L1156 899 Z" fill="#0a1a9c" fillOpacity=".24" />

      {/* bloque: primero se insinúa y luego sube y se enciende */}
      <g className="fx-b-sube">
        <g className="fx-b-flota">
          <g className="fx-b-lados">
            <path d="M872 640 L1157 806 L1157 856 L872 690 Z" fill="url(#fxLado)" />
            <path d="M1157 806 L1458 633 L1458 683 L1157 856 Z" fill="url(#fxLado)" />
            <path d="M872 642 L1157 808 L1458 635" stroke="#cfe2ff" strokeWidth="7" fill="none" filter="url(#fxDesenfoque)" />
          </g>
          <path d="M1173 468 L1458 633 L1157 806 L872 640 Z" fill="url(#fxTapa)" stroke="#a9c8ff" strokeOpacity=".7" />
          <path d="M1170 502 L1391 630 L1155 765 L934 637 Z" fill="none" stroke="#fff" strokeOpacity=".22" />
          {/* recorrido del flujo sobre la cara superior */}
          <path d="M1034 603 C1075 640 1020 612 1105 590 S1225 575 1190 612 S1120 660 1150 690 S1250 670 1222 720" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1.5" />
          <path d="M1034 603 C1075 640 1020 612 1105 590 S1225 575 1190 612 S1120 660 1150 690 S1250 670 1222 720" pathLength={1} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" className="fx-b-pulso" />
          <g fill="#fff" className="fx-b-aparece" style={{ animationDelay: "2.3s" }}>
            <circle cx="1173" cy="479" r="3.6" /><circle cx="888" cy="642" r="3.6" /><circle cx="1440" cy="631" r="3.6" /><circle cx="1157" cy="797" r="3.6" />
          </g>
          <Etiqueta x={982} y={668} texto="FLUJO EN MARCHA" clase="fx-b-aparece fx-b-d23" caja />
        </g>

        {/* plano de líneas que se despega del bloque */}
        <g className="fx-b-plano">
          <g className="fx-b-flota fx-b-flota-2">
            <path d="M934 517 L1170 382 L1391 510 L1157 645 Z" pathLength={1} fill="rgba(255,255,255,.025)" stroke="#fff" strokeOpacity=".42" className="fx-b-trazo" style={{ animationDelay: "2.45s" }} />
            <path d="M1157 645 L1157 735 M934 517 L934 607 M1391 510 L1391 600" stroke="#fff" strokeOpacity=".16" strokeDasharray="3 5" fill="none" />
            <Etiqueta x={1162} y={402} texto="TUS PROCESOS" clase="fx-b-aparece fx-b-d28" />
            <g className="fx-b-aparece fx-b-d28">
              <g transform={iso(973, 515)}><text className="fx-b-texto fx-b-menor" fill="#fff" fillOpacity=".32">Cada tarea llega a quien</text><text y="19" className="fx-b-texto fx-b-menor" fill="#fff" fillOpacity=".32">corresponde, sin perseguirla</text></g>
            </g>
          </g>
        </g>
      </g>

      <Etiqueta x={742} y={852} texto="SIN COPIAR Y PEGAR" clase="fx-b-aparece fx-b-d28" />
      <Etiqueta x={1402} y={806} texto="AVISOS" clase="fx-b-aparece fx-b-d30" />
      <Etiqueta x={1055} y={1012} texto="TAREAS REPETIDAS" clase="fx-b-aparece fx-b-d30" />
    </svg>
  );
}
