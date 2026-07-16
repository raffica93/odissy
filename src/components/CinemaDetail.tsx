import type { RankedCinema } from '../types'
import { formatDistance, mapsDirectionsUrl } from '../lib/geo'
import { FormatBadges } from './FormatBadges'
import { ScorePills } from './ScorePills'
import { AdSlot } from './AdSlot'

export function CinemaDetail({
  cinema,
  onClose,
}: {
  cinema: RankedCinema
  onClose: () => void
}) {
  async function share() {
    const text = `Io lo vedo a ${cinema.name} (${cinema.city}) — e tu? Scopri la sala migliore per Odissea su Odissy.`
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Odissy', text, url })
        return
      }
    } catch {
      /* user cancelled */
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      alert('Link copiato negli appunti')
    } catch {
      alert(url)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cinema-detail-title"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-gold/25 bg-navy-soft p-5 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              Tier {cinema.tier}
              {cinema.distanceKm != null &&
                ` · ${formatDistance(cinema.distanceKm)}`}
            </p>
            <h2
              id="cinema-detail-title"
              className="font-display mt-1 text-2xl text-gold-soft"
            >
              {cinema.name}
            </h2>
            <p className="text-sm text-mist">
              {cinema.address || `${cinema.city}, ${cinema.region}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 rounded-full border border-mist/30 text-lg text-mist"
            aria-label="Chiudi"
          >
            ×
          </button>
        </div>

        <FormatBadges formats={cinema.formats} />
        <div className="mt-3">
          <ScorePills video={cinema.videoScore} audio={cinema.audioScore} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink/90">{cinema.notes}</p>

        {cinema.specialties.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gold">
              Particolarità
            </h3>
            <ul className="mt-2 space-y-1.5">
              {cinema.specialties.map((s) => (
                <li
                  key={s}
                  className="flex gap-2 text-sm text-gold-soft before:text-gold before:content-['▸']"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-5 grid gap-2">
          {(cinema.bookingUrl || cinema.website) && (
            <a
              href={cinema.bookingUrl || cinema.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center rounded-xl bg-gold text-sm font-bold text-navy"
            >
              Orari e prenotazione
            </a>
          )}
          <a
            href={mapsDirectionsUrl(cinema.lat, cinema.lon)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center rounded-xl border border-gold/40 text-sm font-semibold text-gold-soft"
          >
            Come arrivare
          </a>
          <button
            type="button"
            onClick={share}
            className="flex min-h-12 items-center justify-center rounded-xl border border-mist/30 text-sm font-medium text-ink"
          >
            Condividi questa sala
          </button>
        </div>

        <div className="mt-4">
          <AdSlot slot="detail" />
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-mist/80">
          Voti editoriali soggettivi. Verifica sempre formato e orari sul sito del
          cinema. Odissy non è affiliato a Universal, IMAX o ai circuiti.
        </p>
      </div>
    </div>
  )
}
