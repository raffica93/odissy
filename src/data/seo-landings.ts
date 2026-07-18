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
  location?: UserLocation
  formats?: Format[]
  cityMatch?: string[]
  regionMatch?: string[]
  radiusKm?: number
  faqs?: FaqItem[]
  related: { to: string; label: string }[]
}

export const SEO_LANDINGS: SeoLanding[] = [
  {
    slug: 'milano', path: '/milano', title: 'Dove vedere Odissea a Milano in IMAX o 70mm',
    description: 'Sale verificate vicino a Milano per Odissea: Sala Energia PLF 70mm a Melzo e sale IMAX a Sesto San Giovanni e Azzano San Paolo.',
    h1: 'Dove vedere Odissea a Milano',
    intro: [
      'ARCADIA Melzo programma il 70mm nella Sala ENERGIA PLF.',
      'Notorious Sesto propone Odissea nella Sala IMAX del Centro Sarca; UCI Cinemas Orio | Bergamo si trova ad Azzano San Paolo e propone spettacoli IMAX.',
      'Le schede riportano caratteristiche documentate e il link alla programmazione ufficiale. Imposta la posizione per confrontare le distanze.',
    ],
    location: { lat: 45.4642, lon: 9.19, label: 'Milano' }, radiusKm: 80, faqs: FAQ_CORE,
    related: [{ to: '/imax-italia', label: 'IMAX Italia' }, { to: '/70mm-italia', label: '70mm Italia' }, { to: '/come-scegliere-sala-nolan', label: 'Come scegliere la sala' }],
  },
  {
    slug: 'roma', path: '/roma', title: 'Dove vedere Odissea a Roma in IMAX o 70mm',
    description: 'Sale verificate a Roma per Odissea di Nolan: 4Fontane in pellicola 70mm e UCI Cinemas Porta di Roma in IMAX.',
    h1: 'Dove vedere Odissea a Roma',
    intro: [
      'A Roma il dilemma è pellicola 70mm contro IMAX.',
      'Per la pellicola seleziona “Odissea - 70mm” al 4Fontane. Per l’IMAX seleziona gli orari contrassegnati IMAX a UCI Cinemas Porta di Roma.',
      'Controlla sempre la dicitura del singolo spettacolo: lo stesso cinema può programmare Odissea anche in altri formati.',
    ],
    location: { lat: 41.9028, lon: 12.4964, label: 'Roma' }, radiusKm: 50, cityMatch: ['Roma'], regionMatch: ['Lazio'], faqs: FAQ_CORE,
    related: [{ to: '/70mm-italia', label: '70mm Italia' }, { to: '/imax-italia', label: 'IMAX Italia' }, { to: '/napoli', label: 'Odissea a Napoli' }],
  },
  {
    slug: 'napoli', path: '/napoli', title: 'Dove vedere Odissea a Napoli: 70mm e IMAX',
    description: 'Odissea a Napoli e provincia: Metropolitan in pellicola 70mm e Happy Maxicinema Afragola in 2D IMAX, con fonti ufficiali.',
    h1: 'Dove vedere Odissea a Napoli',
    intro: [
      'Al Metropolitan seleziona “Odissea - 70mm”: Circuito Cinema conferma una sala da 294 posti con proiettore Victoria 8 e audio DTS XD-10.',
      'A Happy Maxicinema Afragola la programmazione distingue “Odissea - 2D IMAX” dalla versione standard.',
      'La lista parte da Napoli: puoi ordinarla per formato, distanza o nome.',
    ],
    location: { lat: 40.8518, lon: 14.2681, label: 'Napoli' }, radiusKm: 60, cityMatch: ['Napoli', 'Afragola'], regionMatch: ['Campania'], faqs: FAQ_CORE,
    related: [{ to: '/70mm-italia', label: '70mm Italia' }, { to: '/roma', label: 'Odissea a Roma' }, { to: '/come-scegliere-sala-nolan', label: 'Come scegliere' }],
  },
  {
    slug: 'imax-italia', path: '/imax-italia', title: 'Sale IMAX confermate in Italia per Odissea di Nolan',
    description: 'Sette sale IMAX verificate per Odissea: Azzano San Paolo, Sesto, Campi Bisenzio, Roma, San Giovanni Lupatoto, Genova e Afragola.',
    h1: 'IMAX in Italia per Odissea',
    intro: [
      'Nell’elenco ufficiale IMAX 70mm di Odissea non compare alcuna sala italiana. Le proiezioni raccolte qui sono indicate dalle fonti come IMAX, senza la dicitura IMAX 70mm.',
      'Sono confermati UCI Orio | Bergamo, Campi Bisenzio, Porta di Roma, Verona e Fiumara; Notorious Sesto; Happy Maxicinema Afragola.',
      'Le fonti non pubblicano sempre numero sala, tipo di proiettore, rapporto d’aspetto o dimensioni dello schermo: le schede indicano soltanto ciò che è verificabile.',
    ],
    formats: ['imax'], faqs: FAQ_CORE,
    related: [{ to: '/70mm-italia', label: 'Alternative 70mm' }, { to: '/milano', label: 'Zona Milano' }, { to: '/come-scegliere-sala-nolan', label: 'Guida completa' }],
  },
  {
    slug: '70mm-italia', path: '/70mm-italia', title: 'Odissea in pellicola 70mm: sale in Italia',
    description: 'Cinque proiezioni verificate di Odissea in pellicola 70mm: Melzo, Napoli, Roma, Bologna e Conegliano.',
    h1: 'Odissea in 70mm in Italia',
    intro: [
      'Il 70mm italiano qui indicato è pellicola 70mm tradizionale, non IMAX 70mm.',
      'Le sale verificate sono Sala ENERGIA PLF ad Arcadia Melzo, Metropolitan Napoli, 4Fontane Roma, Sala Mastroianni del Cinema Lumière Bologna e Cinergia Conegliano.',
      'Seleziona soltanto gli spettacoli che riportano esplicitamente “70mm”: nello stesso cinema possono esserci repliche digitali.',
    ],
    formats: ['film_70mm'], faqs: FAQ_CORE,
    related: [{ to: '/imax-italia', label: 'IMAX Italia' }, { to: '/milano', label: 'Milano / Melzo' }, { to: '/napoli', label: 'Napoli Metropolitan' }],
  },
]

export function getLanding(slug: string): SeoLanding | undefined {
  return SEO_LANDINGS.find((landing) => landing.slug === slug)
}
