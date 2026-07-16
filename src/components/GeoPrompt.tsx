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
    <section className="px-4">
      <div className="rounded-2xl border border-gold/25 bg-navy-soft/80 p-4 shadow-lg">
        <h2 className="font-display text-lg text-gold-soft">
          Da dove parti?
        </h2>
        <p className="mt-1 text-xs text-mist">
          Usa la posizione o cerca una città. La lista si ordina per miglior
          esperienza raggiungibile.
        </p>

        <button
          type="button"
          onClick={onRequestGeo}
          disabled={geoLoading}
          className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-bold text-navy transition hover:brightness-110 disabled:opacity-60"
        >
          {geoLoading ? 'Rilevamento…' : 'Usa la mia posizione'}
        </button>

        {geoError && (
          <p className="mt-2 text-xs text-rose-300" role="alert">
            {geoError}
          </p>
        )}

        {location && (
          <p className="mt-2 text-xs text-emerald-300">
            Posizione: <strong>{location.label}</strong>
          </p>
        )}

        <div className="relative mt-3">
          <label htmlFor="city-search" className="sr-only">
            Cerca città
          </label>
          <input
            id="city-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O cerca una città…"
            className="min-h-12 w-full rounded-xl border border-mist/20 bg-navy px-4 text-sm text-ink outline-none ring-gold/40 placeholder:text-mist/50 focus:ring-2"
            autoComplete="off"
          />
          {matches.length > 0 && (
            <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-gold/20 bg-navy-soft shadow-xl">
              {matches.map((c) => (
                <li key={`${c.name}-${c.region}`}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-card"
                    onClick={() => {
                      onLocation({
                        lat: c.lat,
                        lon: c.lon,
                        label: `${c.name} (${c.region})`,
                      })
                      setQuery('')
                    }}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs text-mist">{c.region}</span>
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
