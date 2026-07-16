import type { Cinema, Format, RankedCinema, SortMode } from '../types'
import { haversineKm } from './geo'

const FORMAT_BONUS: Partial<Record<Format, number>> = {
  film_70mm: 28,
  imax_digital: 25,
  isense: 10,
  screenx: 10,
  film_35mm: 12,
  atmos: 8,
  laser_4k: 6,
  luxe: 5,
  digital_std: 0,
}

export function formatBonus(formats: Format[]): number {
  return formats.reduce((sum, f) => sum + (FORMAT_BONUS[f] ?? 0), 0)
}

export function computeExperienceScore(
  cinema: Cinema,
  distanceKm: number | null,
): number {
  const base = cinema.overallScore * 10 + formatBonus(cinema.formats)
  if (distanceKm == null) return base
  return base - distanceKm * 0.35
}

export function rankCinemas(
  cinemas: Cinema[],
  userLat: number | null,
  userLon: number | null,
  sortMode: SortMode,
): RankedCinema[] {
  const ranked: RankedCinema[] = cinemas.map((c) => {
    const distanceKm =
      userLat != null && userLon != null
        ? haversineKm(userLat, userLon, c.lat, c.lon)
        : null
    return {
      ...c,
      distanceKm,
      experienceScore: computeExperienceScore(c, distanceKm),
    }
  })

  ranked.sort((a, b) => {
    if (sortMode === 'distance') {
      if (a.distanceKm == null && b.distanceKm == null)
        return b.overallScore - a.overallScore
      if (a.distanceKm == null) return 1
      if (b.distanceKm == null) return -1
      return a.distanceKm - b.distanceKm
    }
    if (sortMode === 'quality') {
      return b.overallScore - a.overallScore || b.experienceScore - a.experienceScore
    }
    return b.experienceScore - a.experienceScore
  })

  return ranked
}

export const FORMAT_LABELS: Record<Format, string> = {
  imax_digital: 'IMAX',
  film_70mm: '70mm',
  film_35mm: '35mm',
  laser_4k: 'Laser 4K',
  atmos: 'Atmos',
  isense: 'iSense',
  screenx: 'ScreenX',
  luxe: 'Luxe',
  digital_std: 'Digitale',
}

/** Ticket-stub style format chips (ink on paper) */
export const FORMAT_COLORS: Record<Format, string> = {
  imax_digital: 'bg-ink text-ticket border-ink',
  film_70mm: 'bg-lamp text-void border-lamp',
  film_35mm: 'bg-transparent text-ink border-ink/40',
  laser_4k: 'bg-tide/15 text-tide border-tide/40',
  atmos: 'bg-transparent text-ink border-ink/40',
  isense: 'bg-transparent text-ink border-ink/40',
  screenx: 'bg-transparent text-ink border-ink/40',
  luxe: 'bg-transparent text-ink border-ink/40',
  digital_std: 'bg-transparent text-dust border-dust/40',
}
