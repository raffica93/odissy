import { Link, Navigate } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { CinemaExplorer } from '../components/CinemaExplorer'
import { FaqBlock } from '../components/FaqBlock'
import { getLanding } from '../data/seo-landings'
import { faqJsonLd } from '../data/faq'

export function LandingPage({ slug }: { slug: string }) {
  const landing = getLanding(slug)
  if (!landing) return <Navigate to="/" replace />

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: landing.title,
      description: landing.description,
      url: `https://dovevedereodissea.it${landing.path}`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Dove vedere Odissea',
        url: 'https://dovevedereodissea.it/',
      },
      inLanguage: 'it-IT',
    },
    faqJsonLd(landing.faqs),
  ]

  return (
    <div className="min-h-screen pb-8">
      <Seo
        title={landing.title}
        description={landing.description}
        path={landing.path}
        jsonLd={jsonLd}
      />
      <SiteHeader />
      <main className="mx-auto max-w-3xl">
        <article className="px-4 pt-6 pb-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lamp">
            Guida locale
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold leading-tight text-chalk sm:text-4xl">
            {landing.h1}
          </h1>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-dust">
            {landing.intro.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          {landing.related.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {landing.related.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="font-mono text-[11px] text-tide-soft underline underline-offset-2"
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          )}
        </article>

        <CinemaExplorer
          initialLocation={landing.location ?? null}
          initialFormats={landing.formats ?? []}
          initialRadiusKm={landing.radiusKm ?? 0}
          cityMatch={landing.cityMatch}
          regionMatch={landing.regionMatch}
          lockFormats={Boolean(landing.formats?.length)}
        />

        {landing.faqs && <FaqBlock items={landing.faqs} />}
        <SiteFooter />
      </main>
    </div>
  )
}
