/** Illustrazione firma: biglietto strappato + striscia di pellicola (SVG originale) */
export function HeroMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      role="img"
    >
      <title>Biglietto e pellicola</title>
      {/* film strip background */}
      <rect x="8" y="12" width="28" height="136" fill="#1e1a16" stroke="#9a9286" strokeWidth="1.2" />
      {[22, 40, 58, 76, 94, 112, 130].map((y) => (
        <rect key={y} x="14" y={y} width="8" height="8" rx="1" fill="#120f0d" stroke="#efe6d4" strokeWidth="0.6" />
      ))}
      <rect x="24" y="28" width="8" height="104" fill="#2a241e" stroke="#ff6b2c" strokeWidth="0.8" opacity="0.9" />

      {/* torn ticket body */}
      <path
        d="M48 36
           H168
           C172 36 176 40 176 46
           V54
           C170 54 170 62 176 62
           V70
           C170 70 170 78 176 78
           V86
           C170 86 170 94 176 94
           V114
           C176 120 172 124 168 124
           H48
           C44 124 40 120 40 114
           V46
           C40 40 44 36 48 36 Z"
        fill="#efe6d4"
        stroke="#1a1512"
        strokeWidth="1.5"
      />
      {/* torn left edge zig-zag */}
      <path
        d="M48 36 L42 44 L50 52 L42 60 L50 68 L42 76 L50 84 L42 92 L50 100 L42 108 L48 124"
        stroke="#1a1512"
        strokeWidth="1.2"
        fill="none"
      />
      {/* ticket perforation line */}
      <line x1="72" y1="42" x2="72" y2="118" stroke="#1a1512" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" />
      {/* ticket text marks */}
      <text x="82" y="58" fill="#1a1512" fontFamily="Oswald, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2">
        ADMIT ONE
      </text>
      <text x="82" y="78" fill="#ff6b2c" fontFamily="Oswald, sans-serif" fontSize="18" fontWeight="700" letterSpacing="1">
        ODISSEA
      </text>
      <text x="82" y="96" fill="#1a1512" fontFamily="Oswald, sans-serif" fontSize="9" letterSpacing="1.5" opacity="0.85">
        SCEGLI IL FORMATO
      </text>
      <text x="82" y="112" fill="#1d9a8c" fontFamily="IBM Plex Mono, monospace" fontSize="7" letterSpacing="1">
        IMAX · 70mm · ATMOS
      </text>

      {/* stub notch */}
      <circle cx="176" cy="70" r="7" fill="#120f0d" />
      <circle cx="176" cy="70" r="4" fill="none" stroke="#efe6d4" strokeWidth="1" />
    </svg>
  )
}
