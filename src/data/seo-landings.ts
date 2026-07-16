import type { Format, UserLocation } from '../types'
import type { FaqItem } from './faq'
import { FAQ_CORE } from './faq'

export type SeoLanding = {
  slug: string
  path: string
  title: string
  description: string
  h1: string
  intro: string[]
  /** Optional city center for distance ranking */
  location?: UserLocation
  /** Format filters applied by default */
  formats?: Format[]
  /** Extra city/region name match on cinema.city or cinema.region */
  cityMatch?: string[]
  regionMatch?: string[]
  radiusKm?: number
  faqs?: FaqItem[]
  related: { to: string; label: string }[]
}

export const SEO_LANDINGS: SeoLanding[] = [
  {
    slug: 'milano',
    path: '/milano',
    title: 'Dove vedere Odissea a Milano in IMAX o 70mm',
    description:
      'Guida alle migliori sale per Odissea di Nolan vicino a Milano: Arcadia Melzo 70mm, IMAX Orio e Sesto, Atmos e voti video/audio.',
    h1: 'Dove vedere Odissea a Milano',
    intro: [
      'Se sei a Milano o in hinterland, le scelte che contano per Odissea non sono “il multiplex sotto casa”, ma formato e sala.',
      'A un’ora circa trovi Arcadia Melzo (70mm + Atmos di riferimento) e UCI Orio (IMAX digitale tra i più citati d’Italia). Più comodi in città: Notorious Sesto (IMAX), Anteo, Movie Planet Castelletto per Atmos.',
      'Usa la lista sotto ordinata per esperienza: imposta pure la tua posizione se vuoi i km precisi.',
    ],
    location: {
      lat: 45.4642,
      lon: 9.19,
      label: 'Milano',
    },
    radiusKm: 80,
    faqs: FAQ_CORE,
    related: [
      { to: '/imax-italia', label: 'IMAX Italia' },
      { to: '/70mm-italia', label: '70mm Italia' },
      { to: '/come-scegliere-sala-nolan', label: 'Come scegliere la sala' },
    ],
  },
  {
    slug: 'roma',
    path: '/roma',
    title: 'Dove vedere Odissea a Roma in IMAX o 70mm',
    description:
      'Sale a Roma per Odissea di Nolan: Quattro Fontane in 70mm, IMAX Porta di Roma, iSense e multiplex premium. Voti e mappa.',
    h1: 'Dove vedere Odissea a Roma',
    intro: [
      'A Roma il dilemma tipico è pellicola contro IMAX digitale.',
      'Per il 70mm la meta storica è il Cinema Quattro Fontane. Per l’IMAX digitale punta a UCI Porta di Roma (e altre sale XL del circuito). Poi iSense e Luxe se non trovi posto nei formati “event”.',
      'Controlla sempre sul sito del cinema se lo spettacolo è in 70mm o digitale: non basta il nome della sala.',
    ],
    location: {
      lat: 41.9028,
      lon: 12.4964,
      label: 'Roma',
    },
    radiusKm: 50,
    cityMatch: ['Roma', 'Fiumicino'],
    regionMatch: ['Lazio'],
    faqs: FAQ_CORE,
    related: [
      { to: '/70mm-italia', label: '70mm Italia' },
      { to: '/imax-italia', label: 'IMAX Italia' },
      { to: '/napoli', label: 'Odissea a Napoli' },
    ],
  },
  {
    slug: 'napoli',
    path: '/napoli',
    title: 'Dove vedere Odissea a Napoli: 70mm e IMAX',
    description:
      'Odissea a Napoli e provincia: Metropolitan 70mm, Happy Afragola IMAX, sale Atmos. Guida con voti video e audio.',
    h1: 'Dove vedere Odissea a Napoli',
    intro: [
      'Nel Sud, il Metropolitan di Napoli è la grande notizia per chi vuole Odissea in pellicola 70mm.',
      'Per l’IMAX digitale l’opzione di zona è Happy MaxiCinema Afragola. Se non arrivi a questi formati, scegli lo schermo più grande e l’audio migliore tra le sale vicine.',
      'La lista sotto parte da Napoli: ordina per distanza o qualità con i filtri.',
    ],
    location: {
      lat: 40.8518,
      lon: 14.2681,
      label: 'Napoli',
    },
    radiusKm: 60,
    cityMatch: ['Napoli', 'Afragola', 'Casoria', 'Marcianise'],
    regionMatch: ['Campania'],
    faqs: FAQ_CORE,
    related: [
      { to: '/70mm-italia', label: '70mm Italia' },
      { to: '/roma', label: 'Odissea a Roma' },
      { to: '/come-scegliere-sala-nolan', label: 'Come scegliere' },
    ],
  },
  {
    slug: 'imax-italia',
    path: '/imax-italia',
    title: 'Sale IMAX in Italia per Odissea di Nolan',
    description:
      'Elenco sale IMAX digitali in Italia per vedere Odissea: Orio, Sesto, Campi Bisenzio, Roma, Verona, Genova, Afragola. Attenzione: non è IMAX 70mm.',
    h1: 'IMAX in Italia per Odissea',
    intro: [
      'In Italia le sale IMAX attive sono digitali: nessuna proiezione IMAX 70mm nota sul territorio nazionale.',
      'Restano comunque tra le esperienze visive più immersive disponibili qui. UCI (Orio, Campi Bisenzio, Porta di Roma, Verona, Genova), Notorious Sesto e Happy Afragola coprono gran parte del Paese.',
      'Non tutte le certificazioni IMAX sono uguali: dimensioni schermo e tecnologia cambiano. Usa i voti e le note in scheda.',
    ],
    formats: ['imax_digital'],
    faqs: FAQ_CORE,
    related: [
      { to: '/70mm-italia', label: 'Alternative 70mm' },
      { to: '/milano', label: 'Zona Milano' },
      { to: '/come-scegliere-sala-nolan', label: 'Guida completa' },
    ],
  },
  {
    slug: '70mm-italia',
    path: '/70mm-italia',
    title: 'Odissea in pellicola 70mm: sale in Italia',
    description:
      'Dove vedere Odissea in 70mm in Italia: Melzo, Napoli, Roma, Bologna, Conegliano. Guida alla pellicola vs IMAX digitale.',
    h1: 'Odissea in 70mm in Italia',
    intro: [
      'Il 70mm non è IMAX, ma per molti è il modo più “cinema” di vedere Odissea in Italia: grana, calore, proiezione meccanica.',
      'Sale da tenere d’occhio: Arcadia Melzo, Metropolitan Napoli, Quattro Fontane Roma, Cineteca Bologna, Cinergia Conegliano. Conferma sempre il cartellone: non ogni spettacolo è in pellicola.',
      'Se il 70mm è sold out, valuta IMAX digitale o il miglior laser/Atmos raggiungibile.',
    ],
    formats: ['film_70mm'],
    faqs: FAQ_CORE,
    related: [
      { to: '/imax-italia', label: 'IMAX Italia' },
      { to: '/milano', label: 'Milano / Melzo' },
      { to: '/napoli', label: 'Napoli Metropolitan' },
    ],
  },
]

export function getLanding(slug: string): SeoLanding | undefined {
  return SEO_LANDINGS.find((l) => l.slug === slug)
}
