import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { orders } from '../data/analytics'

type SortKey = 'id' | 'customer' | 'amount' | 'date'
type SortDir = 'asc' | 'desc'

const statusStyle: Record<string, string> = {
  Completed:  'badge-green',
  Pending:    'badge-gold',
  Processing: 'badge-cyan',
  Cancelled:  'bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full text-xs font-medium',
}

export default function OrdersTable() {
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [search, setSearch] = useState('')

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown size={12} className="text-white/20" />
    return sortDir === 'asc'
      ? <ArrowUp size={12} className="text-rose-accent" />
      : <ArrowDown size={12} className="text-rose-accent" />
  }

  const filtered = orders
    .filter(o =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let cmp = 0
      if (sortKey === 'amount') cmp = a.amount - b.amount
      else if (sortKey === 'date') cmp = a.date.localeCompare(b.date)
      else cmp = a[sortKey].localeCompare(b[sortKey])
      return sortDir === 'asc' ? cmp : -cmp
    })

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-white font-semibold text-sm">Recent Orders</h3>
          <p className="text-white/40 text-xs mt-0.5">{filtered.length} transactions</p>
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search orders…"
          className="bg-navy-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white/70 placeholder:text-white/25 outline-none focus:border-rose-accent/40 transition-colors w-44"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {([
                { key: 'id' as SortKey,       label: 'Order ID' },
                { key: 'customer' as SortKey,  label: 'Customer' },
                { key: null,                   label: 'Product'  },
                { key: 'amount' as SortKey,    label: 'Amount'   },
                { key: null,                   label: 'Status'   },
                { key: 'date' as SortKey,      label: 'Date'     },
              ] as { key: SortKey | null; label: string }[]).map(({ key, label }) => (
                <th
                  key={label}
                  className={`text-left text-white/30 text-xs font-medium uppercase tracking-wide py-2 px-3 first:pl-0 last:pr-0
                    ${key ? 'cursor-pointer hover:text-white/60 select-none' : ''}`}
                  onClick={() => key && toggleSort(key)}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    {key && <SortIcon k={key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => (
              <tr
                key={order.id}
                className="border-b border-white/5 hover:bg-white/[0.03] transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <td className="py-3 px-3 pl-0 text-rose-accent font-medium text-xs">{order.id}</td>
                <td className="py-3 px-3 text-white/80 whitespace-nowrap">{order.customer}</td>
                <td className="py-3 px-3 text-white/50 text-xs whitespace-nowrap">{order.product}</td>
                <td className="py-3 px-3 text-white font-semibold">${order.amount}</td>
                <td className="py-3 px-3">
                  <span className={statusStyle[order.status]}>{order.status}</span>
                </td>
                <td className="py-3 px-3 pr-0 text-white/30 text-xs whitespace-nowrap">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-white/30 text-sm text-center py-6">No orders found</p>
        )}
      </div>
    </div>
  )
}
