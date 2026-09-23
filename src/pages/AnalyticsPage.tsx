import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import { Eye, MousePointer, TrendingUp, Clock } from 'lucide-react'
import { analyticsComparison, topPages, deviceData } from '../data/pages'
import { useTheme } from '../context/ThemeContext'

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 shadow-xl text-xs">
      <p className="text-slate-500 dark:text-white/50 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>
          {p.name}: ${(p.value / 1000).toFixed(1)}K
        </p>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const isDark = useTheme()
  const tickColor = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)'
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'

  const [period, setPeriod] = useState<'30d' | '90d' | '12m'>('12m')

  const miniKpis = [
    { label: 'Page Views',     value: '1.24M', delta: '+18%', icon: Eye,          color: 'text-rose-accent' },
    { label: 'Sessions',       value: '487K',  delta: '+12%', icon: MousePointer, color: 'text-cyan-accent' },
    { label: 'Conversion',     value: '3.42%', delta: '+0.4%',icon: TrendingUp,   color: 'text-gold-accent' },
    { label: 'Avg. Duration',  value: '4m 12s',delta: '+8%',  icon: Clock,        color: 'text-purple-400'  },
  ]

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 dark:text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Analytics</h1>
          <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">Traffic, conversions and engagement overview</p>
        </div>
        <div className="flex items-center bg-slate-100 dark:bg-navy-900 rounded-lg p-0.5 gap-0.5">
          {(['30d', '90d', '12m'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${period === p ? 'bg-rose-accent text-white' : 'text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Mini KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {miniKpis.map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between mb-3">
              <Icon size={16} className={color} />
              <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{delta}</span>
            </div>
            <p className={`text-xl font-bold ${color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{value}</p>
            <p className="text-slate-400 dark:text-white/40 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Revenue comparison chart */}
      <div className="card">
        <div className="mb-5">
          <h3 className="text-slate-800 dark:text-white font-semibold text-sm">Revenue Year-over-Year</h3>
          <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">2024 vs 2023</p>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose-accent inline-block rounded" /><span className="text-xs text-slate-500 dark:text-white/50">2024</span></div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-purple-400 inline-block rounded border-dashed border" /><span className="text-xs text-slate-500 dark:text-white/50">2023</span></div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={analyticsComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} width={44}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="y2024" name="2024" stroke="#ff3b83" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="y2023" name="2023" stroke="#a78bfa" strokeWidth={2} strokeDasharray="4 2" dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row: Top pages + Devices */}
      <div className="flex gap-5 flex-wrap">
        {/* Top pages table */}
        <div className="card flex-1 min-w-[280px]">
          <h3 className="text-slate-800 dark:text-white font-semibold text-sm mb-4">Top Pages</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5">
                <th className="text-left text-slate-400 dark:text-white/30 py-2 uppercase tracking-wide">Page</th>
                <th className="text-right text-slate-400 dark:text-white/30 py-2 uppercase tracking-wide">Views</th>
                <th className="text-right text-slate-400 dark:text-white/30 py-2 uppercase tracking-wide hidden sm:table-cell">Bounce</th>
                <th className="text-right text-slate-400 dark:text-white/30 py-2 uppercase tracking-wide hidden md:table-cell">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                  <td className="py-2.5 text-slate-600 dark:text-white/60 font-mono">{row.page}</td>
                  <td className="py-2.5 text-right text-slate-800 dark:text-white font-semibold">{row.views.toLocaleString()}</td>
                  <td className="py-2.5 text-right text-slate-400 dark:text-white/40 hidden sm:table-cell">{row.bounce}</td>
                  <td className="py-2.5 text-right text-slate-400 dark:text-white/40 hidden md:table-cell">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Device breakdown */}
        <div className="card w-[220px] flex-shrink-0">
          <h3 className="text-slate-800 dark:text-white font-semibold text-sm mb-1">Devices</h3>
          <p className="text-slate-400 dark:text-white/40 text-xs mb-3">Session share</p>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={3} dataKey="value">
                {deviceData.map(d => <Cell key={d.name} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {deviceData.map(d => (
              <div key={d.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-xs text-slate-500 dark:text-white/60">{d.name}</span>
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-white/80">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
