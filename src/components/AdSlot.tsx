import { useEffect, useRef, useState } from 'react'
import {
  ADSENSE_CLIENT,
  hasMarketingConsent,
  loadAdSenseScript,
  pushAd,
} from '../lib/ads'

/**
 * Display unit AdSense (auto format).
 * After you create units in AdSense, set VITE_ADSENSE_SLOT_* in .env
 * or pass `adSlot` — until then Auto ads from the dashboard still work
 * via the client script.
 */
export function AdSlot({
  slot = 'in-feed',
  className = '',
  adSlot,
}: {
  slot?: 'in-feed' | 'sticky' | 'detail'
  className?: string
  /** Optional AdSense unit id (from AdSense → Annunci → Per unità) */
  adSlot?: string
}) {
  const insRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)
  const [allowed, setAllowed] = useState(false)

  // Resolve unit id: prop > env by slot name
  const unitId =
    adSlot ||
    (slot === 'sticky'
      ? import.meta.env.VITE_ADSENSE_SLOT_STICKY
      : slot === 'detail'
        ? import.meta.env.VITE_ADSENSE_SLOT_DETAIL
        : import.meta.env.VITE_ADSENSE_SLOT_INFEED) ||
    ''

  useEffect(() => {
    const sync = () => setAllowed(hasMarketingConsent())
    sync()
    window.addEventListener('odissy-consent', sync)
    return () => window.removeEventListener('odissy-consent', sync)
  }, [])

  useEffect(() => {
    if (!allowed || !unitId || pushed.current) return
    let cancelled = false
    loadAdSenseScript()
      .then(() => {
        if (cancelled || pushed.current) return
        pushed.current = true
        pushAd()
      })
      .catch(() => {
        /* script blocked / offline */
      })
    return () => {
      cancelled = true
    }
  }, [allowed, unitId])

  // No marketing consent: hide ads
  if (!allowed) {
    return null
  }

  // Consent yes but no unit id yet: keep layout space subtle (Auto ads may inject elsewhere)
  if (!unitId) {
    return (
      <div
        className={`ad-slot ${className}`}
        data-ad-slot={slot}
        aria-hidden
      />
    )
  }

  return (
    <div
      className={`ad-slot overflow-hidden ${className}`}
      data-ad-slot={slot}
    >
      <ins
        ref={insRef}
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
