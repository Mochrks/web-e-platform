'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/shared/theme/ThemeProvider';
import Providers from '@/providers/RootProvider';
import { Toaster } from 'sonner';

// Lazy load heavy components to reduce initial bundle
const ChatWidget = dynamic(() => import('@/components/shared/chat'), {
  ssr: false,
});
const SmoothScroll = dynamic(
  () => import('@/components/shared/layout/SmoothScrollLayout'),
  { ssr: false }
);

export default function RootLayoutContent({
  children,
  fontClassName,
}: Readonly<{
  children: React.ReactNode;
  fontClassName: string;
}>) {
  return (
    <Providers>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <SmoothScroll>
          <div className={fontClassName}>{children}</div>
        </SmoothScroll>
        <ChatWidget />
        <Toaster position="top-center" visibleToasts={1} duration={3000} />
      </ThemeProvider>
    </Providers>
  );
}
