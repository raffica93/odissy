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
    <header className="sticky top-0 z-40 border-b border-chalk/10 bg-void/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="flex min-h-11 items-baseline gap-1.5 shrink-0">
          <span className="font-display text-lg font-bold tracking-tight text-chalk">
            dove vedere
          </span>
          <span className="font-display text-lg font-bold text-lamp">odissea</span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `min-h-9 shrink-0 px-2 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                  isActive ? 'text-lamp' : 'text-dust hover:text-chalk'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <NavLink
            to="/come-scegliere-sala-nolan"
            className={({ isActive }) =>
              `min-h-9 shrink-0 px-2 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                isActive ? 'text-lamp' : 'text-tide-soft hover:text-chalk'
              }`
            }
          >
            Guida
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
