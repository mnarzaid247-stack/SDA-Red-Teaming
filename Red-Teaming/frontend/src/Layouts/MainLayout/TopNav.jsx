/**
 * [  architectural concept ]: Global Navigation Header Module (TopNav).
 * [ purpose ]: Provides a persistent top bar across the application to display the ecosystem branding, handle functional utilities (notifications/settings), and orchestrate the secure user logout sequence.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthFolder/AuthContext.jsx';

const TopNav = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // 1. AUTHENTICATION LOGIC: Clears current session credentials and redirects analyst to the gateway
  const handleLogout = () => {
    logout();
    navigate('/auth');
     };
  return (
    // 2. FIXED HEADER CONTAINER: Anchored at the top, offsetting horizontal layout space for the sidebar
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 border-b border-outline-variant bg-surface">
      <button
  onClick={() => setSidebarOpen(true)}
  className="lg:hidden p-2 rounded-lg border border-outline-variant"
>
  ☰
</button>
      {/* 3. PLATFORM BRANDING: Renders the central security domain title */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm sm:text-headline-sm text-on-surface tracking-widest">
  LLM SECURITY HUB
</span>
      </div>
 

      {/* 4. UTILITY CONTROLS: Grouped interactive vectors for system triggers and preferences */}
      <div className="hidden sm:flex items-center gap-3 sm:gap-8">
        

        {/* 5. ICON BAR: Interactive navigation buttons for system alerts, settings, and profile */}
        <div className="hidden sm:flex items-center gap-3 sm:gap-6">

          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">
              settings
            </span>
          </button>

          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">
              account_circle
            </span>
          </button>
          <button
  onClick={handleLogout}
  className="text-on-surface-variant hover:text-primary transition-colors"
>
  <span className="material-symbols-outlined">
    logout
  </span>
</button>

        </div>

      </div>

    </header>
  );
};

export default TopNav;