# Odissy

Sito mobile-first per trovare **dove vedere *Odissea* di Christopher Nolan in Italia**: IMAX, 70mm, Atmos, iSense, mappa e voti video/audio.

## Stack (0€)

- Vite + React + TypeScript
- Tailwind CSS v4
- Leaflet + OpenStreetMap
- Dataset statico JSON
- Hosting consigliato: Cloudflare Pages / Netlify / GitHub Pages

## Sviluppo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy gratuito

1. Push su GitHub
2. Collega a Cloudflare Pages o Netlify (build: `npm run build`, output: `dist`)
3. Sostituisci lo slot AdSense in `src/components/AdSlot.tsx` dopo l'approvazione

## Aggiornare le sale

Modifica `src/data/cinemas.json` e fai rebuild.

## Disclaimer

Progetto indipendente, non ufficiale. Voti editoriali soggettivi. Verifica sempre formati e orari sui siti dei cinema.
