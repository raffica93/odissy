import type { RankedCinema } from '../types'
import { formatDistance } from '../lib/geo'
import { FormatBadges } from './FormatBadges'
import { LanguageBadges } from './LanguageBadges'

export function CinemaCard({
  cinema,
  rank,
  onOpen,
}: {
  cinema: RankedCinema
  rank: number
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="ticket-surface group flex w-full overflow-hidden text-left shadow-[4px_4px_0_#00000022] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#ff6b2c44]"
    >
      <div className="sprocket w-4 shrink-0 bg-ink" aria-hidden title="Pellicola" />
      <div className="min-w-0 flex-1 p-3 pl-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-semibold tabular-nums text-lamp-dim">
                {String(rank).padStart(2, '0')}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                Verificata {cinema.verifiedAt}
              </span>
              {cinema.distanceKm != null && (
                <span className="font-mono text-[10px] text-dust">
                  {formatDistance(cinema.distanceKm)}
                </span>
              )}
            </div>
            <h3 className="font-display mt-1.5 truncate text-lg font-bold leading-tight text-ink group-hover:text-lamp-dim">
              {cinema.name}
            </h3>
            <p className="mt-0.5 text-xs text-ink/60">
              {cinema.city}<span className="text-ink/30"> · </span>{cinema.region}
            </p>
          </div>
          <div className="max-w-[13rem] shrink-0 text-right">
            <LanguageBadges options={cinema.languageOptions} compact />
            {cinema.languageOptions.length > 1 && (
              <span
                className="mt-1 block font-mono text-[7px] uppercase tracking-wide text-dust"
                title="Spettacoli distinti quando sono disponibili entrambe le versioni"
              >
                Spettacoli distinti
              </span>
            )}
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <FormatBadges formats={cinema.formats} onTicket />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-lamp-dim">
            {cinema.odysseyFormat}
          </span>
        </div>
        <div className="mt-2.5 border-t border-ink/10 pt-2.5">
          <p className="font-mono text-[9px] uppercase tracking-wider text-dust">Sala Odissea</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-ink">{cinema.auditorium}</p>
        </div>
        <div className="mt-2.5 flex items-start justify-between gap-3 border-t border-ink/10 pt-2.5">
          <div className="min-w-0">
            <p className="font-mono text-[9px] uppercase tracking-wider text-dust">Audio</p>
            <p className="mt-1 text-sm font-semibold leading-snug text-ink">{cinema.audio.system}</p>
          </div>
          <div className="shrink-0 border border-lamp/50 bg-lamp/10 px-2 py-1 text-center">
            <span className="block font-display text-lg font-bold leading-none text-lamp-dim">{cinema.audio.score.toFixed(1)}</span>
            <span className="font-mono text-[8px] uppercase text-dust">editoriale</span>
          </div>
        </div>
      </div>
    </button>
  )
}
