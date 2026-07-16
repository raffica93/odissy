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
      className="w-full rounded-2xl border border-gold/20 bg-card/60 p-4 text-left transition hover:border-gold/45 hover:bg-card-hover/70"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
              {rank}
            </span>
            <span className="rounded-md border border-gold/30 px-1.5 py-0.5 text-[10px] font-bold text-gold">
              Tier {cinema.tier}
            </span>
            {cinema.distanceKm != null && (
              <span className="text-xs text-mist">
                {formatDistance(cinema.distanceKm)}
              </span>
            )}
          </div>
          <h3 className="mt-2 truncate font-semibold text-gold-soft">
            {cinema.name}
          </h3>
          <p className="text-xs text-mist">
            {cinema.city} · {cinema.region}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-lg font-bold text-gold">
            {cinema.overallScore.toFixed(1)}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-mist">
            score
          </div>
        </div>
      </div>

      <div className="mt-3">
        <FormatBadges formats={cinema.formats} />
      </div>
      <div className="mt-3">
        <ScorePills video={cinema.videoScore} audio={cinema.audioScore} compact />
      </div>
    </button>
  )
}
