'use client';

import React from 'react';
import { ThemeProvider } from '@/components/shared/theme/theme-provider';
import Providers from '@/providers';
import { Toaster } from 'sonner';

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
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className={fontClassName}>{children}</div>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </Providers>
  );
}
