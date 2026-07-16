import type { FaqItem } from '../data/faq'

export function FaqBlock({ items }: { items: FaqItem[] }) {
  return (
    <section className="px-4 py-6">
      <h2 className="font-display text-2xl font-bold text-chalk">Domande frequenti</h2>
      <dl className="mt-4 space-y-3">
        {items.map((f) => (
          <div
            key={f.question}
            className="border border-chalk/12 bg-booth/60 p-4"
          >
            <dt className="font-display text-base font-bold text-chalk">{f.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-dust">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
