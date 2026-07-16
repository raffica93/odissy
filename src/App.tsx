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
      </div>
    )
  }

  if (page === 'privacy') {
    return (
      <div className="min-h-screen pb-safe">
        <Privacy onBack={() => setPage('home')} />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-8">

      <header className="sticky top-0 z-40 border-b border-chalk/10 bg-void/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold tracking-tight text-chalk">
              dove vedere
            </span>
            <span className="font-display text-lg font-bold text-lamp">
              odissea
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPage('guide')}
            className="min-h-11 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-tide-soft"
          >
            Guida formati
          </button>
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

        <div className="mt-5 flex border border-chalk/15 mx-4">
          {(['list', 'map'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`min-h-11 flex-1 font-mono text-xs font-semibold uppercase tracking-wider ${
                tab === t
                  ? 'bg-lamp text-void'
                  : 'bg-booth text-dust hover:text-chalk'
              }`}
            >
              {t === 'list' ? 'Sale' : 'Mappa'}
            </button>
          ))}
        </div>

        <p className="mt-3 px-4 font-mono text-[11px] text-dust">
          {ranked.length} sale
          {location
            ? ` · da ${location.label}`
            : ' · imposta una partenza per i km'}
        </p>

        <div className="mt-3 px-4">
          <AdSlot slot="in-feed" />
        </div>

        {tab === 'list' ? (
          <div className="mt-3 space-y-3 px-4">
            {ranked.length === 0 && (
              <p className="border border-lamp/40 bg-lamp/10 p-4 text-sm text-chalk">
                Nessuna sala con questi filtri. Allarga il raggio o togli un
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

        <footer className="mt-12 space-y-3 border-t border-chalk/10 px-4 pb-8 pt-8 text-center font-mono text-[10px] leading-relaxed text-dust">
          <p>
            Progetto indipendente e gratuito. Non affiliato a Universal, IMAX,
            Nolan o circuiti. Voti soggettivi — verifica sempre orari e formati.
          </p>
          <p>
            <a
              className="text-lamp underline decoration-lamp/40 underline-offset-2"
              href="mailto:feedback@dovevedereodissea.it?subject=Segnalazione%20sala"
            >
              Segnala una sala
            </a>
            {' · '}
            <button
              type="button"
              onClick={() => setPage('privacy')}
              className="text-lamp underline decoration-lamp/40 underline-offset-2"
            >
              Privacy
            </button>
          </p>
        </footer>
      </main>

      {selected && (
        <CinemaDetail cinema={selected} onClose={() => setSelectedId(null)} />
      )}

      {/* Sticky unit only if VITE_ADSENSE_SLOT_STICKY is set; Auto ads otherwise */}
      <AdSlot slot="sticky" className="fixed inset-x-0 bottom-0 z-30" />
    </div>
  )
}

