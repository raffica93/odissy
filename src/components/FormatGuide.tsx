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

      <h1 className="font-display mt-4 text-3xl tracking-[0.04em] text-chalk">
        Formato prima del posto a sedere
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-dust">
        Chi segue Nolan da anni lo sa: lo “schermo grande” non è tutto uguale.
        Odissea è nata in IMAX film. In Italia non c&apos;è la proiezione IMAX
        70mm. Scendi la scaletta solo se l&apos;opzione sopra non è raggiungibile.
      </p>

      <FormatLadder />

      <div className="ticket-surface mt-8 p-4 shadow-[4px_4px_0_#ff6b2c33]">
        <h2 className="font-display text-xl tracking-[0.06em] text-ink">
          Il dilemma da bar dei cinefili
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Nord Italia, un&apos;ora di macchina:{' '}
          <strong>Melzo 70mm + Atmos leggendario</strong> contro{' '}
          <strong>Orio IMAX digitale</strong>. Uno privilegia grana e impianto,
          l&apos;altro il campo IMAX. Nessuna delle due è “sbagliata” — sbagliato
          è comprare il multiplex sotto casa per abitudine.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to="/70mm-italia"
            className="min-h-9 bg-ink px-3 py-2 font-display text-[11px] tracking-[0.12em] text-ticket"
          >
            70mm Italia
          </Link>
          <Link
            to="/imax-italia"
            className="min-h-9 border border-ink/30 px-3 py-2 font-display text-[11px] tracking-[0.12em] text-ink"
          >
            IMAX Italia
          </Link>
          <Link
            to="/come-scegliere-sala-nolan"
            className="min-h-9 border border-ink/20 px-3 py-2 font-mono text-[10px] uppercase text-ink/70"
          >
            Manifesto lungo
          </Link>
        </div>
      </div>

      <p className="mt-6 font-mono text-[10px] leading-relaxed text-dust/80">
        Non ufficiale · non affiliato · apri il cartellone e leggi il formato
        dello spettacolo, non solo il nome della sala.
      </p>
    </article>
  )
}
