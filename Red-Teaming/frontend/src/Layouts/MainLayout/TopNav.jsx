/**
 * Component: TopNav
 * Description: The global navigation header for the application.
 * This component functions as a core shared layout. 
 * I utilized Tailwind CSS as our styling engine, leveraging the centralized 
 * 'tailwind.config.js' configuration to enforce strict design tokens. 
 * This approach ensures visual harmony and perfect UI consistency across 
 * every page of the system.
 */

import React from 'react';

const TopNav = () => {
  return (
    // Fixed header that stays at the top, maintaining a constant navigation anchor.
    <header className="fixed top-0 right-0 left-64 z-40 flex items-center justify-between 
    px-8 h-16 border-b border-outline-variant bg-surface">

      {/* Left Section: Displays the project identity/brand title */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-headline-sm text-on-surface tracking-widest">
          LLM SECURITY HUB
        </span>
      </div>
 

      {/* Right Section: Contains functional tools (Search and User Menu) */}
      <div className="flex items-center gap-8">
        

        {/* Icons Bar: Interactive navigation buttons for system alerts, settings, and profile */}
        <div className="flex items-center gap-6">

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

        </div>

      </div>

    </header>
  );
};

export default TopNav;