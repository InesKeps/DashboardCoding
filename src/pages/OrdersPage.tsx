import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, ShoppingCart, CheckCircle, Clock, XCircle } from 'lucide-react'
import { allOrders } from '../data/pages'

type Status = 'All' | 'Completed' | 'Pending' | 'Processing' | 'Cancelled'
type SortKey = 'id' | 'customer' | 'amount' | 'date'
type SortDir = 'asc' | 'desc'

const statusStyle: Record<string, string> = {
  Completed:  'badge-green',
  Pending:    'badge-gold',
  Processing: 'badge-cyan',
  Cancelled:  'bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full text-xs font-medium',
}

const statusCounts = (orders: typeof allOrders) => ({
  All: orders.length,
  Completed:  orders.filter(o => o.status === 'Completed').length,
  Pending:    orders.filter(o => o.status === 'Pending').length,
  Processing: orders.filter(o => o.status === 'Processing').length,
  Cancelled:  orders.filter(o => o.status === 'Cancelled').length,
})

export default function OrdersPage() {
  const [filter, setFilter]   = useState<Status>('All')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [search, setSearch]   = useState('')

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown size={12} className="text-slate-300 dark:text-white/20" />
    return sortDir === 'asc' ? <ArrowUp size={12} className="text-rose-accent" /> : <ArrowDown size={12} className="text-rose-accent" />
  }

  const counts = statusCounts(allOrders)
  const total = allOrders.reduce((s, o) => s + o.amount, 0)

  const filtered = allOrders
    .filter(o => (filter === 'All' || o.status === filter) &&
      (o.customer.toLowerCase().includes(search.toLowerCase()) ||
       o.product.toLowerCase().includes(search.toLowerCase()) ||
       o.id.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      let cmp = 0
      if (sortKey === 'amount') cmp = a.amount - b.amount
      else if (sortKey === 'date') cmp = a.date.localeCompare(b.date)
      else cmp = a[sortKey].localeCompare(b[sortKey])
      return sortDir === 'asc' ? cmp : -cmp
    })

  const statCards = [
    { label: 'Total Orders',   value: allOrders.length,                    icon: ShoppingCart, color: 'text-rose-accent' },
    { label: 'Completed',      value: counts.Completed,                    icon: CheckCircle,  color: 'text-emerald-500' },
    { label: 'Pending',        value: counts.Pending + counts.Processing,  icon: Clock,        color: 'text-gold-accent' },
    { label: 'Cancelled',      value: counts.Cancelled,                    icon: XCircle,      color: 'text-red-400' },
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-slate-800 dark:text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Orders</h1>
          <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">Total revenue: ${total.toLocaleString()}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${color.replace('text-', 'bg-').replace('accent', 'accent/10').replace('500', '500/10').replace('400', '400/10')} flex items-center justify-center flex-shrink-0`}>
              <Icon size={16} className={color} />
            </div>
            <div>
              <p className="text-slate-800 dark:text-white font-bold text-xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{value}</p>
              <p className="text-slate-400 dark:text-white/40 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          {/* Status filter tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            {(['All', 'Completed', 'Pending', 'Processing', 'Cancelled'] as Status[]).map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === s ? 'bg-rose-accent text-white' : 'bg-slate-100 dark:bg-navy-900 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white'}`}>
                {s} <span className="ml-0.5 opacity-60">{counts[s]}</span>
              </button>
            ))}
          </div>
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search orders…"
            className="bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/5 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-white/70 placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none focus:border-rose-accent/40 transition-colors w-44"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5">
                {([
                  { key: 'id',       label: 'Order ID'  },
                  { key: 'customer', label: 'Customer'  },
                  { key: null,       label: 'Product'   },
                  { key: 'amount',   label: 'Amount'    },
                  { key: null,       label: 'Status'    },
                  { key: 'date',     label: 'Date'      },
                  { key: null,       label: 'Country'   },
                ] as { key: SortKey | null; label: string }[]).map(({ key, label }) => (
                  <th key={label}
                    className={`text-left text-slate-400 dark:text-white/30 text-xs font-medium uppercase tracking-wide py-2 px-3 first:pl-0 last:pr-0 ${key ? 'cursor-pointer hover:text-slate-600 dark:hover:text-white/60 select-none' : ''}`}
                    onClick={() => key && toggleSort(key as SortKey)}>
                    <span className="flex items-center gap-1">{label}{key && <SortIcon k={key as SortKey} />}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr key={order.id}
                  className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="py-3 px-3 pl-0 text-rose-accent font-medium text-xs">{order.id}</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-white/80 whitespace-nowrap">{order.customer}</td>
                  <td className="py-3 px-3 text-slate-400 dark:text-white/50 text-xs whitespace-nowrap">{order.product}</td>
                  <td className="py-3 px-3 text-slate-800 dark:text-white font-semibold">${order.amount}</td>
                  <td className="py-3 px-3"><span className={statusStyle[order.status]}>{order.status}</span></td>
                  <td className="py-3 px-3 text-slate-400 dark:text-white/30 text-xs whitespace-nowrap">{order.date}</td>
                  <td className="py-3 px-3 pr-0 text-slate-400 dark:text-white/40 text-xs whitespace-nowrap">{order.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-slate-400 dark:text-white/30 text-sm text-center py-6">No orders found</p>}
        </div>
      </div>
    </div>
  )
}
