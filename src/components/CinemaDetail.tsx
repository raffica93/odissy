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
    const text = `Io lo vedo a ${cinema.name} (${cinema.city}) — e tu? dovevedereodissea.it`
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Dove vedere Odissea', text, url })
        return
      }
    } catch {
      /* cancelled */
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`)
      alert('Link copiato')
    } catch {
      alert(url)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-void/80 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cinema-detail-title"
      onClick={onClose}
    >
      <div
        className="ticket-surface flex max-h-[92vh] w-full max-w-lg overflow-hidden shadow-[8px_8px_0_#ff6b2c44] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sprocket hidden w-5 shrink-0 bg-ink sm:block" aria-hidden />
        <div className="min-w-0 flex-1 overflow-y-auto p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                Classe {cinema.tier}
                {cinema.distanceKm != null &&
                  ` · ${formatDistance(cinema.distanceKm)}`}
              </p>
              <h2
                id="cinema-detail-title"
                className="font-display mt-1 text-2xl font-bold leading-tight text-ink"
              >
                {cinema.name}
              </h2>
              <p className="mt-1 text-sm text-ink/65">
                {cinema.address || `${cinema.city}, ${cinema.region}`}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 min-w-11 border border-ink/20 text-lg text-ink"
              aria-label="Chiudi"
            >
              ×
            </button>
          </div>

          <FormatBadges formats={cinema.formats} onTicket />
          <div className="mt-4 border border-ink/10 bg-chalk/60 p-3">
            <ScorePills video={cinema.videoScore} audio={cinema.audioScore} />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink/85">{cinema.notes}</p>

          {cinema.specialties.length > 0 && (
            <div className="mt-4">
              <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-dust">
                Particolarità
              </h3>
              <ul className="mt-2 space-y-2">
                {cinema.specialties.map((s) => (
                  <li
                    key={s}
                    className="border-l-2 border-lamp pl-3 text-sm text-ink/80"
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
                className="flex min-h-12 items-center justify-center bg-ink text-sm font-semibold text-ticket hover:bg-lamp hover:text-void"
              >
                Orari e prenotazione
              </a>
            )}
            <a
              href={mapsDirectionsUrl(cinema.lat, cinema.lon)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center border border-ink/30 text-sm font-semibold text-ink"
            >
              Come arrivare
            </a>
            <button
              type="button"
              onClick={share}
              className="flex min-h-12 items-center justify-center border border-dashed border-ink/25 text-sm font-medium text-ink/70"
            >
              Condividi questa sala
            </button>
          </div>

          <div className="mt-4">
            <AdSlot slot="detail" />
          </div>

          <p className="mt-4 font-mono text-[10px] leading-relaxed text-dust">
            Voti editoriali. Controlla formato e orari sul sito del cinema. Non
            affiliato a Universal, IMAX o circuiti.
          </p>
        </div>
      </div>
    </div>
  )
}
