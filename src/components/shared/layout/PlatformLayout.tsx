'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DashboardSidebarLayout from './DashboardSidebarLayout';
import DashboardHeaderLayout from './DashboardHeaderLayout';

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Auto-collapse sidebar on tablet (1024-1279px)
  const handleTabletCollapse = useCallback(() => {
    const isTablet = window.innerWidth >= 1024 && window.innerWidth < 1280;
    if (isTablet) setIsSidebarCollapsed(true);
  }, []);

  useEffect(() => {
    handleTabletCollapse();
    const mq = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setIsSidebarCollapsed(true);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [handleTabletCollapse]);

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* Sidebar - Fixed on the left */}
      <DashboardSidebarLayout
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* App Content Holder */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-72'
        }`}
      >
        <DashboardHeaderLayout />

        {/* Main Content Area — Sage canvas for surface-contrast elevation */}
        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 bg-secondary/40 relative">
          <div className="max-w-[1540px] mx-auto w-full">{children}</div>
        </main>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: hsl(var(--border));
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: hsl(var(--primary) / 0.3);
          }

          /* Smooth page transitions */
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
