/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_SLOT_INFEED?: string
  readonly VITE_ADSENSE_SLOT_STICKY?: string
  readonly VITE_ADSENSE_SLOT_DETAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
