'use client';

import React from 'react';
import { ThemeProvider } from '@/components/shared/theme/ThemeProvider';
import Providers from '@/providers/RootProvider';
import { Toaster } from 'sonner';
import ChatWidget from '@/components/shared/chat';
import SmoothScroll from '@/components/shared/layout/SmoothScrollLayout';

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
