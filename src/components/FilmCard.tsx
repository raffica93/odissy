import { FILM } from '../data/film'

export function FilmCard() {
  return (
    <section className="px-4 pt-4 pb-1">
      <div className="relative overflow-hidden border border-chalk/15 bg-booth shadow-[4px_4px_0_#ff6b2c22]">
        <img
          src={FILM.atmosphereSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          width={800}
          height={800}
          loading="lazy"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-booth via-booth/95 to-booth/70" aria-hidden />
        <div className="relative flex gap-3 p-3">
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
              className="h-[136px] w-[92px] object-cover border border-chalk/20 bg-ink shadow-lg"
              loading="eager"
              decoding="async"
            />
          </a>
          <div className="min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lamp">
                Master · {FILM.year}
              </p>
              <h2 className="font-display mt-1 text-xl tracking-[0.04em] text-chalk">
                {FILM.titleIt}
              </h2>
              <p className="mt-1 text-xs leading-snug text-dust">
                {FILM.director}. Interamente IMAX film. In sala conta il
                proiettore, non il trailer in 16:9.
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={FILM.imdbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center border border-chalk/25 bg-void/80 px-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-chalk hover:border-lamp hover:text-lamp"
              >
                IMDb
              </a>
              <a
                href={FILM.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center border border-chalk/25 bg-void/80 px-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-chalk hover:border-lamp hover:text-lamp"
              >
                Ufficiale
              </a>
              <a
                href={FILM.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center border border-chalk/15 bg-void/60 px-2.5 font-mono text-[10px] uppercase tracking-wider text-dust hover:text-chalk"
              >
                Wiki
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
