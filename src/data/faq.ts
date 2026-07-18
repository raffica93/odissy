export type FaqItem = {
  question: string
  answer: string
}

export const FAQ_CORE: FaqItem[] = [
  {
    question: 'C’è IMAX 70mm in Italia?',
    answer: 'Nell’elenco ufficiale dei cinema partecipanti all’uscita IMAX 70mm di Odissea non compare alcuna sala italiana. Le sale italiane raccolte qui indicano gli spettacoli semplicemente come IMAX; le proiezioni in pellicola 70mm confermate in Italia non sono IMAX 70mm.',
  },
  {
    question: 'Dove vedere Odissea in 70mm in Italia?',
    answer: 'Le sale verificate il 18 luglio 2026 sono cinque: ARCADIA Melzo, Metropolitan Napoli, 4Fontane Roma, Cinema Lumière Bologna e Cinergia Conegliano. Sono tutte proiezioni in pellicola 70mm tradizionale, non IMAX 70mm.',
  },
  {
    question: 'Quali sale IMAX sono confermate per Odissea?',
    answer: 'Le fonti ufficiali confermano UCI Orio | Bergamo, UCI Luxe Campi Bisenzio, UCI Porta di Roma, UCI Verona, UCI Luxe Fiumara Genova, Notorious Sesto San Giovanni e Happy Maxicinema Afragola. L’indice audio aiuta il confronto ma resta editoriale: le configurazioni tecniche locali non sono pubblicate in modo uniforme.',
  },
  {
    question: 'Meglio IMAX o 70mm per Odissea?',
    answer: 'Sono presentazioni diverse. Il 70mm confermato in Italia è pellicola tradizionale non IMAX; gli spettacoli IMAX italiani non sono indicati come IMAX 70mm. Confronta anche l’audio: ogni scheda mostra il sistema dichiarato, un indice editoriale e quanto è specifica la fonte.',
  },
  {
    question: 'Come confrontate l’audio delle sale?',
    answer: 'Mostriamo prima le specifiche ufficiali disponibili: Dolby Atmos e Meyer Sound ad Arcadia, DTS XD-10 al Metropolitan e al 4Fontane, 7.1 al Lumière e DTS con amplificazione Powersoft a Cinergia. Per le sale IMAX, quando la configurazione locale non è pubblicata, riportiamo solo le caratteristiche generali dichiarate da IMAX e lo segnaliamo chiaramente. L’indice su 10 è una valutazione editoriale comparativa, non una certificazione del cinema.',
  },
  {
    question: 'Come riconosco lo spettacolo giusto?',
    answer: 'Leggi la dicitura del singolo orario. Ad Arcadia deve comparire “70MM ENERGIA”; al Metropolitan e al 4Fontane “Odissea - 70mm”; al Lumière Sala Mastroianni e 70mm; a Cinergia “Odissea - 70mm”; nelle altre sedi scegli gli orari esplicitamente contrassegnati IMAX.',
  },
  {
    question: 'Come verificate le sale?',
    answer: 'Usiamo programmazione e schede tecniche pubblicate dai cinema, dai circuiti e da IMAX. Ogni scheda mostra le fonti ufficiali e la data di verifica. Se la configurazione tecnica di una sala non è pubblicata, distinguiamo il dato generale del formato dalla specifica locale invece di inventarla.',
  },
]

export function faqJsonLd(items: FaqItem[] = FAQ_CORE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
