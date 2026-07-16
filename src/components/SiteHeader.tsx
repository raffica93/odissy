import { Link, NavLink } from 'react-router-dom'

const nav = [
  { to: '/milano', label: 'Milano' },
  { to: '/roma', label: 'Roma' },
  { to: '/napoli', label: 'Napoli' },
  { to: '/imax-italia', label: 'IMAX' },
  { to: '/70mm-italia', label: '70mm' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-chalk/10 bg-void/95 backdrop-blur-md">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="flex min-h-11 min-w-0 items-center gap-2.5 shrink"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo-icon.jpg`}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-lg border border-chalk/15 object-cover"
            />
            <span className="min-w-0">
              <span className="font-display block truncate text-[14px] leading-none tracking-[0.06em] text-chalk sm:text-[16px]">
                dove vedere l&apos;odissea
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-dust">
                nolan · formato · italia
              </span>
            </span>
          </Link>
          <NavLink
            to="/come-scegliere-sala-nolan"
            className={({ isActive }) =>
              `min-h-9 shrink-0 border px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                isActive
                  ? 'border-lamp bg-lamp text-void'
                  : 'border-chalk/25 text-chalk hover:border-lamp'
              }`
            }
          >
            Manifesto
          </NavLink>
        </div>
        <nav
          className="mt-3 flex items-center gap-1 overflow-x-auto border-t border-chalk/10 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Città e formati"
        >
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `min-h-8 shrink-0 px-2.5 py-1 font-display text-[12px] tracking-[0.12em] ${
                  isActive
                    ? 'bg-lamp/15 text-lamp'
                    : 'text-dust hover:text-chalk'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <NavLink
            to="/guida-formati"
            className={({ isActive }) =>
              `min-h-8 shrink-0 px-2.5 py-1 font-display text-[12px] tracking-[0.12em] ${
                isActive ? 'bg-lamp/15 text-lamp' : 'text-dust hover:text-chalk'
              }`
            }
          >
            Formati
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
