export const revenueData = [
  { month: 'Jan', revenue: 42000, users: 3200, orders: 820 },
  { month: 'Feb', revenue: 51000, users: 3800, orders: 960 },
  { month: 'Mar', revenue: 47000, users: 4100, orders: 890 },
  { month: 'Apr', revenue: 63000, users: 5200, orders: 1140 },
  { month: 'May', revenue: 58000, users: 5600, orders: 1080 },
  { month: 'Jun', revenue: 71000, users: 6400, orders: 1320 },
  { month: 'Jul', revenue: 68000, users: 6800, orders: 1250 },
  { month: 'Aug', revenue: 82000, users: 7200, orders: 1490 },
  { month: 'Sep', revenue: 79000, users: 7600, orders: 1430 },
  { month: 'Oct', revenue: 91000, users: 8100, orders: 1670 },
  { month: 'Nov', revenue: 88000, users: 8400, orders: 1610 },
  { month: 'Dec', revenue: 107000, users: 9200, orders: 1920 },
]

export const weeklyData = [
  { day: 'Mon', sales: 4200, visits: 12400 },
  { day: 'Tue', sales: 3800, visits: 11200 },
  { day: 'Wed', sales: 5100, visits: 14800 },
  { day: 'Thu', sales: 4700, visits: 13600 },
  { day: 'Fri', sales: 6200, visits: 18200 },
  { day: 'Sat', sales: 7100, visits: 20400 },
  { day: 'Sun', sales: 5400, visits: 15600 },
]

export const trafficSources = [
  { name: 'Organic', value: 38, color: '#ff3b83' },
  { name: 'Direct', value: 24, color: '#51adc2' },
  { name: 'Social', value: 21, color: '#FFD43B' },
  { name: 'Referral', value: 17, color: '#a78bfa' },
]

export const orders = [
  { id: '#CC-2841', customer: 'Alice Moreau',     product: 'Dashboard Pro',   amount: 299, status: 'Completed', date: '2024-12-14' },
  { id: '#CC-2840', customer: 'James Wilson',     product: 'Analytics Suite', amount: 199, status: 'Pending',   date: '2024-12-14' },
  { id: '#CC-2839', customer: 'Sofia Barbosa',    product: 'UI Kit Bundle',   amount: 149, status: 'Completed', date: '2024-12-13' },
  { id: '#CC-2838', customer: 'Marcus Chen',      product: 'API Connector',   amount: 89,  status: 'Cancelled', date: '2024-12-13' },
  { id: '#CC-2837', customer: 'Nina Leclerc',     product: 'Dashboard Pro',   amount: 299, status: 'Processing',date: '2024-12-12' },
  { id: '#CC-2836', customer: 'David Okafor',     product: 'Team License',    amount: 599, status: 'Completed', date: '2024-12-12' },
  { id: '#CC-2835', customer: 'Priya Sharma',     product: 'Analytics Suite', amount: 199, status: 'Pending',   date: '2024-12-11' },
  { id: '#CC-2834', customer: 'Lucas Mendes',     product: 'UI Kit Bundle',   amount: 149, status: 'Completed', date: '2024-12-11' },
]

export const kpis = [
  { label: 'Total Revenue',  value: 847200, prefix: '$', suffix: '',  delta: +18.4, color: 'rose'  as const },
  { label: 'Active Users',   value: 9200,   prefix: '',  suffix: '',  delta: +12.1, color: 'cyan'  as const },
  { label: 'Orders This Month', value: 1920, prefix: '', suffix: '',  delta: +9.3,  color: 'gold'  as const },
  { label: 'Avg. Session',   value: 4.7,    prefix: '',  suffix: 'min', delta: +2.8, color: 'purple' as const },
]

export const activities = [
  { icon: '🛒', text: 'New order from Alice Moreau',   time: '2m ago',  color: '#ff3b83' },
  { icon: '👤', text: 'New user registered: J. Wilson', time: '14m ago', color: '#51adc2' },
  { icon: '💳', text: 'Payment confirmed #CC-2839',     time: '31m ago', color: '#FFD43B' },
  { icon: '📦', text: 'Shipment dispatched for #2836',  time: '1h ago',  color: '#a78bfa' },
  { icon: '⚡', text: 'System performance peak 98%',   time: '2h ago',  color: '#34d399' },
]
