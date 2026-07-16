import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, loadAdSenseScript, pushAd } from '../lib/ads'

/**
 * Slot display AdSense.
 * - Con VITE_ADSENSE_SLOT_* (o prop adSlot): unità fissa
 * - Senza ID: prova un blocco auto responsive (serve comunque approvazione AdSense)
 */
export function AdSlot({
  slot = 'in-feed',
  className = '',
  adSlot,
}: {
  slot?: 'in-feed' | 'sticky' | 'detail'
  className?: string
  adSlot?: string
}) {
  const pushed = useRef(false)

  const unitId =
    adSlot ||
    (slot === 'sticky'
      ? import.meta.env.VITE_ADSENSE_SLOT_STICKY
      : slot === 'detail'
        ? import.meta.env.VITE_ADSENSE_SLOT_DETAIL
        : import.meta.env.VITE_ADSENSE_SLOT_INFEED) ||
    ''

  useEffect(() => {
    if (pushed.current) return
    let cancelled = false
    loadAdSenseScript()
      .then(() => {
        if (cancelled || pushed.current) return
        pushed.current = true
        // small delay so React has mounted <ins>
        requestAnimationFrame(() => pushAd())
      })
      .catch(() => {
        /* blocked / offline */
      })
    return () => {
      cancelled = true
    }
  }, [unitId])

  // Sticky senza unit id: non occupare la barra in basso
  if (!unitId && slot === 'sticky') {
    return null
  }

  return (
    <div
      className={`ad-slot min-h-[90px] overflow-hidden ${className}`}
      data-ad-slot={slot}
    >
      {unitId ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={unitId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}
