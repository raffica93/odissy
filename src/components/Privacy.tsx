export function Privacy({ onBack }: { onBack: () => void }) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-6">
      <button
        type="button"
        onClick={onBack}
        className="min-h-11 font-mono text-xs uppercase tracking-wider text-lamp"
      >
        ← Torna alla home
      </button>
      <h1 className="font-display mt-4 text-3xl font-bold text-chalk">
        Privacy e cookie
      </h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-dust">
        <p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lamp">
            Titolare
          </span>
          <br />
          Gestore di dovevedereodissea.it — progetto informativo indipendente.
        </p>
        <p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lamp">
            Dati del sito
          </span>
          <br />
          Posizione solo se la concedi al browser (usata in locale per ordinare
          le sale; non inviamo coordinate a un nostro server). Log tecnici del
          hosting (GitHub Pages).
        </p>
        <p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lamp">
            Pubblicità e consenso (UE/UK/CH)
          </span>
          <br />
          Mostriamo annunci tramite Google AdSense. Per utenti nello Spazio
          economico europeo, Regno Unito e Svizzera il consenso cookie/pubblicità
          è gestito dalla piattaforma di consenso certificata Google (CMP /
          Privacy &amp; messaging): puoi accettare, rifiutare o gestire le
          opzioni dal messaggio che compare sul sito.
        </p>
        <p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lamp">
            Mappe
          </span>
          <br />
          Tile OpenStreetMap / Carto. “Come arrivare” apre Google Maps sul
          dispositivo.
        </p>
        <p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lamp">
            Contatti
          </span>
          <br />
          Per richieste privacy: usa il link “Segnala una sala” in fondo alla
          home oppure il contatto indicato su AdSense per il publisher.
        </p>
      </div>
    </article>
  )
}
