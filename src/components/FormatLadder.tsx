import { Link } from 'react-router-dom'

const RUNGS = [
  {
    rank: 1,
    code: 'IMAX 70',
    title: 'IMAX 70mm',
    status: 'Non in Italia',
    tone: 'muted' as const,
    blurb: 'Il master nativo. Europa: poche sale (es. Londra, Praga).',
  },
  {
    rank: 2,
    code: '70mm',
    title: 'Pellicola 70mm',
    status: 'Verificato in Italia',
    tone: 'hot' as const,
    blurb: 'Melzo, Napoli, Roma, Bologna e Conegliano.',
    to: '/70mm-italia',
  },
  {
    rank: 3,
    code: 'IMAX',
    title: 'IMAX',
    status: 'Verificato in Italia',
    tone: 'hot' as const,
    blurb: 'Orio, Sesto, Campi Bisenzio, Roma, Verona, Genova e Afragola.',
    to: '/imax-italia',
  },
  {
    rank: 4,
    code: '35mm',
    title: 'Pellicola 35mm',
    status: 'Date speciali',
    tone: 'mid' as const,
    blurb: 'Carattere analogico, formato “normale”.',
  },
  {
    rank: 5,
    code: 'PLF',
    title: 'iSense · ScreenX · Laser · Luxe',
    status: 'Premium misto',
    tone: 'mid' as const,
    blurb: 'Batte lo standard. Non sostituisce 70mm/IMAX.',
  },
  {
    rank: 6,
    code: 'ATMOS',
    title: 'Audio Atmos (qualsiasi sala)',
    status: 'Bonus',
    tone: 'mid' as const,
    blurb: 'Conta se l’impianto è serio — non solo il bollino.',
  },
  {
    rank: 7,
    code: 'STD',
    title: 'Digitale standard',
    status: 'Fallback',
    tone: 'muted' as const,
    blurb: 'Prendi lo schermo più grande tra le 3 sale vicine.',
  },
]

const toneClass = {
  hot: 'border-lamp/50 bg-lamp/10 text-lamp',
  mid: 'border-tide/40 bg-tide/10 text-tide-soft',
  muted: 'border-chalk/15 bg-booth text-dust',
}

/** Infografica a scaletta: dal formato ideale al fallback */
export function FormatLadder() {
  return (
    <section className="mt-8" aria-labelledby="ladder-title">
      <div className="flex items-end justify-between gap-3">
        <h2 id="ladder-title" className="font-display text-2xl font-bold text-chalk">
          Scaletta formati
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-wider text-dust">
          formati verificati
        </p>
      </div>

      {/* visual ladder bar */}
      <div className="mt-4 flex h-3 w-full overflow-hidden border border-chalk/15">
        <div className="w-[8%] bg-dust/40" title="IMAX 70" />
        <div className="w-[18%] bg-lamp" title="70mm" />
        <div className="w-[18%] bg-lamp/70" title="IMAX dig" />
        <div className="w-[12%] bg-tide" title="35mm" />
        <div className="w-[16%] bg-tide/60" title="PLF" />
        <div className="w-[14%] bg-tide/40" title="Atmos" />
        <div className="flex-1 bg-booth" title="STD" />
      </div>
      <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-wider text-dust">
        <span>ideale</span>
        <span>ok</span>
        <span>fallback</span>
      </div>

      <ol className="mt-6 space-y-0">
        {RUNGS.map((r, i) => (
          <li key={r.code} className="relative flex gap-3 pb-5">
            {/* connector */}
            {i < RUNGS.length - 1 && (
              <span
                className="absolute left-[15px] top-8 bottom-0 w-px bg-chalk/15"
                aria-hidden
              />
            )}
            <div
              className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-xs font-bold ${toneClass[r.tone]}`}
            >
              {r.rank}
            </div>
            <div className="min-w-0 flex-1 border-b border-chalk/10 pb-5">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-lamp">
                  {r.code}
                </span>
                <span className="font-mono text-[10px] text-dust">{r.status}</span>
              </div>
              <h3 className="font-display mt-1 text-lg font-bold text-chalk">
                {r.to ? (
                  <Link to={r.to} className="hover:text-lamp">
                    {r.title}
                  </Link>
                ) : (
                  r.title
                )}
              </h3>
              <p className="mt-1 text-sm text-dust">{r.blurb}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="border border-lamp/30 bg-lamp/10 p-3 text-sm leading-relaxed text-chalk">
        <span className="font-display text-[12px] tracking-[0.12em] text-lamp">
          Regola da forum Nolan ·{' '}
        </span>
        scegli il formato e la sala indicati sul biglietto. Le fonti ufficiali
        prevalgono sempre sui dati del sito.
      </p>

    </section>
  )
}
