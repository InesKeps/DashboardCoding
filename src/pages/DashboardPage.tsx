import KPICard from '../components/KPICard'
import RevenueChart from '../components/RevenueChart'
import OrdersTable from '../components/OrdersTable'
import RightPanel from '../components/RightPanel'
import { kpis } from '../data/analytics'

export default function DashboardPage() {
  return (
    <div className="flex gap-5 p-5 min-h-full">

      {/* Center content */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Page heading */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-800 dark:text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Dashboard
            </h1>
            <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">
              Welcome back, Ines — here's what's happening today.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 dark:text-white/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <KPICard key={kpi.label} {...kpi} delay={i * 80} />
          ))}
        </div>

        {/* Revenue chart */}
        <RevenueChart />

        {/* Orders table */}
        <OrdersTable />
      </div>

      {/* Right panel */}
      <RightPanel />
    </div>
  )
}
