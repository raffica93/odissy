import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { FaqBlock } from '../components/FaqBlock'
import { ARTICLE } from '../data/article-nolan'
import { FAQ_CORE, faqJsonLd } from '../data/faq'
import { AdSlot } from '../components/AdSlot'

export function ArticlePage() {
  const wordApprox = ARTICLE.paragraphs.join(' ').split(/\s+/).length

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: ARTICLE.h1,
      description: ARTICLE.description,
      datePublished: ARTICLE.published,
      dateModified: ARTICLE.modified,
      author: {
        '@type': 'Organization',
        name: 'Dove vedere Odissea',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Dove vedere Odissea',
        url: 'https://dovevedereodissea.it/',
      },
      mainEntityOfPage: `https://dovevedereodissea.it${ARTICLE.path}`,
      image: 'https://dovevedereodissea.it/film/odyssey-poster.jpg',
      inLanguage: 'it-IT',
      wordCount: wordApprox,
    },
    faqJsonLd(),
  ]

  return (
    <div className="min-h-screen pb-8">
      <Seo
        title={ARTICLE.title}
        description={ARTICLE.description}
        path={ARTICLE.path}
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl">
        <article className="px-4 py-6">
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-wider text-lamp"
          >
            ← Tutte le sale
          </Link>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-dust">
            Guida · ~{wordApprox} parole · aggiornato {ARTICLE.modified}
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold leading-tight text-chalk sm:text-4xl">
            {ARTICLE.h1}
          </h1>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-dust">
            {ARTICLE.paragraphs.map((p, i) => (
              <p key={i} className="text-chalk/90">
                {p}
              </p>
            ))}
          </div>

          <div className="my-8">
            <AdSlot slot="in-feed" />
          </div>

          <section className="ticket-surface p-4 shadow-[4px_4px_0_#ff6b2c33]">
            <h2 className="font-display text-xl font-bold text-ink">
              Vai alle sale
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {ARTICLE.cta.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="min-h-10 bg-ink px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-ticket hover:bg-lamp hover:text-void"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </section>
        </article>

        <FaqBlock items={FAQ_CORE} />
        <SiteFooter />
      </main>
    </div>
  )
}
