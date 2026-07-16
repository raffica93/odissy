export function Hero() {
  return (
    <section className="relative px-4 pb-2 pt-5">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-lamp">
        Odissea · Nolan · Italia
      </p>
      <h1 className="font-display mt-3 max-w-[18ch] text-[2.15rem] font-bold leading-[1.08] tracking-tight text-chalk sm:text-5xl">
        Non tutte le sale mostrano lo stesso film.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-dust">
        In Italia non c&apos;è IMAX 70mm. C&apos;è però chi proietta in 70mm, chi
        ha IMAX digitale, chi ha Atmos da pelle d&apos;oca. Qui trovi la sala
        giusta — non quella più vicina a caso.
      </p>
      <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-tide-soft">
        <span className="h-px w-8 bg-tide/50" aria-hidden />
        Formato · schermo · audio · km
      </div>
    </section>
  )
}
