/** Placeholder ready for Google AdSense. Replace data-ad-client when approved. */
export function AdSlot({
  slot = 'in-feed',
  className = '',
}: {
  slot?: 'in-feed' | 'sticky' | 'detail'
  className?: string
}) {
  return (
    <div
      className={`ad-slot flex items-center justify-center rounded-xl border border-dashed border-gold/25 bg-navy-soft/60 text-center text-xs text-mist ${className}`}
      data-ad-slot={slot}
      aria-label="Spazio pubblicitario"
    >
      <div className="px-3 py-4">
        <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-gold/60">
          Pubblicità
        </div>
        <div>Google AdSense — slot pronto</div>
        <div className="mt-1 text-[10px] text-mist/70">
          Sostituisci con il tuo ad-client dopo l&apos;approvazione
        </div>
      </div>
    </div>
  )
}
