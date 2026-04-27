'use client';

import React, { useEffect } from 'react';
import DashboardSidebarLayout from './DashboardSidebarLayout';
import DashboardHeaderLayout from './DashboardHeaderLayout';
import { useAppSelector } from '@/store';
import { useRouter } from 'next/navigation';

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOnboarded } = useAppSelector((state) => state.onboarding);
  const router = useRouter();

  useEffect(() => {
    if (!isOnboarded) {
      router.push('/onboarding');
    }
  }, [isOnboarded, router]);

  if (!isOnboarded) {
    return null; // or a loading spinner
  }
  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* Sidebar - Fixed on the left */}
      <DashboardSidebarLayout />

      {/* App Content Holder */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <DashboardHeaderLayout />

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 bg-muted/20 relative">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: hsl(var(--border));
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: hsl(var(--primary) / 0.2);
          }

          /* Ensure smooth navigation between app sections */
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
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
