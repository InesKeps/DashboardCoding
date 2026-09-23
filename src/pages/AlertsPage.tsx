import { useState } from 'react'
import { AlertTriangle, Info, XOctagon, CheckCheck, X, Bell } from 'lucide-react'
import { alerts as initialAlerts } from '../data/pages'

type Severity = 'All' | 'Critical' | 'Warning' | 'Info'

const severityConfig = {
  Critical: { icon: XOctagon,      color: 'text-red-400',      bg: 'bg-red-500/10',      border: 'border-red-500/20', badge: 'bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full text-xs font-medium' },
  Warning:  { icon: AlertTriangle, color: 'text-gold-accent',  bg: 'bg-gold-accent/10',  border: 'border-gold-accent/20', badge: 'badge-gold' },
  Info:     { icon: Info,          color: 'text-cyan-accent',  bg: 'bg-cyan-accent/10',  border: 'border-cyan-accent/20', badge: 'badge-cyan' },
}

export default function AlertsPage() {
  const [filter, setFilter]     = useState<Severity>('All')
  const [alertList, setAlerts]  = useState(initialAlerts)

  const markAllRead = () => setAlerts(a => a.map(x => ({ ...x, read: true })))
  const dismiss = (id: number) => setAlerts(a => a.filter(x => x.id !== id))

  const unread = alertList.filter(a => !a.read).length

  const filtered = alertList.filter(a =>
    filter === 'All' || a.severity === filter
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-slate-800 dark:text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Alerts</h1>
          <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">
            {unread > 0 ? `${unread} unread alert${unread > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/40 hover:text-rose-accent transition-colors">
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {(['Critical', 'Warning', 'Info'] as const).map(s => {
          const cfg = severityConfig[s]
          const Icon = cfg.icon
          const count = alertList.filter(a => a.severity === s).length
          return (
            <div key={s} className={`card border ${cfg.border}`}>
              <div className="flex items-center gap-2">
                <Icon size={16} className={cfg.color} />
                <span className={`text-2xl font-bold ${cfg.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{count}</span>
              </div>
              <p className="text-slate-400 dark:text-white/40 text-xs mt-1">{s}</p>
            </div>
          )
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {(['All', 'Critical', 'Warning', 'Info'] as Severity[]).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === s ? 'bg-rose-accent text-white' : 'bg-slate-100 dark:bg-navy-900 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="card text-center py-10">
            <Bell size={32} className="text-slate-300 dark:text-white/20 mx-auto mb-2" />
            <p className="text-slate-400 dark:text-white/40 text-sm">No {filter !== 'All' ? filter.toLowerCase() : ''} alerts</p>
          </div>
        )}
        {filtered.map((alert, i) => {
          const cfg = severityConfig[alert.severity as keyof typeof severityConfig]
          const Icon = cfg.icon
          return (
            <div
              key={alert.id}
              className={`flex gap-3 p-4 rounded-xl border transition-all animate-fade-in ${
                alert.read
                  ? 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5'
                  : `${cfg.bg} ${cfg.border}`
              }`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon size={14} className={cfg.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm font-semibold ${alert.read ? 'text-slate-500 dark:text-white/50' : 'text-slate-800 dark:text-white'}`}>
                      {alert.title}
                      {!alert.read && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-rose-accent inline-block" />}
                    </p>
                    <span className={cfg.badge}>{alert.severity}</span>
                    <span className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 px-2 py-0.5 rounded-full text-xs font-medium">{alert.category}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-slate-400 dark:text-white/30 text-xs whitespace-nowrap">{alert.time}</span>
                    <button onClick={() => dismiss(alert.id)}
                      className="p-1 rounded-md text-slate-400 dark:text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all">
                      <X size={13} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-400 dark:text-white/40 text-xs mt-1 leading-relaxed">{alert.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
