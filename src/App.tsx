import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import KPICard from './components/KPICard'
import RevenueChart from './components/RevenueChart'
import OrdersTable from './components/OrdersTable'
import RightPanel from './components/RightPanel'
import { kpis } from './data/analytics'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    isDark ? root.classList.add('dark') : root.classList.remove('dark')
  }, [isDark])

  return (
    <div className={`min-h-screen bg-navy-800 text-white ${isDark ? 'dark' : ''}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main column */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header
            isDark={isDark}
            onToggleTheme={() => setIsDark(d => !d)}
            onMenuClick={() => setSidebarOpen(o => !o)}
          />

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex gap-5 p-5 min-h-full">

              {/* Center content */}
              <div className="flex-1 min-w-0 space-y-5">

                {/* Page heading */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      Dashboard
                    </h1>
                    <p className="text-white/40 text-xs mt-0.5">
                      Welcome back, Ines — here's what's happening today.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-white/40">
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
          </div>
        </div>
      </div>
    </div>
  )
}
