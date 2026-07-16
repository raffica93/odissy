export function FormatGuide({ onBack }: { onBack: () => void }) {
  const steps = [
    {
      code: 'IMAX 70',
      t: 'IMAX 70mm — non in Italia',
      d: 'Come Nolan l’ha girato: rapporto alto, massima risoluzione su pellicola. In Europa poche sale (Londra, Praga…). Qui no.',
    },
    {
      code: '70mm',
      t: 'Pellicola 70mm — rare e preziose',
      d: 'Melzo, Napoli Metropolitan, 4 Fontane Roma, Cineteca Bologna, Conegliano… Grana calda, non IMAX, ma “cinema vero” per molti.',
    },
    {
      code: 'IMAX',
      t: 'IMAX digitale',
      d: 'Schermo enorme: Orio, Campi Bisenzio, Porta di Roma, Verona, Genova, Sesto, Afragola… Non è 70mm e non tutte le sale IMAX sono uguali.',
    },
    {
      code: '35mm',
      t: 'Pellicola 35mm',
      d: 'Classica, più piccola del 70mm ma con carattere. Date selezionate in sale storiche.',
    },
    {
      code: 'PLF',
      t: 'iSense, ScreenX, Laser, Luxe',
      d: 'Premium diversi: vibrazioni, schermi laterali, laser, comfort. Non sostituiscono IMAX/70mm, battono il multiplex grigio.',
    },
    {
      code: 'ATM',
      t: 'Audio Atmos',
      d: 'Odissea non è un film “Atmos-first”, ma un impianto serio (es. Arcadia Energia) cambia tutto anche in 5.1.',
    },
    {
      code: 'STD',
      t: 'Digitale standard',
      d: 'Senza alternative: lo schermo più grande e l’audio migliore tra le tre sale vicine. Meglio una buona sala che una trasferta impossibile.',
    },
  ]

  return (
    <article className="mx-auto max-w-2xl px-4 py-6">
      <button
        type="button"
        onClick={onBack}
        className="min-h-11 font-mono text-xs uppercase tracking-wider text-lamp"
      >
        ← Torna alle sale
      </button>

      <h1 className="font-display mt-4 text-3xl font-bold leading-tight text-chalk sm:text-4xl">
        Come scegliere il formato
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-dust">
        Nolan ha girato <em className="text-chalk">Odissea</em> interamente in
        IMAX su pellicola. In sala non vedi sempre lo stesso film: dipende dal
        proiettore. Questa è la scala pratica per l&apos;Italia — non un ranking
        ufficiale.
      </p>

      <ol className="mt-8 space-y-0 border-l border-chalk/15 pl-0">
        {steps.map((item) => (
          <li
            key={item.code}
            className="relative border-b border-chalk/10 py-5 pl-4"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-lamp">
              {item.code}
            </span>
            <h2 className="font-display mt-1 text-xl font-bold text-chalk">
              {item.t}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-dust">{item.d}</p>
          </li>
        ))}
      </ol>

      <div className="ticket-surface mt-8 p-4 shadow-[4px_4px_0_#ff6b2c33]">
        <h2 className="font-display text-xl font-bold text-ink">
          Regola pratica
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          Tra le opzioni a 1–1,5 ore di viaggio, scegli lo score più alto — non
          solo i km. In Lombardia il classico dilemma:{" "}
          <strong>Melzo 70mm+Atmos</strong> vs <strong>Orio IMAX</strong>.
          Entrambe Classe S; cambia cosa privilegi.
        </p>
      </div>

      <p className="mt-6 font-mono text-[10px] leading-relaxed text-dust/80">
        Non ufficiale. Non affiliato a Universal, IMAX, Syncopy o circuiti. Voti
        soggettivi. Verifica sempre il cartellone.
      </p>
    </article>
  )
}
