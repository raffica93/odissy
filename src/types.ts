export type Format =
  | 'imax_digital'
  | 'film_70mm'
  | 'film_35mm'
  | 'laser_4k'
  | 'atmos'
  | 'isense'
  | 'screenx'
  | 'luxe'
  | 'digital_std'

export type Tier = 'S' | 'A' | 'B' | 'C'

export type Cinema = {
  id: string
  name: string
  city: string
  region: string
  lat: number
  lon: number
  address?: string
  formats: Format[]
  videoScore: number
  audioScore: number
  overallScore: number
  specialties: string[]
  notes: string
  bookingUrl?: string
  website?: string
  tier: Tier
}

export type City = {
  name: string
  lat: number
  lon: number
  region: string
}

export type SortMode = 'experience' | 'distance' | 'quality'

export type UserLocation = {
  lat: number
  lon: number
  label: string
}

export type RankedCinema = Cinema & {
  distanceKm: number | null
  experienceScore: number
}
