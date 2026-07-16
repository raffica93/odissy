/** Scheda film — Odissea / The Odyssey (Nolan) */
export const FILM = {
  titleIt: 'Odissea',
  titleEn: 'The Odyssey',
  year: 2026,
  director: 'Christopher Nolan',
  imdbId: 'tt33764258',
  imdbUrl: 'https://www.imdb.com/title/tt33764258/',
  officialUrl: 'https://www.odysseymovie.com/',
  wikipediaUrl: 'https://it.wikipedia.org/wiki/The_Odyssey_(film_2026)',
  /** Locandina ufficiale in /public/film (uso editoriale; © titolari) */
  posterSrc: `${import.meta.env.BASE_URL}film/odyssey-poster.jpg`,
  /** Asset originali generati in stile locandina (fuoco, fumo, silhouette) */
  heroBannerSrc: `${import.meta.env.BASE_URL}film/hero-banner.jpg`,
  atmosphereSrc: `${import.meta.env.BASE_URL}film/atmosphere-square.jpg`,
  keyArtSrc: `${import.meta.env.BASE_URL}film/key-art-vertical.jpg`,
  tagline: 'Defy the Gods · Solo al cinema',
} as const

