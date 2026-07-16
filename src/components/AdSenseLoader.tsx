import { useEffect } from 'react'
import { hasMarketingConsent, loadAdSenseScript } from '../lib/ads'

/**
 * Loads AdSense client script when marketing consent is already stored
 * or becomes "all". Enables Auto ads from the AdSense dashboard.
 */
export function AdSenseLoader() {
  useEffect(() => {
    const tryLoad = () => {
      if (hasMarketingConsent()) {
        loadAdSenseScript().catch(() => {
          /* adblock / offline */
        })
      }
    }
    tryLoad()
    window.addEventListener('odissy-consent', tryLoad)
    return () => window.removeEventListener('odissy-consent', tryLoad)
  }, [])

  return null
}
