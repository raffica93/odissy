export type Format =
  | 'imax'
  | 'film_70mm'
  | 'film_35mm'
  | 'laser_4k'
  | 'atmos'
  | 'isense'
  | 'screenx'
  | 'luxe'
  | 'digital_std'

export type OfficialSource = {
  label: string
  url: string
}

export type Cinema = {
  id: string
  name: string
  city: string
  region: string
  lat: number
  lon: number
  address?: string
  auditorium: string
  odysseyFormat: string
  formats: Format[]
  specialties: string[]
  notes: string
  verifiedAt: string
  sources: OfficialSource[]
  bookingUrl?: string
  website?: string
  mapsUrl?: string
}

export type City = {
  name: string
  lat: number
  lon: number
  region: string
}

export type SortMode = 'format' | 'distance' | 'name'

export type UserLocation = {
  lat: number
  lon: number
  label: string
}

export type RankedCinema = Cinema & {
  distanceKm: number | null
}
