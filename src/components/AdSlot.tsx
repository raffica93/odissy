import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, loadAdSenseScript, pushAd } from '../lib/ads'

/**
 * Display unit AdSense. Consent is handled by Google's certified CMP
 * (Privacy & messaging), not a custom banner.
 *
 * Optional unit ids via env:
 * VITE_ADSENSE_SLOT_INFEED / _STICKY / _DETAIL
 * Without unit ids, Auto ads from the AdSense dashboard still work via the
 * client script in index.html.
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
    if (!unitId || pushed.current) return
    let cancelled = false
    loadAdSenseScript()
      .then(() => {
        if (cancelled || pushed.current) return
        pushed.current = true
        pushAd()
      })
      .catch(() => {
        /* blocked */
      })
    return () => {
      cancelled = true
    }
  }, [unitId])

  // No manual unit: Auto ads inject themselves; don't reserve empty chrome
  if (!unitId) {
    return null
  }

  return (
    <div className={`ad-slot overflow-hidden ${className}`} data-ad-slot={slot}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={unitId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
