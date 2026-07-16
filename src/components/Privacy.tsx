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
            Dati
          </span>
          <br />
          Posizione solo se la concedi al browser (resta sul dispositivo per
          ordinare le sale). Preferenze cookie in localStorage. Log del hosting.
        </p>
        <p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lamp">
            Pubblicità
          </span>
          <br />
          Con consenso marketing possiamo caricare Google AdSense. Senza
          consenso: solo cookie tecnici.
        </p>
        <p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-lamp">
            Mappe
          </span>
          <br />
          Tile OpenStreetMap / Carto. “Come arrivare” apre Google Maps sul
          telefono.
        </p>
      </div>
    </article>
  )
}
