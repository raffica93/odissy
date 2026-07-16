export type FaqItem = {
  question: string
  answer: string
}

export const FAQ_CORE: FaqItem[] = [
  {
    question: 'C’è IMAX 70mm in Italia?',
    answer:
      'No. In Italia non risultano sale che proiettano in IMAX 70mm (pellicola IMAX nativa). Le sale IMAX italiane usano IMAX digitale. Se cerchi il formato “come Nolan ha girato” al massimo livello mondiale, le opzioni europee restano poche (es. alcune sale a Londra o Praga). In Italia le alternative migliori sono la pellicola 70mm (non IMAX) e l’IMAX digitale.',
  },
  {
    question: 'Dove vedere Odissea in 70mm in Italia?',
    answer:
      'Tra le sale note per il 70mm: Arcadia Melzo, Cinema Metropolitan a Napoli, Cinema Quattro Fontane a Roma, Cineteca di Bologna, Cinergia Conegliano. Verifica sempre sul sito del cinema se lo spettacolo di Odissea è effettivamente in 70mm e non in digitale.',
  },
  {
    question: 'Qual è il miglior IMAX in Italia per Odissea?',
    answer:
      'Spesso viene citato UCI Orio al Serio (Bergamo) per dimensioni e impatto. Altre opzioni IMAX digitali: UCI Campi Bisenzio, Porta di Roma, Verona, Genova Fiumara, Notorious Sesto San Giovanni, Happy Afragola. Non tutte le sale IMAX sono uguali: cambiano schermo, luminosità e audio.',
  },
  {
    question: 'Meglio IMAX digitale o 70mm per Odissea?',
    answer:
      'Dipende da cosa privilegi. IMAX digitale: campo visivo più “alto” e immersivo. 70mm: grana e resa analogica, spesso abbinato a schermi enormi e impianti audio di riferimento (es. Arcadia). Molti cinefili in Lombardia scelgono Melzo per 70mm+Atmos e Orio per IMAX.',
  },
  {
    question: 'Odissea ha bisogno di Dolby Atmos?',
    answer:
      'Non è un film “Atmos-first” come certi blockbuster, ma un impianto Atmos di alto livello può restare impressionante anche con mix non pieno Atmos. Non scartare una grande sala solo per questo: conta anche schermo, formato e calibrazione.',
  },
  {
    question: 'Come scegliete i voti video e audio?',
    answer:
      'Sono voti editoriali soggettivi basati su formato (IMAX, 70mm, Atmos, PLF), reputazione delle sale e fonti pubbliche. Non sono misure di laboratorio. Controlla sempre orari e formato sul sito ufficiale del cinema.',
  },
]

export function faqJsonLd(items: FaqItem[] = FAQ_CORE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}
