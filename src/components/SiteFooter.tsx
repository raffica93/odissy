import { Link } from 'react-router-dom'
import { SEO_LANDINGS } from '../data/seo-landings'

export function SiteFooter() {
  return (
    <footer className="mt-12 space-y-4 border-t border-chalk/10 px-4 pb-10 pt-8 text-center font-mono text-[10px] leading-relaxed text-dust">
      <nav className="flex flex-wrap justify-center gap-x-3 gap-y-2">
        {SEO_LANDINGS.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className="text-lamp underline decoration-lamp/30 underline-offset-2"
          >
            {l.slug}
          </Link>
        ))}
        <Link
          to="/come-scegliere-sala-nolan"
          className="text-lamp underline decoration-lamp/30 underline-offset-2"
        >
          come scegliere
        </Link>
        <Link
          to="/guida-formati"
          className="text-lamp underline decoration-lamp/30 underline-offset-2"
        >
          formati
        </Link>
        <Link
          to="/privacy"
          className="text-lamp underline decoration-lamp/30 underline-offset-2"
        >
          privacy
        </Link>
      </nav>
      <p>
        Guida indipendente · non affiliata a Universal, IMAX o circuiti · voti
        editoriali · controlla sempre formato e orari sul sito del cinema
      </p>

      <p>
        <a
          className="text-lamp underline decoration-lamp/40 underline-offset-2"
          href="mailto:feedback@dovevedereodissea.it?subject=Segnalazione%20sala"
        >
          Segnala una sala
        </a>
      </p>
    </footer>
  )
}
