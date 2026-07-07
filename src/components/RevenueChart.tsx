import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { revenueData, weeklyData } from '../data/analytics'

type Tab = 'revenue' | 'users' | 'weekly'

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-navy-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
      <p className="text-white/50 text-xs mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name === 'revenue' ? `$${(p.value / 1000).toFixed(1)}K`
           : p.name === 'users'   ? `${p.value.toLocaleString()} users`
           : `${p.value.toLocaleString()}`}
        </p>
      ))}
    </div>
  )
}

export default function RevenueChart() {
  const [tab, setTab] = useState<Tab>('revenue')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'revenue', label: 'Revenue' },
    { key: 'users',   label: 'Users' },
    { key: 'weekly',  label: 'Weekly' },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h3 className="text-white font-semibold text-sm">Performance Overview</h3>
          <p className="text-white/40 text-xs mt-0.5">Jan – Dec 2024</p>
        </div>
        <div className="flex items-center bg-navy-900 rounded-lg p-0.5 gap-0.5">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                tab === key
                  ? 'bg-rose-accent text-white shadow'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {tab === 'weekly' ? (
          <BarChart data={weeklyData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} width={40}
              tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sales"  name="sales"  fill="#ff3b83" radius={[4,4,0,0]} />
            <Bar dataKey="visits" name="visits" fill="#51adc2" radius={[4,4,0,0]} />
            <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
          </BarChart>
        ) : (
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#ff3b83" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ff3b83" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="usrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#51adc2" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#51adc2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} width={40}
              tickFormatter={(v) => tab === 'revenue' ? `$${(v/1000).toFixed(0)}K` : `${(v/1000).toFixed(1)}K`} />
            <Tooltip content={<CustomTooltip />} />
            {tab === 'revenue'
              ? <Area type="monotone" dataKey="revenue" name="revenue" stroke="#ff3b83" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: '#ff3b83' }} />
              : <Area type="monotone" dataKey="users"   name="users"   stroke="#51adc2" strokeWidth={2} fill="url(#usrGrad)" dot={false} activeDot={{ r: 5, fill: '#51adc2' }} />
            }
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
