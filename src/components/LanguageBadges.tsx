import type { LanguageOption } from '../types'

const LANGUAGE_LABELS: Record<LanguageOption, string> = {
  ita: 'ITA doppiato',
  en_sub_it: 'EN · sub ITA',
}

function LanguageIcon({ option }: { option: LanguageOption }) {
  if (option === 'ita') {
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 shrink-0 fill-none stroke-current" strokeWidth="1.7">
        <path d="M2 6h3l3-2.5v9L5 10H2z" />
        <path d="M10.5 5.5a4 4 0 0 1 0 5" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 shrink-0 fill-none stroke-current" strokeWidth="1.5">
      <rect x="1.5" y="3" width="13" height="10" rx="1" />
      <path d="M4 8h3M9 8h3M4 10.5h5" />
    </svg>
  )
}

export function LanguageBadges({
  options,
  compact = false,
}: {
  options: LanguageOption[]
  compact?: boolean
}) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${compact ? 'justify-end' : ''}`}>
      {options.map((option) => (
        <span
          key={option}
          aria-label={compact ? LANGUAGE_LABELS[option] : undefined}
          title={compact ? LANGUAGE_LABELS[option] : undefined}
          className={`${compact ? 'gap-1 px-1.5 py-1 text-[8px]' : 'gap-1.5 px-2 py-1 text-[9px]'} inline-flex items-center border font-mono font-semibold uppercase whitespace-nowrap ${option === 'ita'
            ? 'border-ink bg-ink text-ticket'
            : 'border-tide/50 bg-tide/10 text-tide'}`}
        >
          <LanguageIcon option={option} />
          <span className={compact ? 'hidden min-[480px]:inline' : undefined}>
            {LANGUAGE_LABELS[option]}
          </span>
        </span>
      ))}
    </div>
  )
}
