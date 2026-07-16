import { FILM } from '../data/film'

export function FilmCard() {
  return (
    <section className="px-4 pt-2 pb-1">
      <div className="flex gap-3 border border-chalk/15 bg-booth/80 p-3 shadow-[4px_4px_0_#ff6b2c22]">
        <a
          href={FILM.imdbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lamp"
          title={`${FILM.titleIt} su IMDb`}
        >
          <img
            src={FILM.posterSrc}
            alt={`Locandina ${FILM.titleIt} (${FILM.year}) — Christopher Nolan`}
            width={92}
            height={136}
            className="h-[136px] w-[92px] object-cover border border-chalk/20 bg-ink"
            loading="eager"
            decoding="async"
          />
        </a>
        <div className="min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lamp">
              Film · {FILM.year}
            </p>
            <h2 className="font-display mt-1 text-xl font-bold leading-tight text-chalk">
              {FILM.titleIt}
            </h2>
            <p className="mt-0.5 text-xs text-dust">
              {FILM.director} · scegli la sala, non il trailer
            </p>

          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={FILM.imdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center border border-chalk/25 bg-void px-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-chalk hover:border-lamp hover:text-lamp"
            >
              IMDb
            </a>
            <a
              href={FILM.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center border border-chalk/25 bg-void px-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-chalk hover:border-lamp hover:text-lamp"
            >
              Sito ufficiale
            </a>
            <a
              href={FILM.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center border border-chalk/15 px-2.5 font-mono text-[10px] uppercase tracking-wider text-dust hover:text-chalk"
            >
              Wiki
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
