'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  Command,
  ChevronDown,
  Settings,
  User,
  LogOut,
  Shield,
  Sparkles,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import DashboardSidebarLayout from './DashboardSidebarLayout';
import { ModeToggle } from '@/components/shared/theme/ModeToggle';
import TalentAvatar from '@/components/shared/avatar';

import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DashboardHeaderLayout() {
  const [isMounted, setIsMounted] = React.useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (!isMounted) {
    return (
      <header className="h-24 border-b border-border bg-card/50 sticky top-0 z-40 px-8 flex items-center justify-between" />
    );
  }

  return (
    <header className="h-24 border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40 px-6 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="p-2.5 hover:bg-muted rounded-xl transition-all"
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none w-72">
              <DashboardSidebarLayout isMobile />
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar - Aesthetic SaaS Style */}
        <div className="hidden md:flex items-center gap-3 bg-muted/50 border border-border px-5 py-2.5 rounded-2xl w-96 group focus-within:bg-background focus-within:border-primary/40 transition-all shadow-sm">
          <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search simulations, tasks..."
            className="bg-transparent border-none text-sm focus:outline-none w-full font-bold placeholder:text-muted-foreground/50"
            aria-label="Search"
          />
          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md border border-border">
            <Command className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              K
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Quick AI Action */}
        <button
          type="button"
          className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all group"
        >
          <Sparkles className="w-4 h-4 group-hover:animate-spin" />
          Ask E-Platform
        </button>

        <div className="flex items-center gap-3 pr-4 border-r border-border">
          <ModeToggle />
          <button
            type="button"
            className="p-2.5 hover:bg-muted rounded-xl transition-all relative group"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-card" />
          </button>
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1.5 hover:bg-muted rounded-2xl transition-all group outline-none">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shadow-sm">
                <TalentAvatar size={40} />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-black tracking-tight leading-none mb-0.5">
                  {user?.name || 'Guest User'}
                </p>
                <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-none">
                  {role === 'admin' ? 'Administrator' : 'Employee Portal'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 p-3 rounded-[1.5rem] mt-2 border-border shadow-2xl backdrop-blur-xl bg-card/95"
          >
            <DropdownMenuLabel className="px-4 py-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-black tracking-tight">
                  Account Control
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                  {user?.username
                    ? `${user.username}@e-platform.pro`
                    : 'session@e-platform.pro'}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem
              asChild
              className="p-3 rounded-xl cursor-pointer focus:bg-primary/5 focus:text-primary"
            >
              <Link
                href="/platform/settings"
                className="flex items-center gap-3 font-bold text-sm"
              >
                <Settings className="w-4 h-4" /> Platform Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="p-3 rounded-xl cursor-pointer focus:bg-rose-500/10 text-rose-500 font-bold"
            >
              <LogOut className="w-4 h-4 mr-3" /> Terminate Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
