import { Menu, Sun, Moon, Search, Bell } from 'lucide-react'

interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
  onMenuClick: () => void
}

export default function Header({ isDark, onToggleTheme, onMenuClick }: HeaderProps) {
  return (
    <header className="h-[57px] flex items-center justify-between px-5 border-b border-white/5 bg-navy-800 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Menu size={18} />
        </button>

        {/* Search bar */}
        <div className="hidden sm:flex items-center gap-2 bg-navy-700 border border-white/5 rounded-lg px-3 py-1.5 w-64">
          <Search size={14} className="text-white/30 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent text-sm text-white/70 placeholder:text-white/25 outline-none w-full"
          />
          <kbd className="hidden md:block text-[10px] text-white/25 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-accent" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-accent to-purple-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          IK
        </div>
      </div>
    </header>
  )
}
