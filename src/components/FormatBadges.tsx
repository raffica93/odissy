import type { Format } from '../types'
import { FORMAT_COLORS, FORMAT_LABELS } from '../lib/score'

export function FormatBadges({ formats }: { formats: Format[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {formats
        .filter((f) => f !== 'digital_std')
        .map((f) => (
          <span
            key={f}
            className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${FORMAT_COLORS[f]}`}
          >
            {FORMAT_LABELS[f]}
          </span>
        ))}
    </div>
  )
}
