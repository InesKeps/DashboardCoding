import { useState } from 'react'
import { Users, UserCheck, UserPlus, TrendingDown, Search } from 'lucide-react'
import { customers } from '../data/pages'

const planStyle: Record<string, string> = {
  Pro:     'badge-cyan',
  Team:    'badge-rose',
  Starter: 'badge-gold',
}

const avatarColors = [
  'from-rose-accent to-pink-600',
  'from-cyan-accent to-blue-500',
  'from-gold-accent to-orange-400',
  'from-purple-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
]

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [filterPlan, setFilterPlan] = useState<'All' | 'Pro' | 'Team' | 'Starter'>('All')

  const filtered = customers.filter(c =>
    (filterPlan === 'All' || c.plan === filterPlan) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) ||
     c.email.toLowerCase().includes(search.toLowerCase()))
  )

  const totalSpent = customers.reduce((s, c) => s + c.spent, 0)
  const active = customers.filter(c => c.status === 'Active').length

  const statCards = [
    { label: 'Total Customers', value: customers.length, icon: Users,       color: 'text-rose-accent' },
    { label: 'Active',          value: active,           icon: UserCheck,    color: 'text-emerald-500' },
    { label: 'New This Month',  value: 47,               icon: UserPlus,     color: 'text-cyan-accent' },
    { label: 'Churn Rate',      value: '2.4%',           icon: TrendingDown, color: 'text-gold-accent' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-slate-800 dark:text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Customers</h1>
        <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">Total lifetime value: ${totalSpent.toLocaleString()}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className={color} />
            </div>
            <div>
              <p className={`font-bold text-xl ${color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{value}</p>
              <p className="text-slate-400 dark:text-white/40 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-1">
            {(['All', 'Pro', 'Team', 'Starter'] as const).map(p => (
              <button key={p} onClick={() => setFilterPlan(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filterPlan === p ? 'bg-rose-accent text-white' : 'bg-slate-100 dark:bg-navy-900 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white'}`}>
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/5 rounded-lg px-3 py-1.5">
            <Search size={12} className="text-slate-400 dark:text-white/30" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search customers…"
              className="bg-transparent text-xs text-slate-700 dark:text-white/70 placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none w-36" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5">
                {['Customer', 'Email', 'Plan', 'Spent', 'Joined', 'Status'].map(h => (
                  <th key={h} className="text-left text-slate-400 dark:text-white/30 text-xs font-medium uppercase tracking-wide py-2 px-3 first:pl-0 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id}
                  className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="py-3 px-3 pl-0">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                        {c.avatar}
                      </div>
                      <span className="text-slate-800 dark:text-white font-medium whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-400 dark:text-white/40 text-xs whitespace-nowrap">{c.email}</td>
                  <td className="py-3 px-3"><span className={planStyle[c.plan]}>{c.plan}</span></td>
                  <td className="py-3 px-3 text-slate-800 dark:text-white font-semibold">${c.spent.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-400 dark:text-white/30 text-xs whitespace-nowrap">{c.joined}</td>
                  <td className="py-3 px-3 pr-0">
                    <span className={c.status === 'Active' ? 'badge-green' : 'bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-white/30 px-2 py-0.5 rounded-full text-xs font-medium'}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-slate-400 dark:text-white/30 text-sm text-center py-6">No customers found</p>}
        </div>
      </div>
    </div>
  )
}
