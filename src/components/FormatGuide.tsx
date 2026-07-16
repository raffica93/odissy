export function FormatGuide({ onBack }: { onBack: () => void }) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-6">
      <button
        type="button"
        onClick={onBack}
        className="min-h-11 text-sm font-medium text-gold"
      >
        ← Torna alla mappa
      </button>

      <h1 className="font-display mt-4 text-3xl text-gold-soft">
        Guida formati: come vedere Odissea al meglio
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-mist">
        Christopher Nolan ha girato <em>Odissea</em> interamente con cineprese
        IMAX su pellicola. Non tutte le sale mostrano lo stesso film. Ecco la
        gerarchia pratica per l&apos;Italia — ispirata al dibattito cinefilo
        (IMAX vs pellicola vs Atmos), non un ranking ufficiale.
      </p>

      <ol className="mt-6 space-y-4">
        {[
          {
            t: '1. IMAX 70mm (non in Italia)',
            d: 'Il formato “come Nolan lo ha girato”: rapporto alto, massima risoluzione su pellicola. In Europa le sale sono pochissime (es. Londra, Praga). In Italia oggi non risulta alcuna proiezione IMAX 70mm.',
          },
          {
            t: '2. Pellicola 70mm (sale italiane rare)',
            d: 'Formato analogico con grana e resa calda. In Italia: Arcadia Melzo, Metropolitan Napoli, Quattro Fontane Roma, Cineteca Bologna, Cinergia Conegliano e poche altre. Non è IMAX, ma per molti è l’esperienza più “cinema” possibile.',
          },
          {
            t: '3. IMAX digitale',
            d: 'Schermo enorme, immersione visiva massima tra le opzioni italiane. Sale UCI (Orio, Campi Bisenzio, Porta di Roma, Verona, Genova…), Notorious Sesto, Happy Afragola. Attenzione: non è 70mm e non tutte le sale IMAX sono uguali (dimensioni, laser vs dual 2K).',
          },
          {
            t: '4. 35mm',
            d: 'Pellicola classica, più “piccola” del 70mm ma con carattere. Date selezionate in sale storiche (es. Adriano, Lux, Anteo in certe programmazioni).',
          },
          {
            t: '5. PLF: iSense, ScreenX, Laser 4K, Luxe',
            d: 'Esperienze premium diverse: vibrazioni (iSense), schermi laterali (ScreenX), nitidezza laser, comfort Luxe. Non sostituiscono IMAX/70mm, ma possono battere un multiplex standard.',
          },
          {
            t: '6. Audio Atmos (e perché conta comunque)',
            d: 'Odissea non è un film “Atmos-first” come certi blockbuster, ma un impianto Atmos di alto livello (es. Arcadia Sala Energia) può restare impressionante anche in mix 5.1/ottimizzato. Non scartare una sala solo perché “non è full Atmos mix”.',
          },
          {
            t: '7. Digitale standard',
            d: 'Se non hai alternative: scegli lo schermo più grande e l’audio migliore tra le tre sale più vicine. Meglio una buona sala normale che una trasferta impossibile.',
          },
        ].map((item) => (
          <li
            key={item.t}
            className="rounded-2xl border border-gold/15 bg-navy-soft/70 p-4"
          >
            <h2 className="font-semibold text-gold">{item.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">{item.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-2xl border border-gold/30 bg-card/40 p-4">
        <h2 className="font-display text-xl text-gold-soft">Regola d&apos;oro</h2>
        <p className="mt-2 text-sm text-mist">
          Tra le opzioni a te raggiungibili (anche 1–1,5 ore di viaggio), scegli
          la sala con lo score più alto — non necessariamente la più vicina. Per
          molti il dilemma Lombardia è: <strong>Melzo 70mm+Atmos</strong> vs{' '}
          <strong>Orio IMAX</strong>. Entrambi sono scelte S-tier; cambia cosa
          privilegi (pellicola/audio vs campo IMAX).
        </p>
      </div>

      <p className="mt-6 text-xs text-mist/70">
        Disclaimer: contenuti non ufficiali, non affiliati a Universal Pictures,
        IMAX Corporation, Syncopy o ai circuiti. I voti sono editoriali e
        soggettivi. Controlla sempre cartellone e formato sul sito del cinema.
      </p>
    </article>
  )
}
