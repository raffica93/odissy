export function Privacy({ onBack }: { onBack: () => void }) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-6">
      <button
        type="button"
        onClick={onBack}
        className="min-h-11 text-sm font-medium text-gold"
      >
        ← Torna alla home
      </button>
      <h1 className="font-display mt-4 text-3xl text-gold-soft">
        Privacy e cookie
      </h1>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-mist">
        <p>
          <strong className="text-gold-soft">Titolare:</strong> il gestore del
          sito Odissy (progetto informativo indipendente).
        </p>
        <p>
          <strong className="text-gold-soft">Dati trattati:</strong> posizione
          geografica solo se la concedi al browser (resta sul tuo dispositivo
          per ordinare le sale; non viene inviata a un nostro server). Preferenze
          cookie in localStorage. Log tecnici del provider di hosting.
        </p>
        <p>
          <strong className="text-gold-soft">Pubblicità:</strong> se attivi i
          cookie di marketing, potremo caricare Google AdSense, che può usare
          cookie di profilazione secondo le policy Google. Puoi rifiutare e
          usare solo cookie tecnici.
        </p>
        <p>
          <strong className="text-gold-soft">Base giuridica:</strong> consenso
          (geolocalizzazione e marketing); legittimo interesse (funzionamento
          tecnico del sito).
        </p>
        <p>
          <strong className="text-gold-soft">Diritti:</strong> puoi revocare il
          consenso cancellando i dati del sito dal browser. Per richieste
          scrivi al contatto indicato nel footer quando disponibile.
        </p>
        <p>
          <strong className="text-gold-soft">Mappe:</strong> usiamo tile
          OpenStreetMap (terze parti). I link “Come arrivare” aprono Google Maps
          sul tuo dispositivo.
        </p>
      </div>
    </article>
  )
}
