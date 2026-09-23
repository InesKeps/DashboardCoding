import { useState } from 'react'
import { Save, Bell, Shield, Palette, User } from 'lucide-react'

interface Toggle {
  label: string
  description: string
  enabled: boolean
}

export default function SettingsPage() {
  const [name, setName]     = useState('Ines Keps')
  const [email, setEmail]   = useState('ines.keps@codingcity.io')
  const [role, setRole]     = useState('Admin')
  const [saved, setSaved]   = useState(false)

  const [notifs, setNotifs] = useState<Toggle[]>([
    { label: 'New orders',          description: 'Get notified when a new order comes in',     enabled: true  },
    { label: 'Failed payments',     description: 'Alert when a payment charge fails',          enabled: true  },
    { label: 'New user signup',     description: 'Notify when a new account is created',       enabled: false },
    { label: 'System alerts',       description: 'CPU, memory and deployment notifications',   enabled: true  },
    { label: 'Weekly digest',       description: 'Summary email every Monday at 9am',          enabled: true  },
    { label: 'Marketing emails',    description: 'Product updates and announcements',          enabled: false },
  ])

  const [security, setSecurity] = useState<Toggle[]>([
    { label: 'Two-factor authentication', description: 'Require 2FA on every login', enabled: true  },
    { label: 'Login notifications',        description: 'Email me on new device login',enabled: true  },
    { label: 'Session timeout',            description: 'Auto-logout after 30 min idle',enabled: false },
  ])

  const toggleNotif = (i: number) =>
    setNotifs(n => n.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))

  const toggleSecurity = (i: number) =>
    setSecurity(s => s.map((x, j) => j === i ? { ...x, enabled: !x.enabled } : x))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const SectionTitle = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-8 h-8 rounded-lg bg-rose-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={15} className="text-rose-accent" />
      </div>
      <div>
        <h3 className="text-slate-800 dark:text-white font-semibold text-sm">{title}</h3>
        <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">{description}</p>
      </div>
    </div>
  )

  const ToggleRow = ({ item, onToggle }: { item: Toggle; onToggle: () => void }) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-white/5 last:border-0">
      <div>
        <p className="text-slate-700 dark:text-white/80 text-sm font-medium">{item.label}</p>
        <p className="text-slate-400 dark:text-white/30 text-xs mt-0.5">{item.description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ml-4 ${item.enabled ? 'bg-rose-accent' : 'bg-slate-200 dark:bg-white/10'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-slate-800 dark:text-white text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Settings</h1>
        <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">Manage your account, notifications and preferences</p>
      </div>

      {/* Profile */}
      <div className="card">
        <SectionTitle icon={User} title="Profile" description="Update your personal information" />

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-accent to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            IK
          </div>
          <div>
            <p className="text-slate-800 dark:text-white font-semibold text-sm">{name}</p>
            <p className="text-slate-400 dark:text-white/40 text-xs mt-0.5">{email}</p>
            <button className="text-xs text-rose-accent hover:text-rose-dark mt-1 transition-colors">Change avatar</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Full Name',     value: name,  onChange: setName,  type: 'text' },
            { label: 'Email',         value: email, onChange: setEmail, type: 'email' },
          ].map(({ label, value, onChange, type }) => (
            <div key={label}>
              <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1.5">{label}</label>
              <input
                type={type} value={value} onChange={e => onChange(e.target.value)}
                className="w-full bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/25 outline-none focus:border-rose-accent/60 transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1.5">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}
              className="w-full bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white outline-none focus:border-rose-accent/60 transition-colors">
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-white/50 mb-1.5">Timezone</label>
            <select defaultValue="Europe/Paris"
              className="w-full bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white outline-none focus:border-rose-accent/60 transition-colors">
              <option>Europe/Paris</option>
              <option>America/New_York</option>
              <option>Asia/Tokyo</option>
              <option>UTC</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={handleSave}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
              saved ? 'bg-emerald-500 text-white' : 'bg-rose-accent hover:bg-rose-dark text-white'}`}>
            <Save size={13} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="card">
        <SectionTitle icon={Palette} title="Appearance" description="Customize the look of your dashboard" />
        <div className="flex items-center gap-3">
          <p className="text-slate-600 dark:text-white/60 text-sm flex-1">Theme is controlled via the sun/moon toggle in the top-right header.</p>
          <span className="badge-rose">Active</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <SectionTitle icon={Bell} title="Notifications" description="Choose what you want to be notified about" />
        <div>
          {notifs.map((item, i) => <ToggleRow key={i} item={item} onToggle={() => toggleNotif(i)} />)}
        </div>
      </div>

      {/* Security */}
      <div className="card">
        <SectionTitle icon={Shield} title="Security" description="Manage authentication and access control" />
        <div>
          {security.map((item, i) => <ToggleRow key={i} item={item} onToggle={() => toggleSecurity(i)} />)}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5 flex gap-3">
          <button className="text-xs text-slate-500 dark:text-white/40 hover:text-rose-accent transition-colors">Change password</button>
          <span className="text-slate-300 dark:text-white/10">·</span>
          <button className="text-xs text-slate-500 dark:text-white/40 hover:text-rose-accent transition-colors">Revoke all sessions</button>
        </div>
      </div>
    </div>
  )
}
