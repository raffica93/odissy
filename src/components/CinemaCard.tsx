import type { RankedCinema } from '../types'
import { formatDistance } from '../lib/geo'
import { FormatBadges } from './FormatBadges'
import { ScorePills } from './ScorePills'

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
      {/* film sprocket rail — signature */}
      <div
        className="sprocket w-4 shrink-0 bg-ink"
        aria-hidden
        title="Pellicola"
      />
      <div className="min-w-0 flex-1 p-3.5 pl-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-semibold tabular-nums text-lamp-dim">
                {String(rank).padStart(2, '0')}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                Classe {cinema.tier}
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
              {cinema.city}
              <span className="text-ink/30"> · </span>
              {cinema.region}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="font-display text-2xl font-bold tabular-nums leading-none text-ink">
              {cinema.overallScore.toFixed(1)}
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-dust">
              voto
            </div>
          </div>
        </div>

        <div className="mt-3">
          <FormatBadges formats={cinema.formats} onTicket />
        </div>
        <div className="mt-3 border-t border-ink/10 pt-3">
          <ScorePills video={cinema.videoScore} audio={cinema.audioScore} compact />
        </div>
      </div>
    </button>
  )
}
