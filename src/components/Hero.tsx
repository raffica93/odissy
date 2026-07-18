import { FILM } from '../data/film'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[168px] sm:min-h-[190px]">
        <img
          src={FILM.heroBannerSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #120f0df5 0%, #120f0de6 50%, #120f0d66 100%)',
          }}
          aria-hidden
        />
        <div className="relative z-[1] flex min-h-[168px] flex-col justify-end px-4 pb-4 pt-10 sm:min-h-[190px] sm:pb-5">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-lamp">
            IMAX · 70mm · Italia
          </p>
          <h1 className="font-display mt-2 max-w-[22ch] text-[1.55rem] leading-[1.08] text-chalk sm:text-3xl">
            Trova la sala giusta per Odissea
          </h1>
          <p className="mt-2 max-w-md text-sm text-chalk/80">
            In Italia non c&apos;è IMAX 70mm: confronta 70mm, IMAX e
            Atmos vicino a te.
          </p>

        </div>
      </div>
    </section>
  )
}
