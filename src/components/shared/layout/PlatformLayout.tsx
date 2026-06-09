'use client';

import React from 'react';
import DashboardSidebarLayout from './DashboardSidebarLayout';
import DashboardHeaderLayout from './DashboardHeaderLayout';

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* Sidebar - Fixed on the left */}
      <DashboardSidebarLayout />

      {/* App Content Holder */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <DashboardHeaderLayout />

        {/* Main Content Area — Sage canvas for surface-contrast elevation */}
        <main className="flex-1 p-6 lg:p-8 bg-secondary/40 relative">
          <div className="max-w-6xl mx-auto">{children}</div>
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
