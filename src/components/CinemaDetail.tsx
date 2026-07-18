import type { RankedCinema } from '../types'
import { formatDistance, mapsDirectionsUrl } from '../lib/geo'
import { FormatBadges } from './FormatBadges'
import { LanguageBadges } from './LanguageBadges'
import { AdSlot } from './AdSlot'
import { FILM } from '../data/film'

function ExtLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={primary
        ? 'flex min-h-12 items-center justify-center bg-ink text-sm font-semibold text-ticket hover:bg-lamp hover:text-void'
        : 'flex min-h-11 items-center justify-center border border-ink/25 text-sm font-medium text-ink hover:border-ink/50'}
    >
      {children}
    </a>
  )
}

export function CinemaDetail({ cinema, onClose }: { cinema: RankedCinema; onClose: () => void }) {
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

  const booking = cinema.bookingUrl || cinema.website
  const maps = cinema.mapsUrl || mapsDirectionsUrl(cinema.lat, cinema.lon)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-void/80 p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="cinema-detail-title" onClick={onClose}>
      <div className="ticket-surface flex max-h-[92vh] w-full max-w-lg overflow-hidden shadow-[8px_8px_0_#ff6b2c44] sm:max-h-[85vh]" onClick={(event) => event.stopPropagation()}>
        <div className="sprocket hidden w-5 shrink-0 bg-ink sm:block" aria-hidden />
        <div className="min-w-0 flex-1 overflow-y-auto p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                Verificata {cinema.verifiedAt}{cinema.distanceKm != null && ` · ${formatDistance(cinema.distanceKm)}`}
              </p>
              <h2 id="cinema-detail-title" className="font-display mt-1 text-2xl font-bold leading-tight text-ink">{cinema.name}</h2>
              <p className="mt-1 text-sm text-ink/65">{cinema.address || `${cinema.city}, ${cinema.region}`}</p>
            </div>
            <button type="button" onClick={onClose} className="min-h-11 min-w-11 shrink-0 border border-ink/20 text-lg text-ink" aria-label="Chiudi">×</button>
          </div>

          <a href={FILM.imdbUrl} target="_blank" rel="noopener noreferrer" className="mb-4 flex gap-3 border border-ink/10 bg-chalk/70 p-2 hover:border-lamp/40">
            <img src={FILM.posterSrc} alt="" width={48} height={72} className="h-[72px] w-12 border border-ink/10 object-cover" loading="lazy" />
            <div className="min-w-0 self-center">
              <p className="font-mono text-[9px] uppercase tracking-wider text-dust">Film</p>
              <p className="font-display text-base font-bold text-ink">{FILM.titleIt}</p>
              <p className="font-mono text-[10px] text-lamp-dim">IMDb → scheda completa</p>
            </div>
          </a>

          <div className="border border-lamp/40 bg-lamp/10 p-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-lamp-dim">Sala in cui proiettano Odissea</p>
            <p className="font-display mt-1 text-xl font-bold text-ink">{cinema.auditorium}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <FormatBadges formats={cinema.formats} onTicket />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink/70">{cinema.odysseyFormat}</span>
            </div>
          </div>

          <section className="mt-4 border-y border-ink/15 py-4" aria-labelledby="language-title">
            <div className="flex items-center justify-between gap-3">
              <h3 id="language-title" className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-dust">Lingua degli spettacoli</h3>
              {cinema.languageOptions.length > 1 && (
                <span className="font-mono text-[9px] uppercase text-lamp-dim">Opzioni separate</span>
              )}
            </div>
            <div className="mt-2"><LanguageBadges options={cinema.languageOptions} /></div>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{cinema.languageNote}</p>
          </section>

          <section className="mt-4 border-b border-ink/15 pb-4" aria-labelledby="audio-title">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 id="audio-title" className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-dust">Audio della sala</h3>
                <p className="font-display mt-1 text-xl font-bold text-ink">{cinema.audio.system}</p>
              </div>
              <div className="shrink-0 border border-lamp/50 bg-lamp/10 px-3 py-2 text-center">
                <span className="block font-display text-2xl font-bold leading-none text-lamp-dim">{cinema.audio.score.toFixed(1)}</span>
                <span className="font-mono text-[8px] uppercase text-dust">indice editoriale</span>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{cinema.audio.details}</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-dust">
              {cinema.audio.evidence === 'sala' ? 'Specifiche ufficiali della sala' : 'Sistema del formato · configurazione sala non pubblicata'}
            </p>
          </section>

          <p className="mt-4 text-sm leading-relaxed text-ink/85">{cinema.notes}</p>

          {cinema.specialties.length > 0 && (
            <div className="mt-4">
              <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-dust">Particolarità</h3>
              <ul className="mt-2 space-y-2">
                {cinema.specialties.map((specialty) => <li key={specialty} className="border-l-2 border-lamp pl-3 text-sm text-ink/80">{specialty}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-dust">Fonti ufficiali</h3>
            <ul className="mt-2 space-y-2">
              {cinema.sources.map((source) => (
                <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="block border border-ink/15 px-3 py-2 text-sm font-medium text-ink underline decoration-lamp/50 underline-offset-2 hover:border-lamp/50">{source.label} ↗</a></li>
              ))}
            </ul>
          </div>

          <div className="mt-5 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dust">Link utili</p>
            {booking && <ExtLink href={booking} primary>Orari e prenotazione</ExtLink>}
            <div className="grid grid-cols-2 gap-2">
              {cinema.website && <ExtLink href={cinema.website}>Sito cinema</ExtLink>}
              <ExtLink href={maps}>Mappa</ExtLink>
              <ExtLink href={FILM.imdbUrl}>IMDb film</ExtLink>
            </div>
            <button type="button" onClick={share} className="flex min-h-11 w-full items-center justify-center border border-dashed border-ink/25 text-sm font-medium text-ink/70">Condividi questa sala</button>
          </div>

          <div className="mt-4"><AdSlot slot="detail" /></div>
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-dust">Dati verificati su fonti ufficiali il {cinema.verifiedAt}. Orari, disponibilità e sala possono cambiare: controlla sempre la dicitura dello spettacolo prima dell&apos;acquisto. Sito indipendente e non affiliato.</p>
        </div>
      </div>
    </div>
  )
}
