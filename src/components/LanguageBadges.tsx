import type { LanguageOption } from '../types'

const LANGUAGE_LABELS: Record<LanguageOption, string> = {
  ita: 'ITA doppiato',
  en_sub_it: 'EN · sub ITA',
}

export function LanguageBadges({ options }: { options: LanguageOption[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <span
          key={option}
          className={option === 'ita'
            ? 'border border-ink bg-ink px-2 py-1 font-mono text-[9px] font-semibold uppercase text-ticket'
            : 'border border-tide/50 bg-tide/10 px-2 py-1 font-mono text-[9px] font-semibold uppercase text-tide'}
        >
          {LANGUAGE_LABELS[option]}
        </span>
      ))}
    </div>
  )
}
