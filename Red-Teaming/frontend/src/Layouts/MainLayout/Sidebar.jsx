/**
 * [ architectural concept ]: Primary persistent navigation matrix and user profile telemetry block.
 * [ purpose ]: Anchors the main navigation vectors for threat libraries, labs, and reporting modules while computing and displaying real-time session identity configurations.
 */
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import api from '../../API/axiosInstance'

// 1. ROUTING REGISTRY: Static array mapping dashboard subsystem destinations
const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'Attack Library', icon: 'security', path: '/attack-library' },
  { label: 'Manual Lab', icon: 'biotech', path: '/manual-lab' },
  { label: 'Automated Lab', icon: 'precision_manufacturing', path: '/automated-lab' },
  { label: 'Reports', icon: 'description', path: '/reports' },
]

const Sidebar = () => {
  const [user, setUser] = useState(null)

// 2. SESSION TELEMETRY: Fetches authenticated analyst metadata on component mount
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get('/users/me')
      setUser(res.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  fetchUser()
}, [])
  return (
    // 3. ANCHOR VIEWPORT FRAME: Rigidly docked on the left screen layout layer
<aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest border-r border-outline-variant flex-col z-50">
      {/* 4. BRAND VECTORS: Core application identity header block */}
      <div className="px-6 py-8 border-b border-outline-variant/20">
        <h1 className="text-headline-md font-bold text-primary tracking-tight">
          VERITAS AI
        </h1>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
          Security Control Panel
        </p>
      </div>

      {/* 5. INTERACTIVE MATRIX: Evaluates route state and dynamically mutates visual tokens */}
      <nav className="flex-1 flex flex-col py-4">

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => {
              const base =
                "flex items-center gap-4 px-6 py-3 mx-3 rounded-lg transition-all duration-200 group"

              const active =
                "bg-surface-container-high text-primary font-semibold border-l-2 border-primary"

              const inactive =
                "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"

              return `${base} ${isActive ? active : inactive}`
            }}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-on-surface-variant group-hover:text-primary'
                  }`}
                >
                  {item.icon}
                </span>

                <span className="uppercase tracking-wider text-label-caps text-[11px]">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}

      </nav>

      {/* USER SECTION */}
      <div className="p-6 border-t border-outline-variant/20">

        <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-outline-variant/20">

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Qa-kqkUvWWjfL7KerqMTgGbtHfP0ClqBaFY5nGupQ4wfBkexhFDMqzWxLC2nXoleysWVLTHUJAx5g1OgOj6CSOPInpH7vy0wm9x2wbEsAyKf8plXd9wwsSO-XPkpl8ysXBWnBqXDhu5fb1SY9dCOtesuFzdi3WvBnjgnWbgfP_krIh4kEJ59IWMUIy86p2pSARk9cH4QPUGeNRpoi6UhFjfGuczlUMRpOASO8PdUFGQRbt_r4bZpGQI0_S8GrGON90yr1gc79ux4"
            alt="Analyst"
            className="w-9 h-9 rounded-full border border-primary/40 object-cover"
          />

          <div className="leading-tight">
            <p className="font-semibold text-on-surface text-sm">
              {user?.full_name || 'User'}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-primary">
              {user?.role === 'admin' ? 'Security Admin' : 'AI Tester'}
            </p>
          </div>

        </div>

      </div>

    </aside>
  )
}

export default Sidebar