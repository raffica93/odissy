import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import type { RankedCinema, UserLocation } from '../types'
import { formatDistance } from '../lib/geo'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Fix default marker assets with Vite
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const goldIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#C4A35A;border:2px solid #0B1426;box-shadow:0 0 0 2px #C4A35A88"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const userIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 0 8px #3b82f6"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
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
    <div className="h-[55vh] min-h-[320px] overflow-hidden rounded-2xl border border-gold/20">
      <MapContainer
        center={[41.9, 12.5]}
        zoom={6}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds cinemas={cinemas} location={location} />
        {location && (
          <Marker position={[location.lat, location.lon]} icon={userIcon}>
            <Popup>Tu sei qui · {location.label}</Popup>
          </Marker>
        )}
        {cinemas.slice(0, 40).map((c) => (
          <Marker key={c.id} position={[c.lat, c.lon]} icon={goldIcon}>
            <Popup>
              <div className="text-sm">
                <strong>{c.name}</strong>
                <div>
                  {c.city}
                  {c.distanceKm != null && ` · ${formatDistance(c.distanceKm)}`}
                </div>
                <button
                  type="button"
                  className="mt-2 underline"
                  onClick={() => onSelect(c.id)}
                >
                  Dettagli
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
