/** Placeholder ready for Google AdSense. */
export function AdSlot({
  slot = 'in-feed',
  className = '',
}: {
  slot?: 'in-feed' | 'sticky' | 'detail'
  className?: string
}) {
  return (
    <div
      className={`ad-slot flex items-center justify-center border border-dashed border-chalk/15 bg-booth/80 text-center ${className}`}
      data-ad-slot={slot}
      aria-label="Spazio pubblicitario"
    >
      <div className="px-3 py-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-dust">
          Intervallo · ads
        </div>
        <div className="mt-1 text-xs text-dust/80">Slot AdSense pronto</div>
      </div>
    </div>
  )
}
