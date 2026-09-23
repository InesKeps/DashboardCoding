import {
  LayoutDashboard, BarChart2, ShoppingCart, Users, FileText,
  Settings, Bell, Layers, LogOut, Code2,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: BarChart2,       label: 'Analytics' },
  { icon: ShoppingCart,    label: 'Orders' },
  { icon: Users,           label: 'Customers' },
  { icon: Layers,          label: 'Products' },
  { icon: FileText,        label: 'Reports' },
  { icon: Bell,            label: 'Alerts',   badge: 3 },
  { icon: Settings,        label: 'Settings' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
  activePage: string
  onNavigate: (page: string) => void
}

export default function Sidebar({ open, onClose, activePage, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          w-[220px] bg-navy-900 border-r border-white/10
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-rose-accent flex items-center justify-center glow-rose">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Coding<span className="text-rose-accent">City</span>
          </span>
        </div>

        {/* User pill */}
        <div className="mx-4 my-4 flex items-center gap-3 bg-navy-700 rounded-xl p-3 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-accent to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            IK
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">Ines Keps</p>
            <p className="text-white/40 text-[10px] truncate">Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-3 py-2">
            Menu
          </p>
          {navItems.map(({ icon: Icon, label, badge }) => {
            const isActive = activePage === label
            return (
              <button
                key={label}
                onClick={() => { onNavigate(label); onClose() }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                  transition-all duration-150 relative group
                  ${isActive
                    ? 'bg-rose-accent/10 text-rose-accent font-medium'
                    : 'text-white/50 hover:text-white hover:bg-white/5 font-normal'}
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-rose-accent" />
                )}
                <Icon size={16} className="flex-shrink-0" />
                <span>{label}</span>
                {badge && (
                  <span className="ml-auto bg-rose-accent text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all duration-150">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
