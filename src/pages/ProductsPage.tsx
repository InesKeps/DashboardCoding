import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Package, Star, TrendingUp, Tag } from 'lucide-react'
import { products, salesByCategory } from '../data/pages'
import { useTheme } from '../context/ThemeContext'

const categoryStyle: Record<string, string> = {
  Template: 'badge-rose',
  Plugin:   'badge-cyan',
  Design:   'badge-gold',
  License:  'bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full text-xs font-medium',
  Free:     'bg-slate-200 dark:bg-white/5 text-slate-500 dark:text-white/40 px-2 py-0.5 rounded-full text-xs font-medium',
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="text-slate-500 dark:text-white/50 mb-1">{label}</p>
      <p className="font-semibold text-rose-accent">${(payload[0].value / 1000).toFixed(0)}K</p>
    </div>
  )
}

export default function ProductsPage() {
  const isDark = useTheme()
  const [filterCat, setFilterCat] = useState('All')
  const tickColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)'
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'

  const totalRevenue = products.filter(p => p.price > 0).reduce((s, p) => s + p.price * p.sold, 0)
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = products.filter(p => filterCat === 'All' || p.category === filterCat)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-slate-800 dark:text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Products</h1>
        <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">Catalog of {products.length} items · Est. revenue ${(totalRevenue / 1000).toFixed(0)}K</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Products',   value: products.length,     icon: Package,    color: 'text-rose-accent' },
          { label: 'Total Units Sold', value: products.reduce((s, p) => s + p.sold, 0).toLocaleString(), icon: TrendingUp, color: 'text-cyan-accent' },
          { label: 'Best Seller',      value: 'UI Kit Bundle',     icon: Star,       color: 'text-gold-accent' },
          { label: 'Categories',       value: 4,                   icon: Tag,        color: 'text-purple-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className={color} />
            </div>
            <div>
              <p className={`font-bold text-lg leading-tight ${color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{value}</p>
              <p className="text-slate-400 dark:text-white/40 text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-5 flex-wrap">
        {/* Product table */}
        <div className="card flex-1 min-w-[280px]">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-slate-800 dark:text-white font-semibold text-sm">Product Catalog</h3>
            <div className="flex gap-1 flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilterCat(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    filterCat === cat ? 'bg-rose-accent text-white' : 'bg-slate-100 dark:bg-navy-900 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5">
                  {['Product', 'Category', 'Price', 'Units Sold', 'Rating'].map(h => (
                    <th key={h} className="text-left text-slate-400 dark:text-white/30 text-xs font-medium uppercase tracking-wide py-2 px-3 first:pl-0 last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id}
                    className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms` }}>
                    <td className="py-3 px-3 pl-0 text-slate-800 dark:text-white font-medium whitespace-nowrap">{p.name}</td>
                    <td className="py-3 px-3"><span className={categoryStyle[p.category]}>{p.category}</span></td>
                    <td className="py-3 px-3 text-slate-700 dark:text-white/80 font-semibold">
                      {p.price === 0 ? <span className="text-emerald-500 text-xs font-bold">Free</span> : `$${p.price}`}
                    </td>
                    <td className="py-3 px-3 text-slate-400 dark:text-white/50 text-xs">{p.sold.toLocaleString()}</td>
                    <td className="py-3 px-3 pr-0">
                      <span className="flex items-center gap-1 text-gold-accent text-xs font-semibold">
                        <Star size={11} fill="currentColor" />
                        {p.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales by category */}
        <div className="card w-[220px] flex-shrink-0">
          <h3 className="text-slate-800 dark:text-white font-semibold text-sm mb-1">Revenue by Category</h3>
          <p className="text-slate-400 dark:text-white/40 text-xs mb-4">All time</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={salesByCategory} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis type="number" tick={{ fill: tickColor, fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="category" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#ff3b83" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
