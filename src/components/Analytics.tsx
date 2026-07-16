import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ANALYTICS,
  loadGoatCounter,
  loadGoogleAnalytics,
  trackPageview,
} from '../lib/analytics'

/**
 * Carica tracker e registra le navigazioni SPA.
 * GoatCounter: privacy-friendly, funziona senza cookie banner.
 * GA4: solo se VITE_GA_MEASUREMENT_ID / ANALYTICS.gaMeasurementId è impostato.
 */
export function Analytics() {
  const location = useLocation()

  useEffect(() => {
    if (ANALYTICS.goatCounterCode) {
      loadGoatCounter(ANALYTICS.goatCounterCode)
    }
    if (ANALYTICS.gaMeasurementId) {
      loadGoogleAnalytics(ANALYTICS.gaMeasurementId)
    }
  }, [])

  useEffect(() => {
    const path = location.pathname + location.search
    // GoatCounter auto-conta il primo page load; per SPA forziamo i cambi route
    const t = window.setTimeout(() => trackPageview(path), 80)
    return () => window.clearTimeout(t)
  }, [location.pathname, location.search])

  return null
}
