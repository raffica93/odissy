import type { Cinema, Format, RankedCinema, SortMode } from '../types'
import { haversineKm } from './geo'

function formatGroup(cinema: Cinema): number {
  if (cinema.formats.includes('film_70mm')) return 0
  if (cinema.formats.includes('imax')) return 1
  return 2
}

export function rankCinemas(
  cinemas: Cinema[],
  userLat: number | null,
  userLon: number | null,
  sortMode: SortMode,
): RankedCinema[] {
  const ranked = cinemas.map((cinema) => ({
    ...cinema,
    distanceKm:
      userLat != null && userLon != null
        ? haversineKm(userLat, userLon, cinema.lat, cinema.lon)
        : null,
  }))

  ranked.sort((a, b) => {
    if (sortMode === 'distance') {
      if (a.distanceKm == null && b.distanceKm == null) return 0
      if (a.distanceKm == null) return 1
      if (b.distanceKm == null) return -1
      return a.distanceKm - b.distanceKm
    }
    if (sortMode === 'name') return a.name.localeCompare(b.name, 'it')
    return formatGroup(a) - formatGroup(b)
  })

  return ranked
}

export const FORMAT_LABELS: Record<Format, string> = {
  imax: 'IMAX',
  film_70mm: '70mm',
  film_35mm: '35mm',
  laser_4k: 'Laser 4K',
  atmos: 'Atmos',
  isense: 'iSense',
  screenx: 'ScreenX',
  luxe: 'Luxe',
  digital_std: 'Digitale',
}

export const FORMAT_COLORS: Record<Format, string> = {
  imax: 'bg-ink text-ticket border-ink',
  film_70mm: 'bg-lamp text-void border-lamp',
  film_35mm: 'bg-transparent text-ink border-ink/40',
  laser_4k: 'bg-tide/15 text-tide border-tide/40',
  atmos: 'bg-transparent text-ink border-ink/40',
  isense: 'bg-transparent text-ink border-ink/40',
  screenx: 'bg-transparent text-ink border-ink/40',
  luxe: 'bg-transparent text-ink border-ink/40',
  digital_std: 'bg-transparent text-dust border-dust/40',
}
