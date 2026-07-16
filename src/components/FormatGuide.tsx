import { Link } from 'react-router-dom'
import { FormatLadder } from './FormatLadder'

export function FormatGuide({ onBack }: { onBack?: () => void }) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-6">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="min-h-11 font-mono text-xs uppercase tracking-wider text-lamp"
        >
          ← Sale
        </button>
      ) : (
        <Link
          to="/"
          className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wider text-lamp"
        >
          ← Sale
        </Link>
      )}

      <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-chalk">
        Scegli il formato, non il logo
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-dust">
        Nolan ha girato Odissea in IMAX su pellicola. In Italia non c&apos;è IMAX
        70mm. Usa la scaletta: scendi solo se non hai l&apos;opzione sopra.
      </p>

      <FormatLadder />

      <div className="ticket-surface mt-8 p-4 shadow-[4px_4px_0_#ff6b2c33]">
        <h2 className="font-display text-xl font-bold text-ink">
          Dilemma classico
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Lombardia: <strong>Melzo 70mm+Atmos</strong> vs{' '}
          <strong>Orio IMAX</strong>. Entrambe Classe S. Pellicola/audio vs
          campo IMAX — scegli il trade-off, non il marketing.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/70mm-italia"
            className="min-h-9 bg-ink px-3 py-2 font-mono text-[10px] font-semibold uppercase text-ticket"
          >
            70mm Italia
          </Link>
          <Link
            to="/imax-italia"
            className="min-h-9 border border-ink/30 px-3 py-2 font-mono text-[10px] font-semibold uppercase text-ink"
          >
            IMAX Italia
          </Link>
          <Link
            to="/come-scegliere-sala-nolan"
            className="min-h-9 border border-ink/20 px-3 py-2 font-mono text-[10px] uppercase text-ink/70"
          >
            Guida lunga
          </Link>
        </div>
      </div>

      <p className="mt-6 font-mono text-[10px] leading-relaxed text-dust/80">
        Non ufficiale · non affiliato · verifica sempre il cartellone dello
        spettacolo.
      </p>
    </article>
  )
}
