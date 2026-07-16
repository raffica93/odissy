import { Link } from 'react-router-dom'
import { HeroMark } from './HeroMark'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-3 pt-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-lamp">
            Odissea · scegli il formato
          </p>
          <h1 className="font-display mt-3 max-w-[16ch] text-[2.15rem] font-bold leading-[1.06] tracking-tight text-chalk sm:text-5xl">
            Non tutte le sale mostrano lo stesso film.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-dust">
            In Italia niente IMAX 70mm. Scegli così: 70mm o IMAX digitale se puoi,
            poi Atmos/laser, poi lo schermo più grande a portata.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/come-scegliere-sala-nolan"
              className="inline-flex min-h-10 items-center bg-lamp px-3 font-mono text-[11px] font-bold uppercase tracking-wider text-void"
            >
              Come scegliere
            </Link>
            <Link
              to="/guida-formati"
              className="inline-flex min-h-10 items-center border border-chalk/25 px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-chalk"
            >
              Scaletta formati
            </Link>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-tide-soft">
            Formato prima dei km · poi lo score
          </p>
        </div>
        <HeroMark className="hidden w-[140px] shrink-0 sm:block sm:w-[168px]" />
      </div>
      {/* mobile mark under text */}
      <div className="mt-4 flex justify-center sm:hidden">
        <HeroMark className="w-[160px]" />
      </div>
    </section>
  )
}
