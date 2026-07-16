import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { Hero } from '../components/Hero'
import { FilmCard } from '../components/FilmCard'
import { CinemaExplorer } from '../components/CinemaExplorer'
import { FaqBlock } from '../components/FaqBlock'
import { FAQ_CORE, faqJsonLd } from '../data/faq'
import { SEO_LANDINGS } from '../data/seo-landings'
import { FILM } from '../data/film'

export function HomePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Dove vedere Odissea',
      url: 'https://dovevedereodissea.it/',
      description:
        'Trova le migliori sale in Italia per Odissea di Christopher Nolan: IMAX, 70mm, Atmos.',
      inLanguage: 'it-IT',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      name: FILM.titleIt,
      alternateName: FILM.titleEn,
      datePublished: '2026-07-17',
      director: { '@type': 'Person', name: FILM.director },
      sameAs: [FILM.imdbUrl, FILM.officialUrl],
      image: 'https://dovevedereodissea.it/film/odyssey-poster.jpg',
    },
    faqJsonLd(),
  ]

  return (
    <div className="min-h-screen pb-8">
      <Seo
        title="Dove vedere Odissea — IMAX, 70mm e le migliori sale in Italia"
        description="Trova la sala migliore per Odissea di Christopher Nolan in Italia: IMAX digitale, pellicola 70mm, Atmos. Mappa, voti video/audio e guida formati."
        path="/"
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl">
        <Hero />
        <FilmCard />
        <nav
          className="flex flex-wrap gap-2 px-4 pt-3"
          aria-label="Pagine utili"
        >
          {SEO_LANDINGS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="min-h-9 border border-chalk/20 bg-booth px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-chalk hover:border-lamp hover:text-lamp"
            >
              {l.slug}
            </Link>
          ))}
        </nav>
        <CinemaExplorer />

        <FaqBlock items={FAQ_CORE} />
        <SiteFooter />
      </main>
    </div>
  )
}
