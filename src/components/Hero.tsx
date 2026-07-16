export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-4 pt-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold/20" />
      <div className="pointer-events-none absolute -right-4 top-8 h-24 w-24 rounded-full border border-gold-soft/15" />
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        Odissea · Christopher Nolan
      </p>
      <h1 className="font-display mt-2 text-3xl leading-tight text-gold-soft sm:text-4xl">
        Trova la tua Itaca cinematografica
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
        In Italia non c&apos;è IMAX 70mm. Ti aiutiamo a scegliere la sala giusta:
        IMAX digitale, pellicola 70mm, Atmos, iSense — con voti video/audio e mappa.
      </p>
    </section>
  )
}
