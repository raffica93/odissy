import { FILM } from '../data/film'

/** Fascia visuale in stile locandina (key art verticale) */
export function AtmosphereBand({
  caption = 'La proiezione conta quanto il film',
}: {
  caption?: string
}) {
  return (
    <figure className="mx-4 my-6 overflow-hidden border border-chalk/15">
      <div className="relative aspect-[21/9] max-h-48 w-full sm:max-h-56">
        <img
          src={FILM.keyArtSrc}
          alt="Atmosfera epica ispirata a Odissea: cavallo e fuoco nella notte"
          className="h-full w-full object-cover object-[center_35%]"
          width={1200}
          height={514}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #120f0dee 0%, transparent 55%)',
          }}
          aria-hidden
        />
        <figcaption className="absolute inset-x-0 bottom-0 px-3 py-3 font-display text-[13px] tracking-[0.14em] text-chalk sm:text-sm">
          {caption}
        </figcaption>
      </div>
    </figure>
  )
}
