export function ScorePills({
  video,
  audio,
  compact = false,
}: {
  video: number
  audio: number
  compact?: boolean
}) {
  const box = compact ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
  return (
    <div className="flex gap-2">
      <span
        className={`rounded-lg border border-gold/30 bg-navy-soft ${box} font-semibold text-gold-soft`}
      >
        Video {video.toFixed(1)}
      </span>
      <span
        className={`rounded-lg border border-violet-400/30 bg-navy-soft ${box} font-semibold text-violet-200`}
      >
        Audio {audio.toFixed(1)}
      </span>
    </div>
  )
}
