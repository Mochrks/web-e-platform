import '@/styles/globals.css';
import { Outfit } from 'next/font/google';
import RootLayoutContent from '@/components/shared/layout/RootLayoutContent';
import { Metadata } from 'next';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Platform - Elite Interview Simulation Platform',
  description:
    'Master your technical and behavioral interviews with AI-powered simulations, real-time feedback, and comprehensive analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} min-h-screen bg-background antialiased`}
      >
        <RootLayoutContent fontClassName={outfit.className}>
          {children}
        </RootLayoutContent>
      </body>
    </html>
  );
}
