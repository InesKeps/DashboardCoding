// ─── Analytics page ──────────────────────────────────────────────────────────
export const analyticsComparison = [
  { month: 'Jan', y2024: 42000, y2023: 31000 },
  { month: 'Feb', y2024: 51000, y2023: 38000 },
  { month: 'Mar', y2024: 47000, y2023: 42000 },
  { month: 'Apr', y2024: 63000, y2023: 44000 },
  { month: 'May', y2024: 58000, y2023: 48000 },
  { month: 'Jun', y2024: 71000, y2023: 52000 },
  { month: 'Jul', y2024: 68000, y2023: 55000 },
  { month: 'Aug', y2024: 82000, y2023: 59000 },
  { month: 'Sep', y2024: 79000, y2023: 61000 },
  { month: 'Oct', y2024: 91000, y2023: 67000 },
  { month: 'Nov', y2024: 88000, y2023: 72000 },
  { month: 'Dec', y2024: 107000, y2023: 84000 },
]

export const topPages = [
  { page: '/dashboard',        views: 42810, bounce: '28%', time: '4m 12s' },
  { page: '/products',         views: 31240, bounce: '35%', time: '3m 08s' },
  { page: '/pricing',          views: 28760, bounce: '41%', time: '2m 54s' },
  { page: '/docs/getting-started', views: 21400, bounce: '22%', time: '6m 31s' },
  { page: '/blog/react-tips',  views: 18930, bounce: '52%', time: '2m 17s' },
  { page: '/checkout',         views: 14200, bounce: '18%', time: '5m 44s' },
  { page: '/login',            views: 12800, bounce: '31%', time: '1m 22s' },
]

export const deviceData = [
  { name: 'Desktop', value: 54, color: '#ff3b83' },
  { name: 'Mobile',  value: 32, color: '#51adc2' },
  { name: 'Tablet',  value: 14, color: '#FFD43B' },
]

// ─── Orders page ─────────────────────────────────────────────────────────────
export const allOrders = [
  { id: '#CC-2841', customer: 'Alice Moreau',     product: 'Dashboard Pro',      amount: 299,  status: 'Completed',  date: '2024-12-14', country: 'France' },
  { id: '#CC-2840', customer: 'James Wilson',     product: 'Analytics Suite',    amount: 199,  status: 'Pending',    date: '2024-12-14', country: 'USA' },
  { id: '#CC-2839', customer: 'Sofia Barbosa',    product: 'UI Kit Bundle',      amount: 149,  status: 'Completed',  date: '2024-12-13', country: 'Brazil' },
  { id: '#CC-2838', customer: 'Marcus Chen',      product: 'API Connector',      amount: 89,   status: 'Cancelled',  date: '2024-12-13', country: 'China' },
  { id: '#CC-2837', customer: 'Nina Leclerc',     product: 'Dashboard Pro',      amount: 299,  status: 'Processing', date: '2024-12-12', country: 'France' },
  { id: '#CC-2836', customer: 'David Okafor',     product: 'Team License',       amount: 599,  status: 'Completed',  date: '2024-12-12', country: 'Nigeria' },
  { id: '#CC-2835', customer: 'Priya Sharma',     product: 'Analytics Suite',    amount: 199,  status: 'Pending',    date: '2024-12-11', country: 'India' },
  { id: '#CC-2834', customer: 'Lucas Mendes',     product: 'UI Kit Bundle',      amount: 149,  status: 'Completed',  date: '2024-12-11', country: 'Brazil' },
  { id: '#CC-2833', customer: 'Emma Thompson',    product: 'Team License',       amount: 599,  status: 'Completed',  date: '2024-12-10', country: 'UK' },
  { id: '#CC-2832', customer: 'Yuki Tanaka',      product: 'Dashboard Pro',      amount: 299,  status: 'Processing', date: '2024-12-10', country: 'Japan' },
  { id: '#CC-2831', customer: 'Omar Hassan',      product: 'API Connector',      amount: 89,   status: 'Completed',  date: '2024-12-09', country: 'Egypt' },
  { id: '#CC-2830', customer: 'Camille Bernard',  product: 'Analytics Suite',    amount: 199,  status: 'Pending',    date: '2024-12-09', country: 'France' },
  { id: '#CC-2829', customer: 'Ryan O\'Brien',    product: 'UI Kit Bundle',      amount: 149,  status: 'Cancelled',  date: '2024-12-08', country: 'Ireland' },
  { id: '#CC-2828', customer: 'Aisha Diallo',     product: 'Team License',       amount: 599,  status: 'Completed',  date: '2024-12-08', country: 'Senegal' },
  { id: '#CC-2827', customer: 'Carlos Rivera',    product: 'Dashboard Pro',      amount: 299,  status: 'Completed',  date: '2024-12-07', country: 'Mexico' },
]

