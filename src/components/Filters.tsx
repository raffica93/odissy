import type { Format, SortMode } from '../types'
import { FORMAT_LABELS } from '../lib/score'

const FILTER_FORMATS: Format[] = [
  'imax',
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
    <section className="space-y-3 px-4 pt-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dust">
        Formato
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTER_FORMATS.map((f) => {
          const on = activeFormats.includes(f)
          return (
            <button
              key={f}
              type="button"
              onClick={() => onToggleFormat(f)}
              className={`min-h-10 shrink-0 border px-3 font-mono text-[11px] font-semibold uppercase tracking-wider ${
                on
                  ? 'border-lamp bg-lamp text-void'
                  : 'border-chalk/20 bg-booth text-dust hover:border-chalk/40 hover:text-chalk'
              }`}
            >
              {FORMAT_LABELS[f]}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="font-mono text-[10px] uppercase tracking-wider text-dust" htmlFor="radius">
          Raggio
        </label>
        <select
          id="radius"
          value={radiusKm}
          onChange={(e) => onRadius(Number(e.target.value))}
          className="min-h-10 border border-chalk/20 bg-booth px-2 font-mono text-xs text-chalk"
        >
          {RADII.map((r) => (
            <option key={r} value={r}>
              {r === 0 ? 'Tutta Italia' : `${r} km`}
            </option>
          ))}
        </select>

        <label className="font-mono text-[10px] uppercase tracking-wider text-dust" htmlFor="sort">
          Ordina
        </label>
        <select
          id="sort"
          value={sortMode}
          onChange={(e) => onSort(e.target.value as SortMode)}
          className="min-h-10 border border-chalk/20 bg-booth px-2 font-mono text-xs text-chalk"
        >
          <option value="format">Formato</option>
          <option value="distance">Solo distanza</option>
          <option value="name">Nome cinema</option>
        </select>
      </div>
    </section>
  )
}
