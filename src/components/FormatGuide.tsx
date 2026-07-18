import { Link } from 'react-router-dom'
import { FormatLadder } from './FormatLadder'
import { FILM } from '../data/film'

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

      <div className="relative mt-4 overflow-hidden border border-chalk/15">
        <img
          src={FILM.keyArtSrc}
          alt=""
          className="h-40 w-full object-cover object-center sm:h-48"
          loading="lazy"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #120f0df5 0%, #120f0d66 50%, transparent 100%)',
          }}
          aria-hidden
        />
        <h1 className="font-display absolute inset-x-0 bottom-0 p-4 text-3xl tracking-[0.04em] text-chalk">
          Formato prima del posto a sedere
        </h1>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-dust">
        Chi segue Nolan da anni lo sa: lo “schermo grande” non è tutto uguale.
        Odissea è nata in IMAX film. In Italia non c&apos;è la proiezione IMAX
        70mm: qui trovi soltanto le presentazioni che le sale indicano
        esplicitamente come IMAX o 70mm.
      </p>

      <FormatLadder />

      <div className="ticket-surface mt-8 p-4 shadow-[4px_4px_0_#ff6b2c33]">
        <h2 className="font-display text-xl tracking-[0.06em] text-ink">
          Il dilemma da bar dei cinefili
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Confronta una proiezione 70mm e una IMAX leggendo formato, sala e
          lingua del singolo spettacolo. Sono due presentazioni diverse e le
          fonti non pubblicano sempre dati tecnici comparabili.
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
