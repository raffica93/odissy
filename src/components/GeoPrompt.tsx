import { useMemo, useState } from 'react'
import type { City, UserLocation } from '../types'
import citiesData from '../data/cities.json'

const cities = citiesData as City[]

export function GeoPrompt({
  location,
  onLocation,
  geoError,
  onRequestGeo,
  geoLoading,
}: {
  location: UserLocation | null
  onLocation: (loc: UserLocation) => void
  geoError: string | null
  onRequestGeo: () => void
  geoLoading: boolean
}) {
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 1) return []
    return cities
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 8)
  }, [query])

  return (
    <section className="px-4 pt-4">
      <div className="ticket-surface relative overflow-hidden p-4 shadow-[6px_6px_0_#ff6b2c33]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-2 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0 8px, #120f0d 8px 10px)',
          }}
          aria-hidden
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dust">
          Punto di partenza
        </p>
        <h2 className="font-display mt-1 text-xl tracking-[0.06em] text-ink">
          Da dove parti per la sala?
        </h2>
        <p className="mt-1 text-sm text-ink/70">
          Ordiniamo per resa (formato + video/audio), non per “il più vicino al
          parcheggio”.
        </p>

        <button
          type="button"
          onClick={onRequestGeo}
          disabled={geoLoading}
          className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-4 py-3 font-display text-[13px] tracking-[0.12em] text-ticket transition hover:bg-lamp hover:text-void disabled:opacity-60"
        >
          {geoLoading ? 'Rilevamento…' : 'Usa la mia posizione'}
        </button>

        {geoError && (
          <p className="mt-2 text-xs text-lamp-dim" role="alert">
            {geoError}
          </p>
        )}

        {location && (
          <p className="mt-2 font-mono text-xs text-tide">→ {location.label}</p>
        )}

        <div className="relative mt-3">
          <label htmlFor="city-search" className="sr-only">
            Cerca città
          </label>
          <input
            id="city-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O digita una città…"
            className="min-h-12 w-full border border-ink/20 bg-chalk px-4 font-mono text-sm text-ink outline-none placeholder:text-dust focus:border-lamp"
            autoComplete="off"
          />
          {matches.length > 0 && (
            <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto border border-ink/20 bg-chalk shadow-xl">
              {matches.map((c) => (
                <li key={`${c.name}-${c.region}`}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between px-4 py-2 text-left text-sm text-ink hover:bg-ticket-edge"
                    onClick={() => {
                      onLocation({
                        lat: c.lat,
                        lon: c.lon,
                        label: `${c.name} (${c.region})`,
                      })
                      setQuery('')
                    }}
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="font-mono text-[10px] uppercase text-dust">
                      {c.region}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
