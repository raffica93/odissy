import type { Format, SortMode } from '../types'
import { FORMAT_LABELS } from '../lib/score'

const FILTER_FORMATS: Format[] = [
  'imax_digital',
  'film_70mm',
  'film_35mm',
  'atmos',
  'isense',
  'screenx',
  'laser_4k',
]

const RADII = [0, 25, 50, 100, 200] as const

export function Filters({
  activeFormats,
  onToggleFormat,
  radiusKm,
  onRadius,
  sortMode,
  onSort,
}: {
  activeFormats: Format[]
  onToggleFormat: (f: Format) => void
  radiusKm: number
  onRadius: (km: number) => void
  sortMode: SortMode
  onSort: (s: SortMode) => void
}) {
  return (
    <section className="space-y-3 px-4 pt-4">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTER_FORMATS.map((f) => {
          const on = activeFormats.includes(f)
          return (
            <button
              key={f}
              type="button"
              onClick={() => onToggleFormat(f)}
              className={`min-h-10 shrink-0 rounded-full border px-3 text-xs font-semibold ${
                on
                  ? 'border-gold bg-gold/20 text-gold-soft'
                  : 'border-mist/20 bg-navy-soft text-mist'
              }`}
            >
              {FORMAT_LABELS[f]}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs text-mist" htmlFor="radius">
          Raggio
        </label>
        <select
          id="radius"
          value={radiusKm}
          onChange={(e) => onRadius(Number(e.target.value))}
          className="min-h-10 rounded-lg border border-mist/20 bg-navy-soft px-2 text-xs text-ink"
        >
          {RADII.map((r) => (
            <option key={r} value={r}>
              {r === 0 ? 'Tutta Italia' : `${r} km`}
            </option>
          ))}
        </select>

        <label className="ml-2 text-xs text-mist" htmlFor="sort">
          Ordina
        </label>
        <select
          id="sort"
          value={sortMode}
          onChange={(e) => onSort(e.target.value as SortMode)}
          className="min-h-10 rounded-lg border border-mist/20 bg-navy-soft px-2 text-xs text-ink"
        >
          <option value="experience">Esperienza + distanza</option>
          <option value="distance">Solo distanza</option>
          <option value="quality">Solo qualità</option>
        </select>
      </div>
    </section>
  )
}
