import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import type { RankedCinema, UserLocation } from '../types'
import { formatDistance } from '../lib/geo'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const lampIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:12px;height:12px;background:#ff6b2c;border:2px solid #efe6d4;box-shadow:0 0 0 1px #120f0d"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

const userIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#1d9a8c;border:2px solid #faf6ef;box-shadow:0 0 0 1px #120f0d"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

function FitBounds({
  cinemas,
  location,
}: {
  cinemas: RankedCinema[]
  location: UserLocation | null
}) {
  const map = useMap()
  useEffect(() => {
    const pts: [number, number][] = cinemas.slice(0, 30).map((c) => [c.lat, c.lon])
    if (location) pts.push([location.lat, location.lon])
    if (pts.length === 0) {
      map.setView([41.9, 12.5], 6)
      return
    }
    if (pts.length === 1) {
      map.setView(pts[0], 11)
      return
    }
    map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 11 })
  }, [cinemas, location, map])
  return null
}

export function CinemaMap({
  cinemas,
  location,
  onSelect,
}: {
  cinemas: RankedCinema[]
  location: UserLocation | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="h-[55vh] min-h-[320px] overflow-hidden border border-chalk/15 shadow-[4px_4px_0_#ff6b2c33]">
      <MapContainer
        center={[41.9, 12.5]}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds cinemas={cinemas} location={location} />
        {location && (
          <Marker position={[location.lat, location.lon]} icon={userIcon}>
            <Popup>Tu · {location.label}</Popup>
          </Marker>
        )}
        {cinemas.slice(0, 40).map((c) => (
          <Marker key={c.id} position={[c.lat, c.lon]} icon={lampIcon}>
            <Popup>
              <div className="text-sm">
                <strong className="font-display">{c.name}</strong>
                <div className="font-mono text-xs">
                  {c.city}
                  {c.distanceKm != null && ` · ${formatDistance(c.distanceKm)}`}
                </div>
                <button
                  type="button"
                  className="mt-2 font-mono text-xs underline"
                  onClick={() => onSelect(c.id)}
                >
                  Apri scheda
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
