import { Link } from 'react-router-dom'
import { FormatTrailerComparison } from '../components/FormatTrailerComparison'
import { Seo } from '../components/Seo'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

export function FormatComparisonPage() {
  return (
    <div className="min-h-screen pb-8">
      <Seo
        title="Confronta i formati del trailer di Odissea"
        description="Guarda come cambia il trailer di Odissea nei rapporti d’aspetto IMAX 70mm, IMAX, 70mm, 35mm, Dolby Cinema e Premium Large Format."
        path="/confronta-formati"
      />
      <SiteHeader />
      <main className="format-comparison-page">
        <header className="format-comparison-hero">
          <Link to="/guida-formati" className="format-back-link">
            ← Guida formati
          </Link>
          <p className="format-kicker">Lo stesso trailer, sei presentazioni</p>
          <h1>
            Quanto film <em>vedi davvero?</em>
          </h1>
          <p>
            Seleziona un formato. Il trailer non riparte: cambia soltanto il
            mascherino, così puoi confrontare in tempo reale la porzione di
            immagine visibile al cinema.
          </p>
        </header>

        <FormatTrailerComparison />

        <aside className="format-disclaimer">
          <strong>Nota sul confronto</strong>
          <p>
            Questa simulazione illustra inquadratura e composizione, non la
            dimensione fisica dello schermo. Rapporto d’aspetto e configurazione
            reale dipendono dalla singola sala e dallo spettacolo.
          </p>
        </aside>
      </main>
      <div className="mx-auto max-w-3xl">
        <SiteFooter />
      </div>
    </div>
  )
}
