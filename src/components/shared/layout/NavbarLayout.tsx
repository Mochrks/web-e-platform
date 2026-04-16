'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { ModeToggle } from '@/components/shared/theme/ModeToggle';

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-black text-2xl uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              INVSIM.
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="rounded-full px-6 font-medium hover:bg-primary/5 hover:text-primary transition-all"
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link href="/platform">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                <span className="hidden sm:inline">Start Platform</span>
                <span className="sm:hidden">Start</span>
              </Button>
            </Link>
            <div className="w-px h-6 bg-border mx-2" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
