/**
 * Component: MainLayout
 * Description: The main structural wrapper for the application's main interface.
 * This layout component acts as the architectural foundation of the system.
 * I utilized Tailwind CSS as our styling engine, leveraging the centralized 
 * 'tailwind.config.js' configuration to enforce strict design tokens. 
 * This approach ensures visual harmony and perfect UI consistency across every page 
 * by providing a unified container for our global navigation and main content.
**/
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface flex">

      {/* Sidebar - ثابت على اليسار */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col ml-70 relative">

        {/* TopNav - الهيدر الثابت في الأعلى */}
        <TopNav />

        {/* Page Content - المحتوى ويحترم الهيدر بفضل الـ pt-20 */}
        <main className="flex-1 p-6 pt-30 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MainLayout;