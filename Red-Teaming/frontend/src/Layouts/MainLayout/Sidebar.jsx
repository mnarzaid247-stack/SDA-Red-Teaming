/**
 * Component: Sidebar
 * Description: The global navigation sidebar for the application.
 * This is a "Shared Layout Component" integrated into all system pages. 
 * I utilized Tailwind CSS as our styling engine, leveraging the centralized 
 * 'tailwind.config.js' configuration to enforce strict design tokens. 
 * This approach ensures visual harmony and perfect UI consistency throughout the application.
 */
import React from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'Attack Library', icon: 'security', path: '/attack-library' },
  { label: 'Manual Lab', icon: 'biotech', path: '/manual-lab' },
  { label: 'Automated Lab', icon: 'precision_manufacturing', path: '/automated-lab' },
  { label: 'Reports', icon: 'description', path: '/reports' },
]

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col z-50">

      {/* BRAND */}
      <div className="px-6 py-8 border-b border-outline-variant/20">
        <h1 className="text-headline-md font-bold text-primary tracking-tight">
          VERITAS AI
        </h1>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">
          Security Control Panel
        </p>
      </div>

      {/* NAVIGATION */}
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
              Eng. Lujain
            </p>
            <p className="text-[10px] uppercase tracking-widest text-primary">
              Lead Auditor
            </p>
          </div>

        </div>

      </div>

    </aside>
  )
}

export default Sidebar