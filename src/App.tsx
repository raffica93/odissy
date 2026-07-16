import { useCallback, useMemo, useState } from 'react'
import cinemasData from './data/cinemas.json'
import type { Cinema, Format, RankedCinema, SortMode, UserLocation } from './types'
import { rankCinemas } from './lib/score'
import { Hero } from './components/Hero'
import { GeoPrompt } from './components/GeoPrompt'
import { Filters } from './components/Filters'
import { CinemaCard } from './components/CinemaCard'
import { CinemaMap } from './components/CinemaMap'
import { CinemaDetail } from './components/CinemaDetail'
import { FormatGuide } from './components/FormatGuide'
import { Privacy } from './components/Privacy'
import { AdSlot } from './components/AdSlot'
import { CookieBanner } from './components/CookieBanner'

const cinemas = cinemasData as Cinema[]

type Page = 'home' | 'guide' | 'privacy'
type Tab = 'list' | 'map'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [tab, setTab] = useState<Tab>('list')
  const [location, setLocation] = useState<UserLocation | null>(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)
  const [activeFormats, setActiveFormats] = useState<Format[]>([])
  const [radiusKm, setRadiusKm] = useState(0)
  const [sortMode, setSortMode] = useState<SortMode>('experience')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const requestGeo = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocalizzazione non supportata. Cerca una città.')
      return
    }
    setGeoLoading(true)
    setGeoError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: 'La tua posizione',
        })
        setGeoLoading(false)
      },
      (err) => {
        setGeoLoading(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError('Posizione negata. Cerca una città qui sotto.')
        } else {
          setGeoError('Impossibile ottenere la posizione. Cerca una città.')
        }
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 60_000 },
    )
  }, [])

  const toggleFormat = (f: Format) => {
    setActiveFormats((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    )
  }

  const ranked: RankedCinema[] = useMemo(() => {
    let list = rankCinemas(
      cinemas,
      location?.lat ?? null,
      location?.lon ?? null,
      sortMode,
    )
    if (activeFormats.length > 0) {
      list = list.filter((c) =>
        activeFormats.some((f) => c.formats.includes(f)),
      )
    }
    if (radiusKm > 0 && location) {
      list = list.filter(
        (c) => c.distanceKm != null && c.distanceKm <= radiusKm,
      )
    }
    return list
  }, [location, sortMode, activeFormats, radiusKm])

  const selected = ranked.find((c) => c.id === selectedId) ?? null

  if (page === 'guide') {
    return (
      <div className="min-h-screen pb-safe">
        <FormatGuide onBack={() => setPage('home')} />
        <CookieBanner />
      </div>
    )
  }

  if (page === 'privacy') {
    return (
      <div className="min-h-screen pb-safe">
        <Privacy onBack={() => setPage('home')} />
        <CookieBanner />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28">
      <header className="sticky top-0 z-40 border-b border-gold/15 bg-navy/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="font-display text-xl tracking-wide text-gold">
            ODISSY
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => setPage('guide')}
              className="min-h-11 font-medium text-gold-soft"
            >
              Guida formati
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl">
        <Hero />
        <GeoPrompt
          location={location}
          onLocation={setLocation}
          geoError={geoError}
          onRequestGeo={requestGeo}
          geoLoading={geoLoading}
        />
        <Filters
          activeFormats={activeFormats}
          onToggleFormat={toggleFormat}
          radiusKm={radiusKm}
          onRadius={setRadiusKm}
          sortMode={sortMode}
          onSort={setSortMode}
        />

        <div className="mt-4 flex gap-2 px-4">
          {(['list', 'map'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`min-h-11 flex-1 rounded-xl text-sm font-semibold ${
                tab === t
                  ? 'bg-gold text-navy'
                  : 'border border-mist/25 text-mist'
              }`}
            >
              {t === 'list' ? 'Lista' : 'Mappa'}
            </button>
          ))}
        </div>

        <p className="mt-3 px-4 text-xs text-mist">
          {ranked.length} sale
          {location ? ` da ${location.label}` : ' · imposta una posizione per le distanze'}
        </p>

        <div className="mt-3 px-4">
          <AdSlot slot="in-feed" />
        </div>

        {tab === 'list' ? (
          <div className="mt-3 space-y-3 px-4">
            {ranked.length === 0 && (
              <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100">
                Nessuna sala con questi filtri. Allarga il raggio o togli filtri
                formato.
              </p>
            )}
            {ranked.map((c, i) => (
              <div key={c.id}>
                <CinemaCard
                  cinema={c}
                  rank={i + 1}
                  onOpen={() => setSelectedId(c.id)}
                />
                {i === 2 && (
                  <div className="my-3">
                    <AdSlot slot="in-feed" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 px-4">
            <CinemaMap
              cinemas={ranked}
              location={location}
              onSelect={setSelectedId}
            />
          </div>
        )}

        <footer className="mt-10 space-y-3 px-4 pb-8 text-center text-xs text-mist/80">
          <p>
            Odissy è un progetto indipendente e gratuito. Non affiliato a
            Universal, IMAX, Nolan o ai circuiti cinematografici. Voti
            soggettivi — verifica sempre orari e formati sul sito del cinema.
          </p>
          <p>
            Hai trovato un errore?{' '}
            <a
              className="text-gold underline"
              href="mailto:feedback@odissy.local?subject=Segnalazione%20sala%20Odissy"
            >
              Segnala una sala
            </a>
          </p>
          <button
            type="button"
            onClick={() => setPage('privacy')}
            className="text-gold underline"
          >
            Privacy e cookie
          </button>
        </footer>
      </main>

      {selected && (
        <CinemaDetail cinema={selected} onClose={() => setSelectedId(null)} />
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/15 bg-navy/95 px-3 py-2 pb-safe backdrop-blur">
        <AdSlot slot="sticky" className="min-h-[70px] !py-1" />
      </div>

      <CookieBanner />
    </div>
  )
}
