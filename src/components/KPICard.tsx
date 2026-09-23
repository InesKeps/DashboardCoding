import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  label: string
  value: number
  prefix?: string
  suffix?: string
  delta: number
  color: 'rose' | 'cyan' | 'gold' | 'purple'
  delay?: number
}

const colorMap = {
  rose:   { text: 'text-rose-accent', glowStyle: '0 0 22px rgba(255,59,131,0.28)',  bg: 'bg-rose-accent/10',  border: 'border-rose-accent/20' },
  cyan:   { text: 'text-cyan-accent', glowStyle: '0 0 22px rgba(81,173,194,0.28)', bg: 'bg-cyan-accent/10',  border: 'border-cyan-accent/20' },
  gold:   { text: 'text-gold-accent', glowStyle: '0 0 22px rgba(255,212,59,0.22)', bg: 'bg-gold-accent/10',  border: 'border-gold-accent/20' },
  purple: { text: 'text-purple-400',  glowStyle: '0 0 22px rgba(167,139,250,0.22)',bg: 'bg-purple-500/10',   border: 'border-purple-500/20' },
}

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [count, setCount] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target * 10) / 10)
        if (progress < 1) raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf.current) }
  }, [target, duration, delay])

  return count
}

export default function KPICard({ label, value, prefix = '', suffix = '', delta, color, delay = 0 }: KPICardProps) {
  const [hovered, setHovered] = useState(false)
  const c = colorMap[color]
  const animated = useCountUp(value, 1200, delay)
  const isUp = delta >= 0

  const formatted = animated >= 1000
    ? animated >= 1_000_000
      ? `${(animated / 1_000_000).toFixed(1)}M`
      : `${(animated / 1000).toFixed(1)}K`
    : animated % 1 !== 0
      ? animated.toFixed(1)
      : Math.round(animated).toString()

  const cardStyle: CSSProperties = {
    animationDelay: `${delay}ms`,
    boxShadow: hovered ? c.glowStyle : 'none',
    transition: 'box-shadow 0.3s ease',
  }

  return (
    <div
      className={`card border ${c.border} transition-all duration-300 animate-fade-in`}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-slate-500 dark:text-white/50 text-xs font-medium uppercase tracking-wide">{label}</p>
        <span className={`text-[10px] font-semibold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
          isUp ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-400 bg-red-400/10'
        }`}>
          {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {Math.abs(delta)}%
        </span>
      </div>
      <p className={`text-2xl font-bold ${c.text}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {prefix}{formatted}{suffix}
      </p>
      <p className="text-slate-400 dark:text-white/25 text-[11px] mt-1">vs. last month</p>

      {/* Mini sparkline bar */}
      <div className="mt-3 h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${c.bg.replace('/10', '/60')}`}
          style={{ width: `${Math.min(70 + Math.abs(delta), 100)}%`, transitionDelay: `${delay + 300}ms` }}
        />
      </div>
    </div>
  )
}
