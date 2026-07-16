import { Link } from 'react-router-dom'
import { HeroMark } from './HeroMark'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-3 pt-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-lamp">
            Girato per IMAX · visto dove si può
          </p>
          <h1 className="font-display mt-3 max-w-[18ch] text-[1.85rem] leading-[1.05] text-chalk sm:text-[2.75rem]">
            Non tutte le sale proiettano lo stesso Odissea.
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-dust">
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
              className="inline-flex min-h-10 items-center border border-chalk/25 px-3 font-display text-[12px] tracking-[0.14em] text-chalk"
            >
              Scaletta formati
            </Link>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-tide-soft">
            1,43:1 · 70mm · dual laser · non lo schermo del centro commerciale
          </p>
        </div>
        <HeroMark className="hidden w-[140px] shrink-0 sm:block sm:w-[168px]" />
      </div>
      <div className="mt-4 flex justify-center sm:hidden">
        <HeroMark className="w-[160px]" />
      </div>
    </section>
  )
}
