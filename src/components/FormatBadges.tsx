import type { Format } from '../types'
import { FORMAT_COLORS, FORMAT_LABELS } from '../lib/score'

export function FormatBadges({
  formats,
  onTicket = true,
}: {
  formats: Format[]
  onTicket?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {formats
        .filter((f) => f !== 'digital_std')
        .map((f) => (
          <span
            key={f}
            className={`font-mono border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              onTicket
                ? FORMAT_COLORS[f]
                : 'border-chalk/25 bg-booth text-chalk'
            }`}
          >
            {FORMAT_LABELS[f]}
          </span>
        ))}
    </div>
  )
}
