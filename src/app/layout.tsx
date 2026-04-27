import '@/styles/globals.css';
import { Outfit } from 'next/font/google';
import RootLayoutContent from '@/components/shared/layout/RootContentLayout';
import { Metadata } from 'next';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'E-Platform | Elite Employee Development & AI Career Training',
    template: '%s | E-Platform',
  },
  description:
    'The integrated ecosystem for elite employee development. Enhance professional competence with AI-driven guidance, productivity tracking, and skill mapping for modern industry standards.',
  keywords: [
    'employee development',
    'career growth platform',
    'professional training',
    'AI skill simulation',
    'productivity tracking',
    'workforce optimization',
    'talent development portal',
    'career mapping',
  ],
  authors: [{ name: 'Mochrks Team' }],
  creator: 'Mochrks',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://e-platform.mochrks.com',
    siteName: 'E-Platform Employee Development',
    title: 'E-Platform | Expert Employee Development & Skill Solutions',
    description:
      'Empowering your workforce with elite AI technology. A single professional ecosystem for training, simulation, and skill monitoring.',
    images: [
      {
        url: 'https://e-platform.mochrks.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'E-Platform Employee Development Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Platform | Elite Employee Training & Growth',
    description:
      'The intelligent platform for career acceleration and AI-powered workforce competency development.',
    images: ['https://e-platform.mochrks.com/og-image.png'],
    creator: '@mochrks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: [{ url: '/favicon.ico' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