// ─── Customers page ───────────────────────────────────────────────────────────
export const customers = [
  { id: 'C-001', name: 'Alice Moreau',     email: 'alice@moreau.fr',       plan: 'Pro',     spent: 897,   joined: '2023-03-12', status: 'Active',    avatar: 'AM' },
  { id: 'C-002', name: 'James Wilson',     email: 'jwilson@dev.io',        plan: 'Team',    spent: 1797,  joined: '2023-05-08', status: 'Active',    avatar: 'JW' },
  { id: 'C-003', name: 'Sofia Barbosa',    email: 'sofia.b@studio.br',     plan: 'Starter', spent: 447,   joined: '2024-01-21', status: 'Active',    avatar: 'SB' },
  { id: 'C-004', name: 'Marcus Chen',      email: 'mchen@techco.cn',       plan: 'Pro',     spent: 356,   joined: '2023-11-04', status: 'Inactive',  avatar: 'MC' },
  { id: 'C-005', name: 'Nina Leclerc',     email: 'nina.l@agence.fr',      plan: 'Team',    spent: 2396,  joined: '2022-09-17', status: 'Active',    avatar: 'NL' },
  { id: 'C-006', name: 'David Okafor',     email: 'd.okafor@solutions.ng', plan: 'Team',    spent: 1199,  joined: '2023-07-30', status: 'Active',    avatar: 'DO' },
  { id: 'C-007', name: 'Priya Sharma',     email: 'priya.s@digital.in',    plan: 'Pro',     spent: 597,   joined: '2024-02-14', status: 'Active',    avatar: 'PS' },
  { id: 'C-008', name: 'Lucas Mendes',     email: 'l.mendes@web.br',       plan: 'Starter', spent: 298,   joined: '2024-04-09', status: 'Active',    avatar: 'LM' },
  { id: 'C-009', name: 'Emma Thompson',    email: 'emma.t@agency.co.uk',   plan: 'Team',    spent: 1798,  joined: '2023-01-25', status: 'Active',    avatar: 'ET' },
  { id: 'C-010', name: 'Yuki Tanaka',      email: 'y.tanaka@corp.jp',      plan: 'Pro',     spent: 897,   joined: '2023-08-11', status: 'Inactive',  avatar: 'YT' },
  { id: 'C-011', name: 'Omar Hassan',      email: 'omar.h@design.eg',      plan: 'Starter', spent: 178,   joined: '2024-05-03', status: 'Active',    avatar: 'OH' },
  { id: 'C-012', name: 'Camille Bernard',  email: 'c.bernard@studio.fr',   plan: 'Pro',     spent: 597,   joined: '2023-12-18', status: 'Active',    avatar: 'CB' },
]

// ─── Products page ────────────────────────────────────────────────────────────
export const products = [
  { id: 'P-001', name: 'Dashboard Pro',     category: 'Template',   price: 299,  stock: 999, sold: 842,  status: 'Active',   rating: 4.9 },
  { id: 'P-002', name: 'Analytics Suite',   category: 'Plugin',     price: 199,  stock: 999, sold: 631,  status: 'Active',   rating: 4.7 },
  { id: 'P-003', name: 'UI Kit Bundle',     category: 'Design',     price: 149,  stock: 999, sold: 1204, status: 'Active',   rating: 4.8 },
  { id: 'P-004', name: 'API Connector',     category: 'Plugin',     price: 89,   stock: 999, sold: 387,  status: 'Active',   rating: 4.5 },
  { id: 'P-005', name: 'Team License',      category: 'License',    price: 599,  stock: 999, sold: 214,  status: 'Active',   rating: 4.9 },
  { id: 'P-006', name: 'Mobile UI Kit',     category: 'Design',     price: 129,  stock: 999, sold: 562,  status: 'Active',   rating: 4.6 },
  { id: 'P-007', name: 'Auth Module',       category: 'Plugin',     price: 79,   stock: 999, sold: 298,  status: 'Active',   rating: 4.4 },
  { id: 'P-008', name: 'Charts Library',    category: 'Plugin',     price: 119,  stock: 999, sold: 743,  status: 'Active',   rating: 4.8 },
  { id: 'P-009', name: 'Admin Starter',     category: 'Template',   price: 0,    stock: 999, sold: 3840, status: 'Free',     rating: 4.3 },
  { id: 'P-010', name: 'E-Commerce Pack',   category: 'Template',   price: 349,  stock: 999, sold: 176,  status: 'Active',   rating: 4.7 },
]

