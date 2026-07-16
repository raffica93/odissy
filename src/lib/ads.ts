/** Google AdSense publisher ID */
export const ADSENSE_CLIENT = 'ca-pub-4336309565583796'

export const CONSENT_KEY = 'odissy-cookie-consent'

export type ConsentValue = 'necessary' | 'all'

export function getConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    if (v === 'all' || v === 'necessary') return v
  } catch {
    /* ignore */
  }
  return null
}

export function hasMarketingConsent(): boolean {
  return getConsent() === 'all'
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

let scriptPromise: Promise<void> | null = null

/** Load adsbygoogle.js once (after marketing consent). */
export function loadAdSenseScript(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[src*="pagead2.googlesyndication.com"]',
    )
    if (existing) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.async = true
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
    s.crossOrigin = 'anonymous'
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('AdSense script failed'))
    document.head.appendChild(s)
  })

  return scriptPromise
}

export function pushAd(): void {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch {
    /* ignore duplicate push */
  }
}
