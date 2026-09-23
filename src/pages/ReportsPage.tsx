import { FileText, Download, RefreshCw, AlertCircle, BarChart2, ShoppingCart, Users, Layers } from 'lucide-react'
import { reports } from '../data/pages'

const typeIcon: Record<string, React.ReactNode> = {
  Revenue:   <BarChart2 size={14} className="text-rose-accent" />,
  Users:     <Users size={14} className="text-cyan-accent" />,
  Products:  <Layers size={14} className="text-gold-accent" />,
  Customers: <Users size={14} className="text-purple-400" />,
  Analytics: <BarChart2 size={14} className="text-emerald-500" />,
  Orders:    <ShoppingCart size={14} className="text-rose-accent" />,
}

const typeColors: Record<string, string> = {
  Revenue:   'bg-rose-accent/10 text-rose-accent',
  Users:     'bg-cyan-accent/10 text-cyan-accent',
  Products:  'bg-gold-accent/10 text-gold-accent',
  Customers: 'bg-purple-500/10 text-purple-400',
  Analytics: 'bg-emerald-500/10 text-emerald-500',
  Orders:    'bg-rose-accent/10 text-rose-accent',
}

const statusBadge = (status: string) => {
  if (status === 'Ready')      return <span className="badge-green">Ready</span>
  if (status === 'Generating') return (
    <span className="badge-cyan flex items-center gap-1">
      <RefreshCw size={10} className="animate-spin" /> Generating
    </span>
  )
  return <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"><AlertCircle size={10} /> Failed</span>
}

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 dark:text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Reports</h1>
          <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">{reports.filter(r => r.status === 'Ready').length} reports ready to download</p>
        </div>
        <button className="flex items-center gap-2 bg-rose-accent hover:bg-rose-dark text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
          <FileText size={13} />
          Generate Report
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: reports.length, color: 'text-rose-accent' },
          { label: 'Ready',         value: reports.filter(r => r.status === 'Ready').length, color: 'text-emerald-500' },
          { label: 'Generating',    value: reports.filter(r => r.status === 'Generating').length, color: 'text-cyan-accent' },
          { label: 'Failed',        value: reports.filter(r => r.status === 'Failed').length, color: 'text-red-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center">
            <p className={`text-2xl font-bold ${color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{value}</p>
            <p className="text-slate-400 dark:text-white/40 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Reports list */}
      <div className="card">
        <h3 className="text-slate-800 dark:text-white font-semibold text-sm mb-4">All Reports</h3>
        <div className="space-y-2">
          {reports.map((report, i) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Type icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[report.type]}`}>
                  {typeIcon[report.type]}
                </div>
                <div className="min-w-0">
                  <p className="text-slate-800 dark:text-white text-sm font-medium truncate">{report.name}</p>
                  <p className="text-slate-400 dark:text-white/30 text-xs mt-0.5">{report.generated} · {report.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[report.type]}`}>
                  {report.type}
                </span>
                {statusBadge(report.status)}
                {report.status === 'Ready' && (
                  <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white transition-all">
                    <Download size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