export const salesByCategory = [
  { category: 'Template', revenue: 412000 },
  { category: 'Plugin',   revenue: 218000 },
  { category: 'Design',   revenue: 134000 },
  { category: 'License',  revenue: 83000  },
]

// ─── Reports page ─────────────────────────────────────────────────────────────
export const reports = [
  { id: 'R-001', name: 'Q4 2024 Revenue Report',       type: 'Revenue',   generated: '2024-12-15', size: '2.4 MB', status: 'Ready' },
  { id: 'R-002', name: 'Monthly User Growth — Nov',    type: 'Users',     generated: '2024-11-30', size: '1.1 MB', status: 'Ready' },
  { id: 'R-003', name: 'Product Sales Breakdown',      type: 'Products',  generated: '2024-12-10', size: '3.7 MB', status: 'Ready' },
  { id: 'R-004', name: 'Customer Churn Analysis',      type: 'Customers', generated: '2024-12-01', size: '856 KB', status: 'Ready' },
  { id: 'R-005', name: 'Annual Performance 2024',      type: 'Revenue',   generated: '2024-12-14', size: '5.2 MB', status: 'Generating' },
  { id: 'R-006', name: 'Top Pages — Dec Week 2',       type: 'Analytics', generated: '2024-12-14', size: '940 KB', status: 'Ready' },
  { id: 'R-007', name: 'Order Fulfillment Report',     type: 'Orders',    generated: '2024-12-08', size: '1.8 MB', status: 'Ready' },
  { id: 'R-008', name: 'Marketing Funnel Q4',          type: 'Analytics', generated: '2024-12-05', size: '2.1 MB', status: 'Failed' },
]

// ─── Alerts page ─────────────────────────────────────────────────────────────
export const alerts = [
  { id: 1, title: 'Server CPU spike — 94%',          message: 'Node cc-prod-02 CPU peaked at 94% for 8 minutes. Auto-scaled to 3 instances.', severity: 'Critical', category: 'Infrastructure', time: '12m ago',  read: false },
  { id: 2, title: 'Failed payment batch — 3 orders', message: 'Orders #CC-2840, #CC-2835, #CC-2832 failed Stripe charge. Retry scheduled.', severity: 'Warning',  category: 'Payments',       time: '34m ago',  read: false },
  { id: 3, title: 'New user milestone: 9 000',        message: 'Active user count crossed 9 000. Growth +12.1% month-over-month.', severity: 'Info',    category: 'Growth',         time: '1h ago',   read: false },
  { id: 4, title: 'SSL cert expiry in 14 days',       message: 'Certificate for api.codingcity.io expires 2024-12-28. Renew via Cloudflare.', severity: 'Warning',  category: 'Security',       time: '3h ago',   read: true  },
  { id: 5, title: 'Database backup completed',        message: 'Full snapshot of prod-db-01 saved to S3. Size: 12.4 GB. Duration: 4m 22s.', severity: 'Info',    category: 'Infrastructure', time: '6h ago',   read: true  },
  { id: 6, title: 'High bounce rate — /pricing',      message: 'Bounce rate on /pricing exceeded 60% threshold (currently 63%) over last 4h.', severity: 'Warning',  category: 'Analytics',      time: '8h ago',   read: true  },
  { id: 7, title: 'Deployment cc-v2.4.1 succeeded',   message: 'All 4 pods healthy. Zero-downtime rollout completed in 2m 11s.', severity: 'Info',    category: 'Deploy',         time: '1d ago',   read: true  },
  { id: 8, title: 'Unusual login — new IP detected',  message: 'Admin login from 91.204.x.x (Romania). MFA passed. Session flagged for review.', severity: 'Critical', category: 'Security',       time: '1d ago',   read: true  },
]
