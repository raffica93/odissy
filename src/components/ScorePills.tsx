function Meter({
  label,
  value,
  tone,
  compact,
}: {
  label: string
  value: number
  tone: 'lamp' | 'tide'
  compact?: boolean
}) {
  const pct = Math.max(0, Math.min(100, (value / 10) * 100))
  const fill = tone === 'lamp' ? 'bg-lamp' : 'bg-tide'
  return (
    <div className={compact ? 'min-w-0 flex-1' : 'w-full'}>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
          {label}
        </span>
        <span className="font-mono text-xs font-bold tabular-nums text-ink">
          {value.toFixed(1)}
        </span>
      </div>
      <div className="meter-track bg-ink/12" aria-hidden>
        <div className={`meter-fill ${fill}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function ScorePills({
  video,
  audio,
  compact = false,
}: {
  video: number
  audio: number
  compact?: boolean
}) {
  return (
    <div className={compact ? 'flex gap-4' : 'space-y-3'}>
      <Meter label="Video" value={video} tone="lamp" compact={compact} />
      <Meter label="Audio" value={audio} tone="tide" compact={compact} />
    </div>
  )
}
