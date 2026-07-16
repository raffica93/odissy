import { Link } from 'react-router-dom'
import { FILM } from '../data/film'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed banner in stile locandina */}
      <div className="relative min-h-[320px] sm:min-h-[380px]">
        <img
          src={FILM.heroBannerSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, #120f0df2 0%, #120f0dcc 42%, #120f0d55 70%, #120f0d22 100%), linear-gradient(to top, #120f0d 0%, transparent 45%)',
          }}
          aria-hidden
        />
        <div className="relative z-[1] flex min-h-[320px] flex-col justify-end px-4 pb-6 pt-16 sm:min-h-[380px] sm:pb-8 sm:pt-20">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-lamp">
            Girato per IMAX · visto dove si può
          </p>
          <h1 className="font-display mt-3 max-w-[18ch] text-[1.85rem] leading-[1.05] text-chalk sm:text-[2.75rem]">
            Non tutte le sale proiettano lo stesso Odissea.
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-chalk/85">
            Nolan ha voluto il fotogramma alto. In Italia non c&apos;è IMAX 70mm:
            restano 70mm “vero”, IMAX digitale, Atmos che spaccano e multiplex
            che no. Qui non cerchi “un cinema”. Cerchi la proiezione meno
            tradita.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/come-scegliere-sala-nolan"
              className="inline-flex min-h-10 items-center bg-lamp px-3 font-display text-[12px] tracking-[0.14em] text-void"
            >
              Come lo vedrei io
            </Link>
            <Link
              to="/guida-formati"
              className="inline-flex min-h-10 items-center border border-chalk/40 bg-void/50 px-3 font-display text-[12px] tracking-[0.14em] text-chalk backdrop-blur-sm"
            >
              Scaletta formati
            </Link>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-tide-soft">
            1,43:1 · 70mm · dual laser · non lo schermo del centro commerciale
          </p>
        </div>
      </div>
    </section>
  )
}
