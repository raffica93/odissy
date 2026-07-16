/**
 * Analytics config — 0€.
 *
 * 1) GoatCounter (consigliato subito, privacy-friendly, niente cookie)
 *    → crea sito gratis: https://www.goatcounter.com
 *    → code = sottodominio (es. dovevedereodissea → dovevedereodissea.goatcounter.com)
 *
 * 2) Google Analytics 4 (opzionale, stesso account AdSense)
 *    → Admin → Crea proprietà → ottieni G-XXXXXXXX
 */
export const ANALYTICS = {
  /** Lascia '' per disattivare. Es: 'dovevedereodissea' */
  goatCounterCode: 'dovevedereodissea',
  /** Lascia '' finché non hai l'ID. Es: 'G-XXXXXXXXXX' */
  gaMeasurementId: (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || '',
} as const

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    goatcounter?: { count?: (vars?: Record<string, string>) => void }
  }
}

export function loadGoatCounter(code: string) {
  if (!code || typeof document === 'undefined') return
  // Già in index.html: evita doppio script
  if (document.querySelector('script[data-goatcounter]')) return
  if (document.querySelector('script[src*="gc.zgo.at/count.js"]')) return

  const s = document.createElement('script')
  s.async = true
  s.dataset.goatcounter = `https://${code}.goatcounter.com/count`
  s.src = 'https://gc.zgo.at/count.js'
  document.head.appendChild(s)
}


export function loadGoogleAnalytics(measurementId: string) {
  if (!measurementId || typeof document === 'undefined') return
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }

  // Consent Mode v2 default (UE): denied finché il CMP Google non aggiorna
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  })

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(s)

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  })
}

/** Track SPA route changes */
export function trackPageview(path: string) {
  if (window.gtag && ANALYTICS.gaMeasurementId) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    })
  }
  if (window.goatcounter?.count) {
    window.goatcounter.count({
      path,
      title: document.title,
    })
  }
}
