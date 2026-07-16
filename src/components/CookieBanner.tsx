import { useEffect, useState } from 'react'
import {
  CONSENT_KEY,
  loadAdSenseScript,
  type ConsentValue,
} from '../lib/ads'

function notifyConsent(value: ConsentValue) {
  window.dispatchEvent(
    new CustomEvent('odissy-consent', { detail: value }),
  )
  if (value === 'all') {
    loadAdSenseScript().catch(() => {
      /* blocked */
    })
  }
}

export function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      const existing = localStorage.getItem(CONSENT_KEY) as ConsentValue | null
      if (!existing) {
        setOpen(true)
        return
      }
      notifyConsent(existing)
    } catch {
      setOpen(true)
    }
  }, [])

  function accept(value: ConsentValue) {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {
      /* ignore */
    }
    notifyConsent(value)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-safe">
      <div className="ticket-surface mx-auto max-w-lg p-4 shadow-[6px_6px_0_#ff6b2c44]">
        <p className="text-sm text-ink/80">
          Cookie tecnici sempre attivi. Marketing (Google AdSense) solo se
          accetti.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => accept('necessary')}
            className="min-h-11 flex-1 border border-ink/25 px-3 py-2 text-sm font-medium text-ink"
          >
            Solo necessari
          </button>
          <button
            type="button"
            onClick={() => accept('all')}
            className="min-h-11 flex-1 bg-ink px-3 py-2 text-sm font-semibold text-ticket hover:bg-lamp hover:text-void"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  )
}
