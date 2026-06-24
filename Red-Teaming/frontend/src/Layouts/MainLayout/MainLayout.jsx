/**
 * [ architectural concept ]: Root structural shell layout orchestration framework.
 * [ purpose ]: Establishes the persistent viewport wireframe by anchoring telemetry navigation nodes (Sidebar & TopNav) and exposing a fluid content viewport for dynamic application modules via React Router's Outlet.
 */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 1. ROOT CANVAS DOMAIN: Enforces strict theme alignment with background vectors and surface typography tokens
  return (
    <div className="min-h-screen bg-background text-on-surface flex">

      {/* 2. PERSISTENT NAVIGATION VECTOR: Rigidly anchored sidebar matrix on the left axis */}
      
    <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

<TopNav
  setSidebarOpen={setSidebarOpen}
/>
      {/* 3. CORE EXECUTABLE REGION: Fluid layout column offset to accommodate navigation bounds */}
      <div className="flex-1 flex flex-col lg:ml-64 relative">

      {/* 4. SUPERIOR TELEMETRY HEADER: Stationary system top bar monitoring controller status */}
        

        {/* 5. METRIC VIEWPORT LAYER: Isolated scrollable workspace dedicated to dynamic page rendering */}
        <main className="flex-1 p-6 pt-30 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MainLayout;