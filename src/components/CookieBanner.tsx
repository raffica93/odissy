import { useEffect, useState } from 'react'

const KEY = 'odissy-cookie-consent'

export function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  function accept(value: 'necessary' | 'all') {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-safe">
      <div className="mx-auto max-w-lg rounded-2xl border border-gold/30 bg-navy-soft/95 p-4 shadow-2xl backdrop-blur">
        <p className="text-sm text-gold-soft">
          Usiamo cookie tecnici e, con il tuo consenso, cookie di profilazione per
          annunci Google. Nessun tracking marketing senza consenso.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => accept('necessary')}
            className="min-h-11 flex-1 rounded-xl border border-mist/30 px-3 py-2 text-sm font-medium text-ink"
          >
            Solo necessari
          </button>
          <button
            type="button"
            onClick={() => accept('all')}
            className="min-h-11 flex-1 rounded-xl bg-gold px-3 py-2 text-sm font-semibold text-navy"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  )
}
