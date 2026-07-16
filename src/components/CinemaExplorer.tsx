import { useCallback, useMemo, useState } from 'react'
import cinemasData from '../data/cinemas.json'
import type { Cinema, Format, RankedCinema, SortMode, UserLocation } from '../types'
import { rankCinemas } from '../lib/score'
import { GeoPrompt } from './GeoPrompt'
import { Filters } from './Filters'
import { CinemaCard } from './CinemaCard'
import { CinemaMap } from './CinemaMap'
import { CinemaDetail } from './CinemaDetail'
import { AdSlot } from './AdSlot'

const allCinemas = cinemasData as Cinema[]

type Tab = 'list' | 'map'

export function CinemaExplorer({
  initialLocation = null,
  initialFormats = [],
  initialRadiusKm = 0,
  cityMatch,
  regionMatch,
  lockFormats = false,
}: {
  initialLocation?: UserLocation | null
  initialFormats?: Format[]
  initialRadiusKm?: number
  cityMatch?: string[]
  regionMatch?: string[]
  /** If true, format chips only toggle within initial set */
  lockFormats?: boolean
}) {
  const [tab, setTab] = useState<Tab>('list')
  const [location, setLocation] = useState<UserLocation | null>(initialLocation)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)
  const [activeFormats, setActiveFormats] = useState<Format[]>(initialFormats)
  const [radiusKm, setRadiusKm] = useState(initialRadiusKm)
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
    if (lockFormats && initialFormats.length && !initialFormats.includes(f)) return
    setActiveFormats((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    )
  }

  const pool = useMemo(() => {
    let list = allCinemas
    if (cityMatch?.length || regionMatch?.length) {
      list = list.filter((c) => {
        const cityOk = cityMatch?.some(
          (m) => c.city.toLowerCase() === m.toLowerCase(),
        )
        const regionOk = regionMatch?.some(
          (m) => c.region.toLowerCase() === m.toLowerCase(),
        )
        // If only radius+location, don't over-filter; when city/region set, prefer match OR nearby via radius later
        if (cityMatch?.length && regionMatch?.length) return cityOk || regionOk
        if (cityMatch?.length) return cityOk || regionOk
        return regionOk
      })
      // If geo filter emptied list, fall back to full set with location ranking
      if (list.length === 0) list = allCinemas
    }
    return list
  }, [cityMatch, regionMatch])

  const ranked: RankedCinema[] = useMemo(() => {
    let list = rankCinemas(
      pool,
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
  }, [pool, location, sortMode, activeFormats, radiusKm])

  const selected = ranked.find((c) => c.id === selectedId) ?? null

  return (
    <>
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

      <div className="mt-5 mx-4 flex border border-chalk/15">
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
        {location ? ` · da ${location.label}` : ''}
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

      {selected && (
        <CinemaDetail cinema={selected} onClose={() => setSelectedId(null)} />
      )}
    </>
  )
}
