import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardPage  from './pages/DashboardPage'
import AnalyticsPage  from './pages/AnalyticsPage'
import OrdersPage     from './pages/OrdersPage'
import CustomersPage  from './pages/CustomersPage'
import ProductsPage   from './pages/ProductsPage'
import ReportsPage    from './pages/ReportsPage'
import AlertsPage     from './pages/AlertsPage'
import SettingsPage   from './pages/SettingsPage'
import { ThemeContext } from './context/ThemeContext'

type Page = 'Dashboard' | 'Analytics' | 'Orders' | 'Customers' | 'Products' | 'Reports' | 'Alerts' | 'Settings'

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case 'Dashboard':  return <DashboardPage />
    case 'Analytics':  return <div className="p-5"><AnalyticsPage /></div>
    case 'Orders':     return <div className="p-5"><OrdersPage /></div>
    case 'Customers':  return <div className="p-5"><CustomersPage /></div>
    case 'Products':   return <div className="p-5"><ProductsPage /></div>
    case 'Reports':    return <div className="p-5"><ReportsPage /></div>
    case 'Alerts':     return <div className="p-5"><AlertsPage /></div>
    case 'Settings':   return <div className="p-5"><SettingsPage /></div>
  }
}

export default function App() {
  const [isDark, setIsDark]       = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard')

  useEffect(() => {
    const root = document.documentElement
    isDark ? root.classList.add('dark') : root.classList.remove('dark')
  }, [isDark])

  return (
    <ThemeContext.Provider value={isDark}>
      <div className="min-h-screen bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-white">
        <div className="flex h-screen overflow-hidden">

          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            activePage={currentPage}
            onNavigate={(page) => setCurrentPage(page as Page)}
          />

          {/* Main column */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Header
              isDark={isDark}
              onToggleTheme={() => setIsDark(d => !d)}
              onMenuClick={() => setSidebarOpen(o => !o)}
            />

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <PageContent page={currentPage} />
            </div>
          </div>

        </div>
      </div>
    </ThemeContext.Provider>
  )
}
