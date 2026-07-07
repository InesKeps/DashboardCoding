import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { trafficSources, activities } from '../data/analytics'

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { color: string } }[] }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-navy-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl text-xs">
      <span style={{ color: d.payload.color }} className="font-semibold">{d.name}: {d.value}%</span>
    </div>
  )
}

export default function RightPanel() {
  return (
    <aside className="hidden xl:flex flex-col gap-4 w-[250px] flex-shrink-0">

      {/* Donut chart — Traffic sources */}
      <div className="card">
        <h3 className="text-white font-semibold text-sm mb-1">Traffic Sources</h3>
        <p className="text-white/40 text-xs mb-3">Last 30 days</p>

        <ResponsiveContainer width="100%" height={130}>
          <PieChart>
            <Pie
              data={trafficSources}
              cx="50%" cy="50%"
              innerRadius={38} outerRadius={58}
              paddingAngle={3}
              dataKey="value"
              startAngle={90} endAngle={-270}
            >
              {trafficSources.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2 mt-1">
          {trafficSources.map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-white/60 text-xs">{s.name}</span>
              </div>
              <span className="text-white/80 text-xs font-medium">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div className="card space-y-3">
        <h3 className="text-white font-semibold text-sm">Quick Stats</h3>
        {[
          { label: 'Conversion Rate', value: '3.42%',  bar: 34 },
          { label: 'Bounce Rate',     value: '42.1%',  bar: 42 },
          { label: 'Avg. Order Val.', value: '$187',   bar: 62 },
          { label: 'Return Rate',     value: '18.3%',  bar: 18 },
        ].map(({ label, value, bar }) => (
          <div key={label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white/50">{label}</span>
              <span className="text-white font-medium">{value}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-accent to-cyan-accent"
                style={{ width: `${bar}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className="card flex-1">
        <h3 className="text-white font-semibold text-sm mb-3">Live Activity</h3>
        <div className="space-y-3">
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-3 animate-slide-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                style={{ backgroundColor: a.color + '18' }}
              >
                {a.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white/70 text-xs leading-snug">{a.text}</p>
                <p className="text-white/25 text-[10px] mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </aside>
  )
}
