import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { FormatGuide } from '../components/FormatGuide'
import { FaqBlock } from '../components/FaqBlock'
import { FAQ_CORE, faqJsonLd } from '../data/faq'

export function GuidePage() {
  return (
    <div className="min-h-screen pb-8">
      <Seo
        title="Guida formati Odissea: IMAX, 70mm, Atmos in Italia"
        description="Come scegliere IMAX digitale, pellicola 70mm, 35mm, Atmos e PLF per Odissea di Nolan. Gerarchia formati e FAQ."
        path="/guida-formati"
        jsonLd={faqJsonLd()}
      />
      <SiteHeader />
      <FormatGuide />
      <div className="mx-auto max-w-2xl px-4 -mt-4 mb-2">
        <Link
          to="/come-scegliere-sala-nolan"
          className="font-mono text-xs text-lamp underline"
        >
          Leggi anche: come scegliere la sala per Nolan →
        </Link>
      </div>
      <div className="mx-auto max-w-2xl">
        <FaqBlock items={FAQ_CORE} />
      </div>
      <div className="mx-auto max-w-3xl">
        <SiteFooter />
      </div>
    </div>
  )
}
